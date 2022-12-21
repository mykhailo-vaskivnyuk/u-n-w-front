import { MouseEvent, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

const DIFF = 100;
const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
  return 'changedTouches' in e;
};

export const useSwap = <T>(options: readonly [T, T], initialOption: any) => {
  const [option, setOption] = useState<T>(initialOption || options[0]);
  const mousePosition = useRef<MouseEvent | TouchEvent | undefined>(undefined);
  const swapped = useRef(false);
  const element = useRef<HTMLDivElement>(null);

  const defineSwap = useCallback(
    (xStart: number, xEnd: number, isMouseEvent = false) => {
      if (Math.abs(xStart - xEnd) < DIFF) return;
      if (xStart - xEnd > DIFF) setOption(options[1]);
      else if (xEnd - xStart > DIFF) setOption(options[0]);
      isMouseEvent && (swapped.current = true);
    },
    [options],
  );

  const onMouseDown = useCallback((e: MouseEvent | TouchEvent) => {
    mousePosition.current = e;
  }, []);

  const onTouchStart = useCallback((e: TouchEvent) => {
    mousePosition.current = e;
  }, []);

  const onMouseUp = useCallback(
    (end: MouseEvent) => {
      const begin = mousePosition?.current;
      if (!begin) return null;
      if (isTouchEvent(begin)) return null;
      const { clientX: bX } = begin;
      const { clientX: eX } = end;
      defineSwap(bX, eX, true);
      return null;
    },
    [defineSwap],
  );

  const onTouchEnd = useCallback(
    (end: TouchEvent) => {
      const begin = mousePosition?.current;
      if (!begin) return null;
      if (!isTouchEvent(begin)) return null;
      const { clientX: bX } = begin.changedTouches[0];
      const { clientX: eX } = end.changedTouches[0];
      defineSwap(bX, eX);
      return null;
    },
    [defineSwap],
  );

  const onClick = useCallback((e: MouseEvent['nativeEvent']) => {
    if (!swapped.current) return;
    e.stopPropagation();
    swapped.current = false;
  }, []);

  useEffect(() => {
    if (!element.current) return;
    element.current.addEventListener('click', onClick, { capture: false });
  }, [onClick]);

  return [option, { onMouseDown, onMouseUp, onTouchStart, onTouchEnd, ref: element }] as const;
};
