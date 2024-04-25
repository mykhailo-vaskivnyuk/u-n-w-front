import React, { FC } from 'react';
import { RoutesMap } from '@constants/router.constants';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './main.not.confirmed.styles';

export const MainNotConfirmed: FC = () => {
  const { root, button } = useStyles();

  return (
    <div className={root}>
      <p>Функції додатка будуть доступні після підтвердження email!</p>
      <Button btnType="primary" href={RoutesMap.ABOUT} className={button}>
        Про You & World
      </Button>
    </div>
  );
};
