import * as yup from 'yup';

export enum AccountField {
  EMAIL = 'email',
  NAME = 'name',
  MOBILE = 'mobile',
  PASSWORD = 'password',
}

export const AccountSchema = yup.object().shape({
  [AccountField.EMAIL]: yup.string().email(),
  [AccountField.NAME]: yup.string().required(),
  [AccountField.MOBILE]: yup.string(),
  [AccountField.PASSWORD]: yup.string(),
});

export interface AccountFormValues {
  [AccountField.EMAIL]: string;
  [AccountField.NAME]: string;
  [AccountField.MOBILE]: string;
  [AccountField.PASSWORD]: string;
}
