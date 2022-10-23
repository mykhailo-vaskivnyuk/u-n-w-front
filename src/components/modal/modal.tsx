/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { mergeClasses } from '@styles/utils/mergeClasses';
import { Icon, ICONS } from '@components/icon/icon';
import { ModalProps } from './modal.types';
import { useStyles } from './modal.styles';

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    onClose,
    classes,
    onBackdropClick,
    showCloseIcon = false,
    closeOnBackdropClick = true,
    children,
  } = props;
  const baseClasses = useStyles();
  const { root, backdrop, modal, closeBtn } = mergeClasses(baseClasses, classes);

  const [closing, setClosing] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!children) return;
    setClosing(true);
  }, [location]);

  const onBackdropClickHandler = () => {
    onBackdropClick?.();
    closeOnBackdropClick && setClosing(true);
  };

  const closeHandler = useCallback(() => {
    onClose?.();
    setClosing(false);
  }, []);

  const onCloseHandler = useCallback(() => {
    setClosing(true);
  }, [onClose]);

  if (!children) return null;

  return (
    <div className={clsx(root, { closing })}>
      <div className={backdrop} onMouseDown={onBackdropClickHandler} />
      <div className={modal} onTransitionEnd={closeHandler}>
        {showCloseIcon && <Icon icon={ICONS.cross} onClick={onCloseHandler} className={closeBtn} />}
        {children}
      </div>
    </div>
  );
};
