import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { RoutesMap } from '@components/router/constants';
import { MessagesMap } from '@constants/messages';
import { AccountField, AccountFormValues } from './account.schema';
import { useStyles } from './account.styles';

const Account: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<AccountFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={AccountField.EMAIL} />
      <Input type="text" label="Name" name={AccountField.NAME} />
      <Input type="text" label="Net name" name={AccountField.NET_NAME} />
      <Input type="text" label="Mobile" name={AccountField.MOBILE} />
      <Input type="text" label="Password" name={AccountField.PASSWORD} />
      <div className={buttons}>
        {/* <Button type="submit" btnType="primary">
          save
        </Button>
        <Button type="reset" btnType="secondary">
          cancel
        </Button> */}
        <Button type="submit" btnType="secondary">
          delete
        </Button>
        <div />
      </div>
    </form>
  );
};

const FormikProvider = Formik<AccountFormValues>;

export const AccountForm = () => {
  const navigate = useNavigate();

  const navigateToIndex = useCallback(
    () => navigate(RoutesMap.INDEX, { replace: true }),
    [navigate],
  );
  const showSuccess = useCallback(() => modalService.showMessage(MessagesMap.ACCOUNT_DELETED), []);
  const showFailed = useCallback(() => modalService.showError(MessagesMap.ACCOUNT_NOT_DELETED), []);

  const user = useUser();

  if (!user) return null;

  const { email = '', name = '', net_name: netName = '', mobile = '' } = user || {};
  const initialValue = {
    email,
    name: name || undefined,
    net_name: netName || undefined,
    mobile: mobile || undefined,
  };

  return (
    <FormikProvider
      initialValues={initialValue}
      onSubmit={(values) => {
        console.log(values);
        app.account.logoutOrRemove('remove').then((success) => {
          if (!success) return showFailed();
          showSuccess();
          navigateToIndex();
        });
      }}
    >
      <Account />
    </FormikProvider>
  );
};
