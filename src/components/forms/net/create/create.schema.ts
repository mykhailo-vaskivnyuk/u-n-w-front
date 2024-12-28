import * as yup from 'yup';

export enum NetCreateField {
  NAME = 'name',
}
export const NetCreateSchema = yup.object().shape({
  [NetCreateField.NAME]: yup.string().required(),
});

export interface NetCreateFormValues {
  [NetCreateField.NAME]: string;
}
