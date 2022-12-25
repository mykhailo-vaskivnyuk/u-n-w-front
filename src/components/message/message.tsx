import React, { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './message.styles';

export interface MessageProps {
  message: string;
  onConfirm?: () => void;
  onRefuse?: () => void;
  error?: boolean;
}

export const Message: FC<MessageProps> = (props) => {
  const { root, buttons, text } = useStyles();
  const { message, onConfirm, onRefuse, error } = props;

  const confirmButton = onConfirm && (
    <Button btnType="secondary" onClick={onConfirm}>
      yes
    </Button>
  );

  const refuseButton = onRefuse && (
    <Button btnType="refuse" onClick={onRefuse}>
      no
    </Button>
  );

  return (
    <div className={clsx(root, { error })}>
      <div className={text}>{message}</div>
      <div className={clsx({ [buttons]: confirmButton || refuseButton })}>
        {refuseButton}
        {confirmButton}
      </div>
    </div>
  );
};
