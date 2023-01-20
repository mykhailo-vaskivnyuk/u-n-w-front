import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { MAX_NET_LEVEL } from '@api/api/constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { NetCreateField, NetCreateFormValues, NetCreateSchema } from './create.schema';
import { useStyles } from './create.styles';

const FormikProvider = Formik<NetCreateFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.NET_CREATED);
const showFail = () => modalService.showError(MessagesMap.NET_CREATE_FAIL);

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
  const { net_level: netLevel = -1 } = app.getState().net || {};

  if (netLevel >= MAX_NET_LEVEL) {
    return <div>NET_LEVEL_LIMIT_EXCEEDED</div>;
  }

  return (
    <FormikProvider
      initialValues={{ name: '' }}
      validationSchema={NetCreateSchema}
      onSubmit={async (values) => {
        await app.net.create(values).then((newNet) => {
          if (!newNet) return showFail();
          showSuccess();
          navigate.toNet(newNet).id();
        });
      }}
    >
      <NetCreate />
    </FormikProvider>
  );
};
