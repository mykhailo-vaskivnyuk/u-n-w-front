import { TRoutes } from './types';

export const getRoutesMap = (routesMap: TRoutes, parentPath = '') => {
  const RoutesMap = {} as TRoutes;
  for (const [key, value] of Object.entries(routesMap)) {
    if (typeof value === 'string') {
      const childPath = key === 'INDEX' ? `/${value}` : `${parentPath}/${value}`;
      RoutesMap[key] = childPath;
    } else {
      const childPath = `${parentPath}/${value.INDEX}`;
      RoutesMap[key] = getRoutesMap(value, childPath);
    }
  }
  return RoutesMap;
};
