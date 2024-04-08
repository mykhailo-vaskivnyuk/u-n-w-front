import React, { FC, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppStatus } from '@hooks/useAppStatus';
import { AppStatus } from '@client/constants';
import { useStyles } from './content.styles';

export const Content: FC<PropsWithChildren> = ({ children }) => {
  const { root, animation } = useStyles();
  const isInit = useAppStatus() === AppStatus.INITING;
  const ref = useRef<HTMLDivElement>(null);
  const { key } = useLocation();

  const handleAnimation = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '1';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove(animation);
    el.style.opacity = '0';
    setTimeout(() => el.classList.add(animation), 0);
  }, [animation, key]);

  return (
    <div className={root} ref={ref} onAnimationEnd={handleAnimation}>
      {!isInit && children}
    </div>
  );
};
