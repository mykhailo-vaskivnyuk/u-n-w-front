import React, { FC, useCallback, useEffect, useState } from 'react';
import { modalService } from '@services/modal.service';
import { Message } from '@components/message/message';
import { Menu } from '@components/menu/menu';
import { EModalContent, TContent } from './modal.types';
import { Modal } from './modal';
import { useStyles } from './modal.styles';

const getElement = (content: TContent | null) => {
  if (!content) return null;
  const { type, data } = content;
  switch (type) {
    case EModalContent.menu:
      return <Menu items={data} />;
    case EModalContent.error:
      return <Message error>{data}</Message>;
    case EModalContent.message:
      return <Message>{data}</Message>;
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

  const handleClose = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <Modal onClose={handleClose}>{element && <div className={clsContent}>{element}</div>}</Modal>
  );
};
