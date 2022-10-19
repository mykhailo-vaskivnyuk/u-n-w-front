import React, { FC, PropsWithChildren } from 'react';
import { Classes } from 'jss';
import { Icon, ICONS } from '@components/icon/icon';
import { mergeClasses } from '@styles/utils/mergeClasses';
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

  if (!open) {
    return null;
  }

  return (
    <div className={classes.root}>
      <div className={classes.backdrop} onMouseDown={onOverlayClickHandler} />

      <div className={classes.modal}>
        {showCloseIcon && (
          <Icon icon={ICONS.cross} onMouseDown={onClose} className={classes.closeBtn} />
        )}
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
