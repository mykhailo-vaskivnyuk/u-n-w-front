import * as yup from 'yup';

export enum OvermailField {
  EMAIL = 'email',
}
export const OvermailSchema = yup.object().shape({
  [OvermailField.EMAIL]: yup.string().required().email(),
});

export interface OvermailFormValues {
  [OvermailField.EMAIL]: string;
}
