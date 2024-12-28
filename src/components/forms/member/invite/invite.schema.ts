import * as yup from 'yup';

export enum MemberInviteField {
  MEMBER_NAME = 'member_name',
}

export const MemberInviteSchema = yup.object().shape({
  [MemberInviteField.MEMBER_NAME]: yup.string().required(),
});

export interface MemberInviteFormValues {
  [MemberInviteField.MEMBER_NAME]: string;
}
