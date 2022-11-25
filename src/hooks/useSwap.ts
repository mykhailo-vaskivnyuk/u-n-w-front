import { MouseEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

const DIFF = 100;

export const useSwap = <T>(vertical: [T, T]) => {
  const [event, setMousePosition] = useState<MouseEvent | null>(null);
  const [swap, setSwap] = useState<T>(vertical[0]);

  const onMouseDown = useCallback((e: MouseEvent) => {
    setMousePosition(e);
  }, []);
  const onMouseUp = useCallback(
    (end: MouseEvent['nativeEvent'], target: HTMLDivElement) =>
      setMousePosition((begin) => {
        console.log(end)
        if (!begin) return null;
        const { clientX: bX, clientY: bY } = begin;
        const { clientX: eX, clientY: eY } = end;
        if (bX - eX > DIFF) {
          end.target !== target && end.stopPropagation();
          setSwap(vertical[1]);
        } else if (eX - bX > DIFF) {
          end.target !== target && end.stopPropagation();
          setSwap(vertical[0]);
        }
        return null;
      }),
    [vertical],
  );
  const onMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition((ev) => (!ev ? e : ev));
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.addEventListener('mouseup', (e) => onMouseUp(e, ref.current!), { capture: false });
  });

  return [swap, { onMouseDown, onMouseMove, ref }] as const;
};
