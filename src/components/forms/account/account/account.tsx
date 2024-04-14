import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { IUserResponse, OmitNull } from '@server/types/types';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { useUser } from '@hooks/useUser';
import { app } from '@client/app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { AccountField, AccountFormValues, AccountSchema } from './account.schema';
import { useStyles } from './account.styles';

const FormikProvider = Formik<AccountFormValues>;
const showUpdateSuccess = () => modalService.showMessage(MessagesMap.ACCOUNT_UPDATED);
const showSuccess = () => modalService.showMessage(MessagesMap.ACCOUNT_DELETED);
const showFail = () => modalService.showError(MessagesMap.ACCOUNT_NOT_DELETED);
const getInitialValue = (user: OmitNull<IUserResponse>) => {
  const { email, name, mobile } = user;
  return {
    email: email || '',
    name: name || '',
    mobile: mobile || '',
    password: '',
  };
};

const Account: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<AccountFormValues>();
  const navigate = useNavigateTo();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  const handleDelete = () => {
    app.account
      .logoutOrRemove('remove')
      .then((success) => {
        if (!success) return showFail();
        showSuccess();
        navigate.toIndex(true);
      })
      .catch(() => {});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Email" name={AccountField.EMAIL} disabled />
      <Input type="text" label="Name" name={AccountField.NAME} />
      <Input type="text" label="Mobile" name={AccountField.MOBILE} />
      <Input type="text" label="Password" name={AccountField.PASSWORD} />
      <div className={buttons}>
        <Button type="submit" btnType="primary">
          save
        </Button>
        <Button type="button" btnType="secondary" onClick={handleDelete}>
          delete
        </Button>
        <div />
      </div>
    </form>
  );
};

export const AccountForm = () => {
  const [user] = useUser();

  if (!user) return null;

  return (
    <FormikProvider
      initialValues={getInitialValue(user)}
      validationSchema={AccountSchema}
      onSubmit={(values, { setValues }) => {
        app.account
          .update(values)
          .then((newUser) => {
            if (!newUser) return;
            setValues(getInitialValue(newUser));
            showUpdateSuccess();
          })
          .catch(() => {});
      }}
    >
      <Account />
    </FormikProvider>
  );
};
