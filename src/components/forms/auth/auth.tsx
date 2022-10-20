import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
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
      <Input type="text" label="Логін" name="email" />
      <Input type="password" label="Пароль" name="password" />
      <div className={buttons}>
        <Button type="submit" onClick={() => {}} btnType="secondary">
          ok
        </Button>
        <div />
        <Button onClick={() => {}} btnType="primary">
          over mail
        </Button>
        <Button onClick={() => {}} btnType="primary">
          sing up
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<AuthFormValues>;

export const AuthForm = () => {
  return (
    <FormikProvider
      initialValues={{ email: '', password: '' }}
      validationSchema={AuthSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Auth />
    </FormikProvider>
  );
};
