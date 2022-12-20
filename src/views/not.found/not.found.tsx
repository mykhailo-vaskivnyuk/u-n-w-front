import React, { FC } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './not.found.styles';

export const NotFound: FC = () => {
  const { root, title, button } = useStyles();

  return (
    <div className={root}>
      <h1 className={title}>404</h1>
      <Button type="submit" className={button} href={RoutesMap.ROOT} btnType="primary">
        на головну
      </Button>
    </div>
  );
};
