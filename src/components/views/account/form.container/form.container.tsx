import React, { FC, PropsWithChildren } from 'react';
import { SubTitle } from '@components/subtitle/subtitle';
import { useStyles } from './form.container.styles';

export const FormContainer: FC<PropsWithChildren<{ title: string }>> = (props) => {
  const { root } = useStyles();
  const { title, children } = props;

  return (
    <div className={root}>
      <SubTitle text={title} />
      {children}
    </div>
  );
};
