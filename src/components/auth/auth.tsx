import { Button } from '@components/buttons/button/button';
import { Input } from '@components/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import React, { FC } from 'react';
import { useStyles } from './auth.styles';

export const Auth: FC = () => {
  const { root, buttons } = useStyles();
  return (
    <div className={root}>
      <SubTitle text="Авторизація" />
      <Input type="text" label="Логін" />
      <Input type="password" label="Пароль" />
      <div className={buttons}>
        <Button onClick={() => {}} type="secondary">
          ok
        </Button>
        <div />
        <Button onClick={() => {}} type="primary">
          over mail
        </Button>
        <Button onClick={() => {}} type="primary">
          sing up
        </Button>
      </div>
    </div>
  );
};
