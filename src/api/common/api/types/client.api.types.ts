import * as P from './types';

export type TMemberInviteCreateResponse = string | null;
export type TNetChatSend = {
  net_id: number;
  chatId: number;
  message: string;
};
export type TNetChatSendResponse = {
  chatId: number;
  message: string;
};
export type TNetConnectByTokenResponse = null | {
  net_id: number;
  error?: string;
};
export type TScriptsScriptjsResponse = Record<string, any>;
export type TTestDataResponse = {
  field1: null | number;
  field2: P.ITestResponse;
};
