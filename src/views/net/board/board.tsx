/* eslint-disable react/no-danger */
import React, { FC } from 'react';
import { app } from '@client/app';
import { NetBoardMenu } from '@components/menu/net.board.menu/net.board.menu';
import { BoardMessage } from './board.message';
import { useNetBoard } from '../../../hooks/useNetBoard';
import { useStyles } from './board.styles';

export const NetBoard: FC = () => {
  const { root } = useStyles();
  const { boardMessages } = app.getState();
  const [handleFormOpen] = useNetBoard();

  const messagesJsx = boardMessages.map((v) => (
    <BoardMessage key={v.message_id} boardMessage={v} />
  ));

  return (
    <div className={root}>
      <NetBoardMenu onFormOpen={handleFormOpen} />
      {messagesJsx}
    </div>
  );
};
