import React, { FC } from 'react';
import { useField } from 'formik';
import { useStyles } from './input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: FC<InputProps> = (props) => {
  const { root, input, label: clsLabel, error: clsError } = useStyles();
  const { label, ...rest } = props;
  const { name = '' } = rest;
  const [formikProps, { error }] = useField({ name });

  return (
    <div className={root}>
      <div className={clsLabel}>{label}</div>
      <input {...rest} className={input} {...formikProps} />
      {error && <div className={clsError}>{error}</div>}
    </div>
  );
};
