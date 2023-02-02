import React, { FC, RefObject, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import { useStyles } from '../input/input.styles';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  elRef?: RefObject<HTMLTextAreaElement>;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  const { root, input, textarea: clsTextarea, label: clsLabel, error: clsError } = useStyles();
  const { label, elRef, ...rest } = props;
  const { name = '' } = rest;
  const [formikProps, { error, touched }] = useField({ name });

  return (
    <div className={root}>
      {label && <div className={clsLabel}>{label}</div>}
      <textarea {...rest} className={clsx(input, clsTextarea)} {...formikProps} ref={elRef} />
      {error && touched && <div className={clsError}>{error}</div>}
    </div>
  );
};
