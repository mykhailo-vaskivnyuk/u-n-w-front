import * as yup from 'yup';

export enum SignupField {
  EMAIL = 'email',
}
export const SignupSchema = yup.object().shape({
  [SignupField.EMAIL]: yup.string().required().email(),
});

export interface SignupFormValues {
  [SignupField.EMAIL]: string;
}
