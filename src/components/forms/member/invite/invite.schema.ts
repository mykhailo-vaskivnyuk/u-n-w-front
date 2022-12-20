import * as yup from 'yup';

export enum MemberInviteField {
  NODE_ID = 'node_id',
  MEMBER_NAME = 'member_name',
}

export const MemberInviteSchema = yup.object().shape({
  [MemberInviteField.NODE_ID]: yup.number().required(),
  [MemberInviteField.MEMBER_NAME]: yup.string().required(),
});

export interface MemberInviteFormValues {
  [MemberInviteField.NODE_ID]: number;
  [MemberInviteField.MEMBER_NAME]: string;
}
