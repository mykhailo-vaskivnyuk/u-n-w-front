import * as yup from 'yup';

export enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface LoginFormValues {
  [LoginField.EMAIL]: string;
  [LoginField.PASSWORD]: string;
}

export const LoginSchema = yup.object().shape({
  [LoginField.EMAIL]: yup.string().required().email(),
  [LoginField.PASSWORD]: yup.string().required(),
});
