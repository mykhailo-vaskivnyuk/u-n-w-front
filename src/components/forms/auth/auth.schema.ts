import * as yup from 'yup';

export interface AuthFormValues {
  email: string;
  password: string;
}

export const AuthSchema = yup.object().shape({
  email: yup.string().required(), // .email(),
  password: yup.string().required(),
});
