import { MouseEvent, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

const DIFF = 100;
const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
  return 'changedTouches' in e;
};

export const useSwap = <T>(vertical: [T, T]) => {
  const [swap, setSwap] = useState<T>(vertical[0]);
  const mousePosition = useRef<MouseEvent | TouchEvent | undefined>(undefined);
  const changeRef = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  const defineSwap = useCallback(
    (xStart: number, xEnd: number) => {
      if (Math.abs(xStart - xEnd) < DIFF) return;
      if (xStart - xEnd > DIFF) setSwap(vertical[1]);
      else if (xEnd - xStart > DIFF) setSwap(vertical[0]);
      changeRef.current = true;
    },
    [vertical],
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
      defineSwap(bX, eX);
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
    const swaped = changeRef.current;
    if (!swaped) return;
    e.stopPropagation();
    changeRef.current = false;
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('click', onClick, { capture: false });
  }, [onClick]);

  return [swap, { onMouseDown, onMouseUp, onTouchStart, onTouchEnd, ref }] as const;
};
