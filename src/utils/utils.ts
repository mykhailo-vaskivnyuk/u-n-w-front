import { useMatch } from 'react-router-dom';
import * as T from '@server/types/types';

export const useMatchParam = (
  paramName: string,
  path: string,
  end: boolean = true,
  isNumberParam: boolean = true,
) => {
  const { params } = useMatch<typeof paramName, typeof path>({ path, end }) || {};
  const { [paramName]: strParamValue = '' } = params || {};
  return isNumberParam ? Number(strParamValue) || 0 : strParamValue;
};

export const getMemberPosition = (netView: T.NetViewEnum, memberUiPosition: number) =>
  netView === 'tree' ? memberUiPosition - 1 : memberUiPosition && memberUiPosition - 1;
