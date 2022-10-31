import { api } from './client.api';

export type IUser = null | {
  email: string;
  name: string | null;
  mobile: string | null;
  net_name: string | null;
  confirmed: boolean;
};
