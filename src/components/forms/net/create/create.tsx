import React, { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';
import { format } from '@utils/utils';
import { useStyles } from './create.styles';
import { NetCreateField, NetCreateFormValues, NetCreateSchema } from './create.schema';

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

  const navigateToAccount = useCallback(
    () => navigate(RoutesMap.ACCOUNT.INDEX, { replace: true }),
    [navigate],
  );
  const showSuccess = useCallback((values: NetCreateFormValues) => {
    const message = format(MessagesMap.CONFIRM_LINK_SENT, values[NetCreateField.NAME]);
    modalService.showMessage(message);
  }, []);
  const showFailed = useCallback(() => modalService.showError(MessagesMap.SIGNUP_FAILED), []);

  return (
    <FormikProvider
      initialValues={{ name: '' }}
      validationSchema={NetCreateSchema}
      onSubmit={async (values) => {
        await app.net
          .create({
            ...values,
            net_level: 0,
            parent_net_id: null,
            first_net_id: null,
            count_of_nets: 0,
          })
          .then((net) => {
            if (!net) return showFailed();
            showSuccess(values);
          })
          .catch(() => {});
      }}
    >
      <NetCreate />
    </FormikProvider>
  );
};
