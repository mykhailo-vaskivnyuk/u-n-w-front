import { NetViewEnum } from '@api/api/types/types';
import { app } from '@api/app/client.app';

export const useNetView = (netView: NetViewEnum) => {
  const { netView: curNetView } = app.getState();
  const loaded = curNetView === netView;
  !loaded && app.net.setView(netView);
  return netView;
};
