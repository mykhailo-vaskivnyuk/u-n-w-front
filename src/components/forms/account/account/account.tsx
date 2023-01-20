import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { app } from '@api/app/client.app';
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
  const navigate = useNavigateTo();
  const user = useUser();

  if (!user) return null;

  const { email, name, mobile } = user || {};
  const initialValue = {
    email,
    name: name || undefined,
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
            navigate.toIndex(true);
          })
          .catch(() => {});
      }}
    >
      <Account />
    </FormikProvider>
  );
};
