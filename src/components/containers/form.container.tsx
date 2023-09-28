import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SubTitle } from '@components/subtitle/subtitle';
import { useStyles } from './form.container.styles';

type FormContainerProps = PropsWithChildren<{
  title?: string;
  className?: string;
  modal?: boolean;
}>;

export const FormContainer: FC<FormContainerProps> = (props) => {
  const { root, modal: clsModal } = useStyles();
  const { title, className, modal, children } = props;

  return (
    <div className={clsx(root, className, { [clsModal]: modal })}>
      <SubTitle text={title} />
      {children}
    </div>
  );
};
