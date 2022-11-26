import { MouseEvent, TouchEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

const DIFF = 100;
const isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
  return 'changedTouches' in e;
};

export const useSwap = <T>(vertical: [T, T]) => {
  const setMousePosition = useState<MouseEvent | TouchEvent | null>(null)[1];
  const [swap, setSwap] = useState<T>(vertical[0]);
  const changeRef = useRef(false);

  const onMouseDown = useCallback(
    (e: MouseEvent | TouchEvent) => {
      setMousePosition(e);
    },
    [setMousePosition],
  );

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      setMousePosition(e);
    },
    [setMousePosition],
  );

  const defineSwap = useCallback(
    (xStart: number, xEnd: number) => {
      if (Math.abs(xStart - xEnd) < DIFF) return false;
      if (xStart - xEnd > DIFF) setSwap(vertical[1]);
      else if (xEnd - xStart > DIFF) setSwap(vertical[0]);
      changeRef.current = true;
      return true;
    },
    [vertical],
  );

  const onMouseUp = useCallback(
    (end: MouseEvent) =>
      setMousePosition((begin) => {
        if (!begin) return null;
        if (isTouchEvent(begin)) return null;
        const { clientX: bX } = begin;
        const { clientX: eX } = end;
        defineSwap(bX, eX);
        return null;
      }),
    [defineSwap, setMousePosition],
  );

  const onTouchEnd = useCallback(
    (end: TouchEvent) =>
      setMousePosition((begin) => {
        if (!begin) return null;
        if (!isTouchEvent(begin)) return null;
        const { clientX: bX } = begin.changedTouches[0];
        const { clientX: eX } = end.changedTouches[0];
        defineSwap(bX, eX);
        return null;
      }),
    [defineSwap, setMousePosition],
  );

  const onClick = useCallback((e: MouseEvent['nativeEvent']) => {
    const swaped = changeRef.current;
    if (!swaped) return;
    e.stopPropagation();
    changeRef.current = false;
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('click', onClick, { capture: false });
  });

  return [swap, { onMouseDown, onMouseUp, onTouchStart, onTouchEnd, ref }] as const;
};
