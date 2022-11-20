export type TNetEnter = {
  net_id: number;
};
export type TScriptsScriptjsResponse = Record<string, any>;
export type TUserGetNets = {
  net_id?: null | number;
};
export type TUserGetNetsResponse = {
  parent_nets?: {
  net_id: number;
  name: string;
};
  sibling_nets?: {
  net_id: number;
  name: string;
};
  child_nets?: {
  net_id: number;
  name: string;
};
};
