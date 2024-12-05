import React, { FC, useCallback, useEffect, useState } from 'react';
import { modalService } from '@services/modal.service';
import { Message } from '@components/message/message';
import { Menu } from '@components/menu/menu';
import { EModalContent, ModalContentPropsMap, TContent } from './modal.types';
import { Modal } from './modal';
import { useStyles } from './modal.styles';

const getElement = (content: TContent | null) => {
  if (!content) return null;
  const { type, data } = content;
  switch (type) {
    case EModalContent.menu:
      return <Menu {...data} />;
    case EModalContent.error:
      return <Message {...data} error />;
    case EModalContent.message:
      return <Message {...data} />;
    default:
      return data;
  }
};

type TState = [TContent | null, TContent[]];

const hasOnClose = (data?: TContent['data']): data is ModalContentPropsMap[EModalContent.message] =>
  data ? 'onClose' in data : false;

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
        const [curContent, curContentQueue] = state;
        const { data } = curContent || {};
        const nextContent = curContentQueue.pop();
        nextContent && setTimeout(setContent, 500, [nextContent, curContentQueue]);
        if (hasOnClose(data)) data.onClose?.();
        return [null, curContentQueue];
      }),
    [],
  );

  return (
    <Modal onClose={handleClose}>{element && <div className={clsContent}>{element}</div>}</Modal>
  );
};
