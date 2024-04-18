import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { modalService } from '@services/modal.service';
import { makeUrl } from '@utils/format.utils';
import { app } from '@client/app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { MemberInviteField, MemberInviteFormValues, MemberInviteSchema } from './invite.schema';
import { useStyles } from './invite.styles';

const pathToInvite = RoutesMap.NET.INVITE;
const FormikProvider = Formik<MemberInviteFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CREATE);
const showFail = () => modalService.showError(MessagesMap.MEMBER_INVITE_CREATE_FAIL);
const showNotGoal = () => modalService.showError(MessagesMap.NET_NOT_GOAL);

const MemberInviteCreate: FC = () => {
  const { buttons } = useStyles();
  const { submitForm } = useFormikContext<MemberInviteFormValues>();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      submitForm();
    },
    [submitForm],
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" label="І'мя" name={MemberInviteField.MEMBER_NAME} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          запросити
        </Button>
      </div>
    </form>
  );
};

export const MemberInviteCreateForm = () => {
  const { member_name: memberName } = app.getState().memberData!;

  return (
    <FormikProvider
      initialValues={{ member_name: memberName }}
      validationSchema={MemberInviteSchema}
      onSubmit={(values) => {
        const { net } = app.getState();
        if (!net?.goal) return showNotGoal();
        app.net.member!.inviteCreate(values).then((token) => {
          if (!token) return showFail();
          const url = makeUrl(pathToInvite, token);
          navigator.clipboard.writeText(url);
          return showSuccess();
        });
      }}
    >
      <MemberInviteCreate />
    </FormikProvider>
  );
};
