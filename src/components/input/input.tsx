import React, { FC } from 'react';
import { useStyles } from './input.styles';

interface InputProps {
  type: string;
  label: string;
}

export const Input: FC<InputProps> = (props) => {
  const { root, input, label: clsLabel } = useStyles();
  const { type, label } = props;

  return (
    <div className={root}>
      <div className={clsLabel}>{label}</div>
      <input type={type} className={input} />
    </div>
  );
};
