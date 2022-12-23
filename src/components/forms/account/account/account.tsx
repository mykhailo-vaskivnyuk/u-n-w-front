import React, { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { app } from '@api/app/client.app';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { AccountField, AccountFormValues } from './account.schema';
import { useStyles } from './account.styles';

const FormikProvider = Formik<AccountFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.ACCOUNT_DELETED);
const showFail = () => modalService.showError(MessagesMap.ACCOUNT_NOT_DELETED);

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

export const AccountForm = () => {
  const navigate = useNavigate();
  const navigateToIndex = useCallback(
    () => navigate(RoutesMap.ROOT, { replace: true }),
    [navigate],
  );

  const user = useUser();

  if (!user) return null;

  const { email, name, net_name: netName, mobile } = user || {};
  const initialValue = {
    email,
    name: name || undefined,
    net_name: netName || undefined,
    mobile: mobile || undefined,
  };

  return (
    <FormikProvider
      initialValues={initialValue}
      onSubmit={() => {
        app.account
          .logoutOrRemove('remove')
          .then((success) => {
            if (!success) return showFail();
            showSuccess();
            navigateToIndex();
          })
          .catch(() => {});
      }}
    >
      <Account />
    </FormikProvider>
  );
};
