/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import * as T from '../../server/types/types';
import { IClientAppThis, INetThis } from '../types';
import { AppStatus } from '../constants';

type IApp = Pick<IClientAppThis,
  | 'api'
  | 'getState'
  | 'setStatus'
  | 'setError'
>;

type INet = Pick<INetThis, 'netChanged'>;

export class MemberActions{

  constructor(private app: IApp, private member: INet) {}

  getName(
    netView: T.NetViewEnum,
    member: T.IMemberResponse,
    memberPosition: number,
  ) {
    const position = netView === 'tree' ?
      memberPosition + 1 :
      memberPosition && memberPosition + 1;
    const { name, member_name: memberName } = member;
    return name || memberName || `member ${position}`;
  }

  async setDislike(nodeId: number) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const { net } = this.app.getState();
      const success = await this.app.api.member.data.dislike
        .set({ ...net!, member_node_id: nodeId });
      if (success) await this.member.netChanged(nodeId);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  async unsetDislike(nodeId: number) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const { net } = this.app.getState();
      const success = await this.app.api.member.data.dislike
        .unSet({ ...net!, member_node_id: nodeId });
      if (success) await this.member.netChanged(nodeId);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  async setVote(nodeId: number) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const { net } = this.app.getState();
      const success = await this.app.api.member.data.vote
        .set({ ...net!, member_node_id: nodeId });
      // const { net: newNet } = this.app.getState();
      // if (success && net === newNet)
      //   await this.app.net.enter(net!.net_id, true)
      //     .catch((e) => console.log(e));
      await this.member.netChanged(nodeId);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  async unsetVote(nodeId: number) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const { net } = this.app.getState();
      const success = await this.app.api.member.data.vote
        .unSet({ ...net!, member_node_id: nodeId });
      if (success) await this.member.netChanged(nodeId);
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
    }
  }
}
