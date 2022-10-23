import React, { FC, useCallback, useEffect, useState } from 'react';
import modalService from '@services/modal.service';
import { Message } from '@components/message/message';
import { EModalContent, TContent } from './modal.types';
import { Modal } from './modal';
import { useStyles } from './modal.styles';

const getElement = (content: TContent | null) => {
  if (!content) return null;
  switch (content.type) {
    case EModalContent.message:
      return <Message>{content.data}</Message>;
    default:
      return content.data;
  }
};

export const ModalSet: FC = () => {
  const { content: clsContent } = useStyles();
  const [content, setContent] = useState<TContent | null>(null);
  const element = getElement(content);

  useEffect(() => {
    modalService.setCallback(setContent);
  }, []);

  const onClose = useCallback(() => {
    setContent(null);
  }, []);

  return <Modal onClose={onClose}>{element && <div className={clsContent}>{element}</div>}</Modal>;
};
