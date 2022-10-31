import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/client.app/client.app';
import { modalService } from '@services/modal.service';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';
import { LoginField, LoginFormValues, LoginSchema } from './login.schema';
import { useStyles } from './login.styles';

const Login: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<LoginFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={LoginField.EMAIL} />
      <Input type="password" label="Пароль" name={LoginField.PASSWORD} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          увійти
        </Button>
        <div />
        <Button href={RoutesMap.ACCOUNT.OVERMAIL} btnType="primary">
          увійти через email
        </Button>
        <Button href={RoutesMap.ACCOUNT.SIGNUP} btnType="primary">
          створити акаунт
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<LoginFormValues>;

export const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <FormikProvider
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
        app.account
          .loginOrSignup('login', values)
          .then((success) => {
            if (success) return navigate(RoutesMap.INDEX);
            modalService.showError(MessagesMap.LOGIN_FAILED);
          })
          .catch();
      }}
    >
      <Login />
    </FormikProvider>
  );
};
