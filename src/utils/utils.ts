import { IUserResponse } from '@api/api/types/account.types';
import { IMenuItem } from '@components/menu/types';
import { USER_STATE_MAP } from '@api/constants';

const isDEV = process.env.NODE_ENV === 'development';

export const format = (str: string, ...values: string[]) => {
  return values.reduce((result, value) => result.replace('%s', value), str);
};

export const getMenuItemsForUser = (menuItems: IMenuItem[], user: IUserResponse) => {
  let { user_state: userState } = user || {};
  if (!userState) userState = 'NOT_LOGGEDIN';
  const filteredMenuItems = menuItems.filter(({ allowForUser }) => {
    if (Array.isArray(allowForUser)) return allowForUser.includes(userState!);
    return (
      USER_STATE_MAP[allowForUser] <= USER_STATE_MAP[userState!] ||
      (isDEV && allowForUser === 'DEV')
    );
  });
  return filteredMenuItems.length ? filteredMenuItems : undefined;
};
