import * as yup from 'yup';

export enum SignupField {
  EMAIL = 'email',
  // PASSWORD = 'password',
}
export const SignupSchema = yup.object().shape({
  [SignupField.EMAIL]: yup.string().required(), // .email(),
  // [SignupField.PASSWORD]: yup.string().required(),
});

export interface SignupFormValues {
  [SignupField.EMAIL]: string;
  // [SignupField.PASSWORD]: string;
}
