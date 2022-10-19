import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Classes } from 'jss';
import { mergeClasses } from '@styles/utils/mergeClasses';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './modal.styles';

export interface GeneralModalProps {
  open: boolean;
  onClose: () => void;
}

export type ModalProps = GeneralModalProps & {
  classes?: Partial<Classes<'root' | 'backdrop' | 'modal' | 'content' | 'closeBtn'>>;
  onBackdropClick?: () => void;
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
};

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  classes: classesProp,
  onBackdropClick,
  showCloseIcon = false,
  closeOnBackdropClick = true,
  children,
}) => {
  const classesOwn = useStyles();
  const classes = classesProp ? mergeClasses(classesOwn, classesProp) : classesOwn;

  /**
   * handles click on overlay
   */
  const onOverlayClickHandler = () => {
    onBackdropClick?.();
    closeOnBackdropClick && onClose();
  };

  const [close, setClose] = useState(true);
  const closeHandler = () => setClose(true);
  useEffect(
    () =>
      setClose((value) => {
        return open ? false : value;
      }),
    [open],
  );

  if (close) {
    return null;
  }

  return (
    <div className={clsx(classes.root, { close: !open })}>
      <div className={classes.backdrop} onMouseDown={onOverlayClickHandler} />

      <div className={classes.modal} onTransitionEnd={closeHandler}>
        {showCloseIcon && (
          <Icon icon={ICONS.cross} onMouseDown={onClose} className={classes.closeBtn} />
        )}
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
