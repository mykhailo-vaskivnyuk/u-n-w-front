import * as yup from 'yup';

export enum LoginField {
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginSchema = yup.object().shape({
  email: yup.string().required(), // .email(),
  password: yup.string().required(),
});
