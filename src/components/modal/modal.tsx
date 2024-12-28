import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { mergeClasses } from '@styles/utils/mergeClasses';
import { modalService } from '@services/modal.service';
import { Icon } from '@components/icon/icon';
import { ModalProps } from './modal.types';
import { useStyles } from './modal.styles';

export const Modal: FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    onClose,
    showCloseIcon = false,
    onBackdropClick,
    closeOnBackdropClick = true,
    children,
    classes,
  } = props;
  const baseClasses = useStyles();
  const { root, backdrop, modal, closeBtn, backdropBtn } = mergeClasses(baseClasses, classes);
  const [state, setState] = useState<'closed' | 'opened' | 'closing'>('closed');

  const closeHandler = useCallback(
    () =>
      setState((curState) => {
        if (curState !== 'opened') return curState;
        return 'closing';
      }),
    [],
  );

  const closeEndHandler = useCallback(() => {
    onClose?.();
    setState('closed');
  }, [onClose]);

  const openEndHandler = useCallback(() => {
    setState('opened');
  }, []);

  const onBackdropClickHandler = useCallback(() => {
    setState((curState) => {
      if (curState !== 'opened') return curState;
      onBackdropClick?.();
      return closeOnBackdropClick ? 'closing' : curState;
    });
  }, [closeOnBackdropClick, onBackdropClick]);

  useEffect(() => {
    modalService.setCloseCallback(closeHandler);
  }, [closeHandler]);

  if (!children) return null;

  return (
    <div className={clsx(root, state)}>
      <div className={backdrop} onClick={onBackdropClickHandler} aria-hidden="true" />
      <div className={modal} onTransitionEnd={closeEndHandler} onAnimationEnd={openEndHandler}>
        {showCloseIcon && <Icon icon="cross" onClick={closeHandler} className={closeBtn} />}
        {children}
      </div>
      {closeOnBackdropClick && state === 'opened' && (
        <Icon icon="remove" onClick={onBackdropClickHandler} className={backdropBtn} />
      )}
    </div>
  );
};
