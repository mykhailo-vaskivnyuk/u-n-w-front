import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/client.app/client.app';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { OvermailField, OvermailFormValues, OvermailSchema } from './overmail.schema';
import { useStyles } from './overmail.styles';

const Overmail: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<OvermailFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={OvermailField.EMAIL} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          надіслати
        </Button>
        <div />
        <Button href={RoutesMap.ACCOUNT.LOGIN} btnType="primary">
          авторизуватись
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
      onSubmit={(values) => {
        console.log(values);
        app.account
          .overmail(values)
          .then((success) => {
            if (success) {
              const message = `Лінк відправлено на ${values[OvermailField.EMAIL]}`;
              modalService.showMessage(message);
              return navigate(RoutesMap.ACCOUNT.LOGIN);
            }
            const message = `Не можливо відправити лінк на ${values[OvermailField.EMAIL]}`;
            modalService.showError(message);
          })
          .catch();
      }}
    >
      <Overmail />
    </FormikProvider>
  );
};
