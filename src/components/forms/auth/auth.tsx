import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/client.app';
import modalService from '@services/modal.service';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { AuthFormValues, AuthSchema } from './auth.schema';
import { useStyles } from './auth.styles';

const Auth: FC = () => {
  const { root, buttons } = useStyles();
  const { submitForm } = useFormikContext<AuthFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={root} onSubmit={handleSubmit}>
      <SubTitle text="Авторизація" />
      <Input type="text" label="Email" name="email" />
      <Input type="password" label="Пароль" name="password" />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          ok
        </Button>
        <div />
        <Button href="/overmail" btnType="primary">
          over mail
        </Button>
        <Button href="/signup" btnType="primary">
          sing up
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<AuthFormValues>;

export const AuthForm = () => {
  const navigate = useNavigate();

  return (
    <FormikProvider
      initialValues={{ email: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={(values) => {
        console.log(values);
        app.login(values).then((success) => {
          if (!success) return modalService.showMessage('Невірний email або пароль');
          navigate('/');
        });
      }}
    >
      <Auth />
    </FormikProvider>
  );
};
