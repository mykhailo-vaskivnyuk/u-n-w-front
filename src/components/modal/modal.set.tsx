import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import modalService from '@services/modal.service';
import { Message } from '@components/message/message';
import { EModalContent, TContent } from './modal.types';
import { Modal } from './modal';
import { useStyles } from './modal.styles';

const getElement = (content: TContent | null) => {
  if (!content) return [null];
  switch (content.type) {
    case EModalContent.message:
      return [<Message>{content.data.text}</Message>, content.data.onClose] as const;
    default:
      return [content.data] as const;
  }
};

export const ModalSet: FC = memo(() => {
  const { content: clsContent } = useStyles();
  const [content, setContent] = useState<TContent | null>(null);
  const [element, onClose] = getElement(content);

  useEffect(() => {
    modalService.setCallback(setContent);
    console.log('CREATE MODAL');
  }, []);

  const handleClose = useCallback(() => {
    setContent(null);
    onClose?.();
  }, [onClose]);

  return (
    <Modal onClose={handleClose}>{element && <div className={clsContent}>{element}</div>}</Modal>
  );
});
