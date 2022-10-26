import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { app } from '@api/client.app';
import { ITableUsers } from '@api/db.types';
import { AccountField, AccountFormValues, AccountSchema } from './account.schema';
import { useStyles } from './account.styles';

const Account: FC = () => {
  const { root, buttons } = useStyles();
  const { submitForm } = useFormikContext<AccountFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form className={root} onSubmit={handleSubmit}>
      <SubTitle text="Аккаунт" />
      <Input type="text" label="Email" name={AccountField.EMAIL} />
      <Input type="text" label="Name" name={AccountField.NAME} />
      <Input type="text" label="Net name" name={AccountField.NET_NAME} />
      <Input type="text" label="Mobile" name={AccountField.MOBILE} />
      <Input type="text" label="Password" name={AccountField.PASSWORD} />
      <div className={buttons}>
        <Button type="submit" btnType="primary">
          save
        </Button>
        <Button type="reset" btnType="secondary">
          cancel
        </Button>
        <Button type="button" btnType="secondary">
          delete
        </Button>
        <div />
      </div>
    </form>
  );
};

const FormikProvider = Formik<AccountFormValues>;

export const AccountForm = () => {
  const user = app.getUser();
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
      validationSchema={AccountSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Account />
    </FormikProvider>
  );
};
