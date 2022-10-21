import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { SignupField, SignupFormValues, SignupSchema } from './signup.schema';
import { useStyles } from './signup.styles';

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
  return (
    <FormikProvider
      initialValues={{ [SignupField.EMAIL]: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => console.log(values)}
    >
      <Signup />
    </FormikProvider>
  );
};
