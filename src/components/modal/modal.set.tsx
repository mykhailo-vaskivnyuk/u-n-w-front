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

type TState = [TContent | null, TContent[]];

export const ModalSet: FC = () => {
  const { content: clsContent } = useStyles();
  const [[content], setContent] = useState<TState>([null, []]);
  const element = getElement(content);

  const addContent = useCallback(
    (newContent: TContent) =>
      setContent((state: TState) => {
        const [curContent, curContentQueue] = state;
        if (!curContentQueue.length && !curContent) return [newContent, []];
        curContentQueue.unshift(newContent);
        return state;
      }),
    [],
  );

  useEffect(() => {
    modalService.setCallback(addContent);
  }, [addContent]);

  const handleClose = useCallback(
    () =>
      setContent((state) => {
        const curContentQueue = state[1];
        const nextContent = curContentQueue.pop();
        nextContent && setTimeout(setContent, 500, [nextContent, curContentQueue]);
        return [null, curContentQueue];
      }),
    [],
  );

  return (
    <Modal onClose={handleClose}>{element && <div className={clsContent}>{element}</div>}</Modal>
  );
};
