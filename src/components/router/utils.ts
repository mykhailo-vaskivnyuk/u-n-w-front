import { TRoutes } from './types';

export const getRoutesMap = (routesMap: TRoutes, parentPath = '') => {
  const RoutesMap = {} as TRoutes;
  for (const [key, value] of Object.entries(routesMap)) {
    let childPath = parentPath;
    if (typeof value === 'string') {
      key !== 'INDEX' && (childPath += `/${value}`);
      RoutesMap[key] = childPath;
    } else {
      childPath += `/${value.INDEX}`;
      RoutesMap[key] = getRoutesMap(value, childPath);
    }
  }
  return RoutesMap;
};
