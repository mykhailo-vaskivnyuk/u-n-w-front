import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { MessagesMap } from '@constants/messages';
import { useMember } from '@hooks/useMember';
import { modalService } from '@services/modal.service';
import { app } from '@api/app/client.app';
import { Button } from '@components/buttons/button/button';
import { MemberInviteFormValues, MemberInviteSchema } from './invite.schema';
import { useStyles } from './invite.styles';

const MemberCancelInvite: FC = () => {
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
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          скасувати
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<MemberInviteFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CANCEL);
const showFailed = () => modalService.showError(MessagesMap.MEMBER_INVITE_CANCEL_FAILED);

export const MemberCancelInviteForm = () => {
  const { node_id: nodeId, member_name: memberName } = useMember();

  return (
    <FormikProvider
      initialValues={{ member_name: memberName, node_id: nodeId }}
      validationSchema={MemberInviteSchema}
      onSubmit={async (values) => {
        await app.member.inviteCancel(values).then((success) => {
          return success ? showSuccess() : showFailed();
        });
      }}
    >
      <MemberCancelInvite />
    </FormikProvider>
  );
};
