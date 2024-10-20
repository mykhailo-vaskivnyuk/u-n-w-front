import React, { FC, FormEvent, useCallback, useEffect } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { modalService } from '@services/modal.service';
import { useMatchParam } from '@utils/utils';
import { app } from '@client/app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { IWaitCreateParams } from '@app/common/server/types/net.types';
import { WaitCreateField, WaitCreateFormValues, WaitCreateSchema } from './wait.create.schema';
import { useStyles } from './wait.create.styles';

const FormikProvider = Formik<WaitCreateFormValues>;
const invitePath = RoutesMap.ACCOUNT.WAIT.CREATE;
const showSuccess = () => modalService.showMessage(MessagesMap.WAIT_CREATED);
const showFail = () => modalService.showError(MessagesMap.NET_CONNECT_FAIL);
const showExists = () => modalService.showError(MessagesMap.WAIT_EXISTS);
const showBadLink = () => modalService.showError(MessagesMap.BAD_LINK);

const WaitCreate: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<WaitCreateFormValues>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="Контактні дані" name={WaitCreateField.COMMENT} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          створити
        </Button>
      </div>
    </form>
  );
};

export const WaitCreateForm = () => {
  const navigate = useNavigateTo();
  const token = useMatchParam('token', invitePath, true, false) as string;

  const handleSubmit = useCallback(
    async (values: IWaitCreateParams) => {
      let result;
      try {
        result = await app.userNets.waitCreate(values);
      } catch {
        return;
      }
      if (!result) {
        showBadLink();
        return navigate.toIndex();
      }
      const { error } = result;
      if (!error) {
        if (values.test) return;
        showSuccess();
        return navigate.toWaitNets(true);
      }
      if (error === 'not parent net member') {
        showFail();
        return navigate.toIndex();
      }
      showExists();
      return navigate.toIndex();
    },
    [navigate],
  );

  useEffect(() => {
    handleSubmit({ comment: 'test', token, test: true });
  }, [handleSubmit, token]);

  return (
    <FormikProvider
      initialValues={{ comment: '', token, test: false }}
      validationSchema={WaitCreateSchema}
      onSubmit={handleSubmit}
    >
      <WaitCreate />
    </FormikProvider>
  );
};
