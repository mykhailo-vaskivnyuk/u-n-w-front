import { ITableUsers } from '../../../local/imports';
import { UserStateKeys } from '../../constants';

export type IUserResponse =
  | null
  | (Pick<ITableUsers, 'email' | 'name' | 'mobile' | 'net_name'> & {
      user_state: UserStateKeys;
    });

export type ISignupParams = {
  email: string,
};

export type ILoginParams = ISignupParams & {
  password: string,
};

export type IConfirmParams = {
  token: string,
};
