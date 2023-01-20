import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { format } from '@utils/utils';
import { app } from '@api/app/client.app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { OvermailField, OvermailFormValues, OvermailSchema } from './overmail.schema';
import { useStyles } from './overmail.styles';

const FormikProvider = Formik<OvermailFormValues>;
const showSuccess = (values: OvermailFormValues) => {
  const message = format(MessagesMap.RESTORE_LINK_SENT, values[OvermailField.EMAIL]);
  modalService.showMessage(message);
};
const showFail = (values: OvermailFormValues) => {
  const message = format(MessagesMap.RESTORE_LINK_NOT_SENT, values[OvermailField.EMAIL]);
  modalService.showError(message);
};

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

export const OvermailForm = () => {
  const navigate = useNavigateTo();

  return (
    <FormikProvider
      initialValues={{ email: '' }}
      validationSchema={OvermailSchema}
      onSubmit={(values) => {
        app.account.overmail(values).then((success) => {
          if (!success) return showFail(values);
          showSuccess(values);
          navigate.toIndex(true);
        });
      }}
    >
      <Overmail />
    </FormikProvider>
  );
};
