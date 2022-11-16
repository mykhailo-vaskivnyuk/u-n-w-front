export type TNetEnter = {
  net_id: number;
};
export type TNetReadUserNetsResponse = {
  net_id: number;
  name: string;
};
export type TScriptsScriptjsResponse = Record<string, any>;
export type TUserCreate = {
  name: string;
  field?: number;
};
export type TUserCreateResponse = {
  name?: string;
};
