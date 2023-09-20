import React, { createContext, FC, PropsWithChildren, useMemo } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RoutesMap } from '@constants/router.constants';
import { makeDynamicPathname } from '@utils/format.utils';

const { INDEX: netPath } = RoutesMap.NET.NET_ID;
const { USER: treeUserPath, NODE_ID: TREE } = RoutesMap.NET.NET_ID.TREE;
const { USER: circleUserPath, NODE_ID: CIRCLE } = RoutesMap.NET.NET_ID.CIRCLE;
const { INDEX: treeMemberPath, CONNECTED: connectedPath, INVITE: invitePath } = TREE;
const { INDEX: circleMemberPath } = CIRCLE;

const getNavigateMap = (navigate: NavigateFunction) => {
  return {
    to: navigate,
    back: () => navigate(-1),
    toIndex: (replace: boolean = false) => navigate(RoutesMap.ROOT, { replace }),
    toLogin: () => navigate(RoutesMap.ACCOUNT.LOGIN),
    toAccount: (replace: boolean = false) => navigate(RoutesMap.ACCOUNT.INDEX, { replace }),
    toSignup: (replace: boolean = false) => navigate(RoutesMap.ACCOUNT.SIGNUP, { replace }),
    toNet: ({ net_id: netId }: { net_id: number }) => ({
      id: (replace: boolean = false, netView = 'tree') =>
        navigate(makeDynamicPathname(netPath, netId), { replace, state: { netView } }),
      treeMember: (nodeId: number) => navigate(makeDynamicPathname(treeMemberPath, netId, nodeId)),
      circleMember: (nodeId: number) =>
        navigate(makeDynamicPathname(circleMemberPath, netId, nodeId)),
      connected: (nodeId: number) => navigate(makeDynamicPathname(connectedPath, netId, nodeId)),
      invite: (nodeId: number) => navigate(makeDynamicPathname(invitePath, netId, nodeId)),
      treeUser: () => navigate(makeDynamicPathname(treeUserPath, netId)),
      circleUser: () => navigate(makeDynamicPathname(circleUserPath, netId)),
    }),
  };
};

export const NavigateContext = createContext<ReturnType<typeof getNavigateMap>>(
  getNavigateMap(() => {}),
);
const Provider = NavigateContext.Provider;

export const NavigateProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const value = useMemo(() => getNavigateMap(navigate), [navigate]);
  return <Provider value={value}>{children}</Provider>;
};
