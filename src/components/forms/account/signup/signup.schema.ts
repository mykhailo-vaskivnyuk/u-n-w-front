import * as yup from 'yup';

export enum SignupField {
  NAME = 'name',
  EMAIL = 'email',
}
export const SignupSchema = yup.object().shape({
  [SignupField.NAME]: yup.string().required(),
  [SignupField.EMAIL]: yup.string().required().email(),
});

export interface SignupFormValues {
  [SignupField.NAME]: string;
  [SignupField.EMAIL]: string;
}
