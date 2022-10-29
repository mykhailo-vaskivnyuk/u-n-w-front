import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { mergeClasses } from '@styles/utils/mergeClasses';
import { Icon, ICONS } from '@components/icon/icon';
import { modalService } from '@services/modal.service';
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
  const [state, setState] = useState<'closed' | 'opened' | 'closing'>('closed');

  const onBackdropClickHandler = useCallback(() => {
    setState((curState) => {
      if (curState !== 'opened') return curState;
      onBackdropClick?.();
      return closeOnBackdropClick ? 'closing' : curState;
    });
  }, []);

  const closeEndHandler = useCallback(() => {
    onClose?.();
    setState('closed');
  }, [onClose]);

  const closeHandler = useCallback(() => {
    setState('closing');
  }, []);

  useEffect(() => {
    modalService.setCloseCallback(closeHandler);
  }, [closeHandler]);

  const openEndHandler = useCallback(() => {
    setState('opened');
  }, []);

  if (!children) return null;

  return (
    <div className={clsx(root, state)}>
      <div className={backdrop} onMouseDown={onBackdropClickHandler} />
      <div className={modal} onTransitionEnd={closeEndHandler} onAnimationEnd={openEndHandler}>
        {showCloseIcon && <Icon icon={ICONS.cross} onClick={closeHandler} className={closeBtn} />}
        {children}
      </div>
    </div>
  );
};
