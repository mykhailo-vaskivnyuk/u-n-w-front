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
      return <Menu {...data} />;
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
  const [contentQueue, setContentQueue] = useState<TContent[]>([]);
  const [content, setContent] = useState<TContent | null>(null);
  const element = getElement(content);

  const addContent = useCallback(
    (newContent: TContent | null) =>
      setContentQueue((curContentQueue) => {
        newContent && curContentQueue.unshift(newContent);
        return [...curContentQueue];
      }),
    [],
  );

  useEffect(() => {
    modalService.setCallback(addContent);
  }, [addContent]);

  const handleClose = useCallback(() => {
    setContent((curContent) => {
      if (curContent) return null;
      setContentQueue((curContentQueue) => {
        const nextContent = curContentQueue.pop() || null;
        setTimeout(setContent, 500, nextContent);
        return curContentQueue;
      });
      return null;
    });
  }, []);

  useEffect(() => {
    if (!content) handleClose();
  }, [handleClose, content, contentQueue]);

  return (
    <Modal onClose={handleClose}>{element && <div className={clsContent}>{element}</div>}</Modal>
  );
};
