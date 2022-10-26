import React, { FC, PropsWithChildren, useCallback, useRef } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { useStyles } from './content.styles';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  const { root, animation } = useStyles();

  const ref = useRef<HTMLDivElement>(null);
  const key = useLocation().key;

  const handleAnimation = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(animation);
  }, [animation]);

  return (
    <div key={key} className={clsx(root, animation)} ref={ref} onAnimationEnd={handleAnimation}>
      {children}
    </div>
  );
};
