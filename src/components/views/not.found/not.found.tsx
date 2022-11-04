import { Button } from '@components/buttons/button/button';
import { RoutesMap } from '@components/router/constants';
import React, { FC } from 'react';
import { useStyles } from './not.found.styles';

export const NotFound: FC = () => {
  const { root, title, button } = useStyles();

  return (
    <div className={root}>
      <h1 className={title}>404</h1>
      <Button type="submit" className={button} href={RoutesMap.INDEX} btnType="primary">
        на головну
      </Button>
    </div>
  );
};
