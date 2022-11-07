import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { app } from '@api/app/client.app';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { useNavigate } from 'react-router-dom';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';
import { format } from '@utils/utils';
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

  const navigateToIndex = useCallback(
    () => navigate(RoutesMap.INDEX, { replace: true }),
    [navigate],
  );
  const showSuccess = useCallback((values: OvermailFormValues) => {
    const message = format(MessagesMap.RESTORE_LINK_SENT, values[OvermailField.EMAIL]);
    modalService.showMessage(message);
  }, []);
  const showFailed = useCallback((values: OvermailFormValues) => {
    const message = format(MessagesMap.RESTORE_LINK_NOT_SENT, values[OvermailField.EMAIL]);
    modalService.showError(message);
  }, []);

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={OvermailSchema}
      onSubmit={(values) => {
        console.log(values);
        app.account
          .overmail(values)
          .then((success) => {
            if (!success) return showFailed(values);
            showSuccess(values);
            navigateToIndex();
          })
          .catch(() => {});
      }}
    >
      <Overmail />
    </FormikProvider>
  );
};
