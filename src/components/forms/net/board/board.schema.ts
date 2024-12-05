import * as yup from 'yup';

export enum NetBoardField {
  MESSAGE = 'message',
  MESSAGE_ID = 'message_id',
}

export const NetBoardSchema = yup.object().shape({
  [NetBoardField.MESSAGE]: yup.string().max(255),
});

export interface NetBoardFormValues {
  [NetBoardField.MESSAGE]: string;
  [NetBoardField.MESSAGE_ID]?: number;
}
