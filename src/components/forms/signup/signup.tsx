import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { app } from '@api/client.app/client.app';
import { modalService } from '@services/modal.service';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './signup.styles';
import { SignupField, SignupFormValues, SignupSchema } from './signup.schema';

const Signup: FC = () => {
  const { root, buttons } = useStyles();
  const { submitForm } = useFormikContext<SignupFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={root} onSubmit={handleSubmit}>
      <SubTitle text="Створити акаунт" />
      <Input type="text" label="Email" name={SignupField.EMAIL} />
      <div className={buttons}>
        <Button type="submit" onClick={() => {}} btnType="secondary">
          ok
        </Button>
        <div />
        <Button href="/auth" btnType="primary">
          sing in
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<SignupFormValues>;

export const SignupForm = () => {
  const navigate = useNavigate();

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values) => {
        console.log(values);
        await app.account
          .signup(values)
          .then((success) => {
            if (success) return navigate('/account');
            modalService.showError('Користувач з таким email вже зареєстрований');
          })
          .catch();
      }}
    >
      <Signup />
    </FormikProvider>
  );
};
