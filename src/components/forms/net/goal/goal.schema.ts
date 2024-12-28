import * as yup from 'yup';

export enum NetGoalField {
  GOAL = 'goal',
}
export const NetGoalSchema = yup.object().shape({
  [NetGoalField.GOAL]: yup.string().required().min(10).max(255),
});

export interface NetGoalFormValues {
  [NetGoalField.GOAL]: string;
}
