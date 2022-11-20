import React, { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { NetCreateField, NetCreateFormValues, NetCreateSchema } from './create.schema';
import { useStyles } from './create.styles';

const NetCreate: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<NetCreateFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Name" name={NetCreateField.NAME} />
      <div className={buttons}>
        <Button type="submit" onClick={() => {}} btnType="secondary">
          створити
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<NetCreateFormValues>;

export const NetCreateForm = () => {
  const navigate = useNavigate();

  const navigateToIndex = useCallback(() => navigate(RoutesMap.ROOT), [navigate]);
  const showSuccess = useCallback(() => modalService.showMessage(MessagesMap.NET_CREATED), []);
  const showFailed = useCallback(() => modalService.showError(MessagesMap.NET_CREATE_FAILED), []);

  return (
    <FormikProvider
      initialValues={{ name: '' }}
      validationSchema={NetCreateSchema}
      onSubmit={async (values) => {
        await app.netMethods.create(values).then((net) => {
          if (!net) return showFailed();
          showSuccess();
          navigateToIndex();
        });
      }}
    >
      <NetCreate />
    </FormikProvider>
  );
};
