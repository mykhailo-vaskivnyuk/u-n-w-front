import React, { FC, FormEvent, useCallback } from 'react';
import { Formik, useFormikContext } from 'formik';
import { RoutesMap } from '@constants/router.constants';
import { MessagesMap } from '@constants/messages';
import { useMember } from '@hooks/useMember';
import { modalService } from '@services/modal.service';
import { makeDynamicPathname } from '@utils/utils';
import { app } from '@api/app/client.app';
import { Input } from '@components/controls/input/input';
import { Button } from '@components/buttons/button/button';
import { MemberInviteField, MemberInviteFormValues, MemberInviteSchema } from './invite.schema';
import { useStyles } from './invite.styles';

const pathToInvite = RoutesMap.NET.INVITE;

const MemberInvite: FC = () => {
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
      <Input type="text" label="Member name" name={MemberInviteField.MEMBER_NAME} />
      <div className={buttons}>
        <Button type="submit" btnType="secondary">
          запросити
        </Button>
      </div>
    </form>
  );
};

const FormikProvider = Formik<MemberInviteFormValues>;
const showSuccess = () => modalService.showMessage(MessagesMap.MEMBER_INVITE_CREATE);
const showFailed = () => modalService.showError(MessagesMap.MEMBER_INVITE_CREATE_FAILED);

export const MemberInviteForm = () => {
  const { node_id: nodeId, member_name: memberName } = useMember();

  return (
    <FormikProvider
      initialValues={{ member_name: memberName, node_id: nodeId }}
      validationSchema={MemberInviteSchema}
      onSubmit={(values) =>
        app.member.inviteCreate(values).then((token) => {
          if (!token) return showFailed();
          const { origin } = window.location;
          const path = makeDynamicPathname(pathToInvite, token);
          const url = `${origin}/#${path}`;
          navigator.clipboard.writeText(url);
          return showSuccess();
        })
      }
    >
      <MemberInvite />
    </FormikProvider>
  );
};
