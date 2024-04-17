import React, { FC, RefObject } from 'react';
import { useStyles } from './input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  elRef?: RefObject<HTMLInputElement>;
}

export const InputSimple: FC<InputProps> = (props) => {
  const { root, input, label: clsLabel, error: clsError } = useStyles();
  const { label, elRef, ...rest } = props;
  const error = undefined;
  const touched = undefined;

  return (
    <div className={root}>
      <div className={clsLabel}>{label}</div>
      <input {...rest} className={input} ref={elRef} />
      {error && touched && <div className={clsError}>{error}</div>}
    </div>
  );
};
