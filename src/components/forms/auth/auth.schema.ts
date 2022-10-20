import * as yup from 'yup';

export const AuthSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required(),
});

export interface AuthFormValues {
  email: string;
  password: string;
}
