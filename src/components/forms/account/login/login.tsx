import React, { FC, FormEvent, useRef } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { format } from '@utils/utils';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { LoginField, LoginFormValues, LoginSchema } from './login.schema';
import { useStyles } from './login.styles';

const FormikProvider = Formik<LoginFormValues>;
const showNotConfirmed = (values: LoginFormValues) => {
  const message = format(MessagesMap.NOT_CONFIRMED, values[LoginField.EMAIL]);
  modalService.showError(message);
};
const showFailed = () => modalService.showError(MessagesMap.LOGIN_FAIL);

const Login: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<LoginFormValues>();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ref.current?.blur();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={LoginField.EMAIL} />
      <Input type="password" label="Пароль" name={LoginField.PASSWORD} elRef={ref} />
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

export const LoginForm = () => {
  const navigate = useNavigateTo();

  return (
    <FormikProvider
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) =>
        app.account
          .loginOrSignup('login', values)
          .then((user) => {
            if (!user) {
              actions.setFieldValue(LoginField.PASSWORD, '');
              actions.setFieldTouched(LoginField.PASSWORD, false);
              return showFailed();
            }
            user.user_status === 'NOT_CONFIRMED' && showNotConfirmed(values);
            navigate.toIndex(true);
          })
          .catch(() => {})
      }
    >
      <Login />
    </FormikProvider>
  );
};
