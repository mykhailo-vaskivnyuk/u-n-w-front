import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { modalService } from '@services/modal.service';
import { format } from '@utils/utils';
import { app } from '@api/app/client.app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { SignupField, SignupFormValues, SignupSchema } from './signup.schema';
import { useStyles } from './signup.styles';

const FormikProvider = Formik<SignupFormValues>;
const showSuccess = (values: SignupFormValues) => {
  const message = format(MessagesMap.CONFIRM_LINK_SENT, values[SignupField.EMAIL]);
  modalService.showMessage(message);
};
const showFail = () => modalService.showError(MessagesMap.SIGNUP_FAILED);

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

export const SignupForm = () => {
  const navigate = useNavigateTo();

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        await app.account
          .loginOrSignup('signup', values)
          .then((user) => {
            if (!user) return showFail();
            showSuccess(values);
            navigate.toAccount(true);
          })
          .catch(() => {});
      }}
    >
      <Signup />
    </FormikProvider>
  );
};
