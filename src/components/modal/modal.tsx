import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { Classes } from 'jss';
import modalService from '@services/modal.service';
import { mergeClasses } from '@styles/utils/mergeClasses';
import { Icon, ICONS } from '@components/icon/icon';
import { useStyles } from './modal.styles';

export interface ModalProps {
  onClose?: () => void;
  classes?: Partial<Classes<'root' | 'backdrop' | 'modal' | 'content' | 'closeBtn'>>;
  onBackdropClick?: () => void;
  showCloseIcon?: boolean;
  closeOnBackdropClick?: boolean;
}

export const Modal: FC<ModalProps> = ({
  onClose,
  classes: classesProp,
  onBackdropClick,
  showCloseIcon = true,
  closeOnBackdropClick = true,
}) => {
  const classesOwn = useStyles();
  const classes = classesProp ? mergeClasses(classesOwn, classesProp) : classesOwn;

  const [content, setContent] = useState<ReactElement | null>(null);
  const location = useLocation();
  useEffect(() => {
    modalService.setCallback(setContent);
  }, []);

  useEffect(() => {
    setContent(null);
  }, [location]);

  /* handles click on overlay */
  const onOverlayClickHandler = () => {
    onBackdropClick?.();
    closeOnBackdropClick && (setContent(null), onClose?.());
  };

  const onCloseHandler = () => {
    setContent(null);
    onClose?.();
  };

  const [close, setClose] = useState(true);
  const closeHandler = () => setClose(true);
  useEffect(
    () =>
      setClose((value) => {
        return content ? false : value;
      }),
    [content],
  );

  if (close) {
    return null;
  }

  return (
    <div className={clsx(classes.root, { close: !content })}>
      <div className={classes.backdrop} onMouseDown={onOverlayClickHandler} />

      <div className={classes.modal} onTransitionEnd={closeHandler}>
        {showCloseIcon && (
          <Icon icon={ICONS.cross} onClick={onCloseHandler} className={classes.closeBtn} />
        )}
        <div className={classes.content}>{content}</div>
      </div>
    </div>
  );
};
