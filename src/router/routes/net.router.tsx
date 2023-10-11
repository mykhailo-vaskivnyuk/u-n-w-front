import React from 'react';
import { Route } from 'react-router-dom';
import { RelativeRoutesMap } from '@constants/router.constants';
import { Net } from '@views/net/net';
import { NetCreate } from '@views/net/create/create';
import { NetLeave } from '@views/net/leave/leave';
import { NetInvite } from '@views/net/invite/invite';
import { NetIdIndex } from '@views/net/net.id/net.id.index';
import { NetId } from '@views/net/net.id/net.id';
import { NetGoal } from '@views/net/goal/goal';
import { NetInfo } from '@views/net/info/info';
import { NetChat } from '@views/chat/net.chat';
import { NetBoard } from '@views/net/board/board';
import { CircleRouter } from './circle.router';
import { TreeRouter } from './tree.router';

const { NET } = RelativeRoutesMap;
const { NET_ID } = NET;

export const NetRouter = (
  <Route path={NET.INDEX}>
    <Route path="" element={<Net />} />
    <Route path={NET.CREATE} element={<NetCreate />} />
    <Route path={NET.INVITE} element={<NetInvite />} />
    <Route path={NET_ID.INDEX} element={<NetIdIndex />}>
      <Route path="" element={<NetId />} />
      <Route path={NET_ID.GOAL} element={<NetGoal />} />
      <Route path={NET_ID.INFO} element={<NetInfo />} />
      <Route path={NET_ID.CREATE} element={<NetCreate />} />
      <Route path={NET_ID.LEAVE} element={<NetLeave />} />
      <Route path={NET_ID.CHAT} element={<NetChat />} />
      <Route path={NET_ID.BOARD} element={<NetBoard />} />
      {CircleRouter}
      {TreeRouter}
    </Route>
  </Route>
);
