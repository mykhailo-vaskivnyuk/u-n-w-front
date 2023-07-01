import React from 'react';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { app } from '@client/app';
import { Button } from '@components/buttons/button/button';
import { useStyles } from './signup.styles';

const showFail = () => modalService.showError(MessagesMap.SIGNUP_FAIL);

export const SignupTgForm = () => {
  const navigate = useNavigateTo();
  const { buttons } = useStyles();

  const handleSubmit = async () => {
    await app.account
      .signupTg()
      .then((user) => {
        if (!user) return showFail();
        navigate.toAccount(true);
      })
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={buttons}>
        <Button onClick={handleSubmit} btnType="secondary">
          створити
        </Button>
        <div />
        <Button href={RoutesMap.ACCOUNT.LOGIN} btnType="primary">
          авторизуватись
        </Button>
      </div>
    </form>
  );
};
