import * as yup from 'yup';

export enum WaitCreateField {
  COMMENT = 'comment',
  TOKEN = 'token',
  TEST = 'test',
}
export const WaitCreateSchema = yup.object().shape({
  [WaitCreateField.COMMENT]: yup.string().required().max(255),
  [WaitCreateField.TOKEN]: yup.string().required(),
  [WaitCreateField.TEST]: yup.boolean().required(),
});

export interface WaitCreateFormValues {
  [WaitCreateField.COMMENT]: string;
  [WaitCreateField.TOKEN]: string;
  [WaitCreateField.TEST]: boolean;
}
