import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/client.app';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { OvermailField, OvermailFormValues, OvermailSchema } from './overmail.schema';
import { useStyles } from './overmail.styles';
import { useNavigate } from 'react-router-dom';
import modalService from '@services/modal.service';

const Overmail: FC = () => {
  const { root, buttons } = useStyles();
  const { submitForm } = useFormikContext<OvermailFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={root} onSubmit={handleSubmit}>
      <SubTitle text="Ввійти через EMAIL" />
      <Input type="text" label="Email" name={OvermailField.EMAIL} />
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

const FormikProvider = Formik<OvermailFormValues>;

export const OvermailForm = () => {
  const navigate = useNavigate();

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={OvermailSchema}
      onSubmit={async (values, actions) => {
        console.log(values);
        const success = await app.overmail(values);
        modalService.showMessage('Email відправлено');
        actions.resetForm;
        navigate('/');
      }}
    >
      <Overmail />
    </FormikProvider>
  );
};
