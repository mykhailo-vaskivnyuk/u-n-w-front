import { useMemo } from 'react';
import { MENU_INSIDE_NET_ITEMS } from '@constants/menu.constants';
import { getNetMenuItems } from '@utils/utils';
import { app } from '@api/app/client.app';

export const useNetMenuItems = () =>
  useMemo(() => {
    const { net, user } = app.getState();
    return getNetMenuItems(MENU_INSIDE_NET_ITEMS, user, net);
  }, []);
