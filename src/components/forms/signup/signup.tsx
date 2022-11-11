import React, { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';
import { format } from '@utils/utils';
import { useStyles } from './signup.styles';
import { SignupField, SignupFormValues, SignupSchema } from './signup.schema';

const Signup: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<SignupFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={SignupField.EMAIL} />
      <div className={buttons}>
        <Button type="submit" onClick={() => {}} btnType="secondary">
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

const FormikProvider = Formik<SignupFormValues>;

export const SignupForm = () => {
  const navigate = useNavigate();

  const navigateToAccount = useCallback(
    () => navigate(RoutesMap.ACCOUNT.INDEX, { replace: true }),
    [navigate],
  );
  const showSuccess = useCallback((values: SignupFormValues) => {
    const message = format(MessagesMap.CONFIRM_LINK_SENT, values[SignupField.EMAIL]);
    modalService.showMessage(message);
  }, []);
  const showFailed = useCallback(() => modalService.showError(MessagesMap.SIGNUP_FAILED), []);

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        await app.account
          .loginOrSignup('signup', values)
          .then((user) => {
            if (!user) return showFailed();
            showSuccess(values);
            navigateToAccount();
          })
          .catch(() => {});
      }}
    >
      <Signup />
    </FormikProvider>
  );
};
