import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from 'contexts/navigate/navigate';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { NetCreateField, NetCreateFormValues, NetCreateSchema } from './create.schema';
import { useStyles } from './create.styles';

const FormikProvider = Formik<NetCreateFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.NET_CREATED);
const showFail = () => modalService.showError(MessagesMap.NET_CREATE_FAILED);

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

export const NetCreateForm = () => {
  const navigate = useNavigateTo();

  return (
    <FormikProvider
      initialValues={{ name: '' }}
      validationSchema={NetCreateSchema}
      onSubmit={async (values) => {
        await app.netMethods.create(values).then((net) => {
          if (!net) return showFail();
          showSuccess();
          navigate.toNet(net).id();
        });
      }}
    >
      <NetCreate />
    </FormikProvider>
  );
};
