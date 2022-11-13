import React, { FC, RefObject } from 'react';
import { useField } from 'formik';
import { useStyles } from './input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  elRef?: RefObject<HTMLInputElement>;
}

export const Input: FC<InputProps> = (props) => {
  const { root, input, label: clsLabel, error: clsError } = useStyles();
  const { label, elRef, ...rest } = props;
  const { name = '' } = rest;
  const [formikProps, { error, touched }] = useField({ name });

  return (
    <div className={root}>
      <div className={clsLabel}>{label}</div>
      <input {...rest} className={input} {...formikProps} ref={elRef} />
      {error && touched && <div className={clsError}>{error}</div>}
    </div>
  );
};
