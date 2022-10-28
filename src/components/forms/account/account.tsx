import React, { FC, FormEvent } from 'react';
import { Formik, useFormikContext } from 'formik';
import { Button } from '@components/buttons/button/button';
import { Input } from '@components/controls/input/input';
import { SubTitle } from '@components/subtitle/subtitle';
import { app } from '@api/client.app/client.app';
import { modalService } from '@services/modal.service';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/useUser';
import { AccountField, AccountFormValues } from './account.schema';
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
      <SubTitle text="Акаунт" />
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
      // validationSchema={AccountSchema}
      onSubmit={(values) => {
        console.log(values);
        app.account.removeUser().then((success) => {
          if (!success) return modalService.showError('Не вдалося видалити акаунт');
          navigate('/');
        });
      }}
    >
      <Account />
    </FormikProvider>
  );
};
