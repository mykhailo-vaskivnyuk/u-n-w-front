import * as yup from 'yup';

export enum AccountField {
  EMAIL = 'email',
  NAME = 'name',
  NET_NAME = 'net_name',
  MOBILE = 'mobile',
  PASSWORD = 'password',
}

export const AccountSchema = yup.object().shape({
  [AccountField.EMAIL]: yup.string().required().email(),
  [AccountField.NAME]: yup.string(),
  [AccountField.NET_NAME]: yup.string(),
  [AccountField.MOBILE]: yup.string(),
  [AccountField.PASSWORD]: yup.string(),
});

export interface AccountFormValues {
  [AccountField.EMAIL]: string;
  [AccountField.NAME]?: string;
  [AccountField.NET_NAME]?: string;
  [AccountField.MOBILE]?: string;
  [AccountField.PASSWORD]?: string;
}