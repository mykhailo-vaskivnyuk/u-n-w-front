import React, { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/client.app/client.app';
import { modalService } from '@services/modal.service';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { RoutesMap } from '@components/app/router';
// import { useUser } from '@hooks/useUser';
import { LoginField, LoginFormValues, LoginSchema } from './login.schema';
import { useStyles } from './login.styles';

const Login: FC = () => {
  const { root, buttons } = useStyles();
  const { submitForm } = useFormikContext<LoginFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={root} onSubmit={handleSubmit}>
      <SubTitle text="Авторизація" />
      <Input type="text" label="Email" name={LoginField.EMAIL} />
      <Input type="password" label="Пароль" name={LoginField.PASSWORD} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          увійти
        </Button>
        <div />
        <Button href={RoutesMap.ACCOUNT.OVERMAIL.full} btnType="primary">
          увійти через email
        </Button>
        <Button href={RoutesMap.ACCOUNT.SIGNUP.full} btnType="primary">
          створити акаунт
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<LoginFormValues>;

export const LoginForm = () => {
  const navigate = useNavigate();
  // const user = useUser();

  // useEffect(() => {
  //   user && navigate(RoutesMap.INDEX);
  // }, [navigate, user]);

  return (
    <FormikProvider
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        console.log(values);
        app.account.login(values).then((success) => {
          if (!success) return modalService.showError('Невірний email або пароль');
          navigate(RoutesMap.INDEX);
        });
      }}
    >
      <Login />
    </FormikProvider>
  );
};
