import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SubTitle } from '@components/subtitle/subtitle';
import { useStyles } from './form.container.styles';

type FormContainerProps = PropsWithChildren<{
  title: string;
  className?: string;
}>;

export const FormContainer: FC<FormContainerProps> = (props) => {
  const { root } = useStyles();
  const { title, className, children } = props;

  return (
    <div className={clsx(root, className)}>
      <SubTitle text={title} />
      {children}
    </div>
  );
};
