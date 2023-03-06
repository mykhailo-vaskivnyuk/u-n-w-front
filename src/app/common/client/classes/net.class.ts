/* eslint-disable max-lines */
/* eslint-disable import/no-cycle */
import * as T from '../../server/types/types';
import { IClientAppThis, IMember } from '../types';
import { AppStatus } from '../constants';
import { HttpResponseError } from '../connection/errors';
import { getMemberStatus } from '../../server/utils';
import { Member } from './member.class';
import { MemberActions } from './memberActions.class';
import { NetBoard } from './net.board.class';

type IApp = Pick<IClientAppThis,
  | 'api'
  | 'getState'
  | 'setStatus'
  | 'setError'
  | 'account'
  | 'userNets'
  | 'setNet'
  | 'chat'
  | 'emit'
>;

export class Net{
  private userNet: T.INetResponse = null;
  private userNetData: T.IUserNetDataResponse | null = null;
  private circle: IMember[] = [];
  private tree: IMember[] = [];
  private netView?: T.NetViewEnum;
  public member: Member | null = null;
  public memberActions: MemberActions;
  public board: NetBoard;

  constructor(private app: IApp) {
    this.memberActions = new MemberActions(app, this as any);
    this.board = new NetBoard(app);
  }

  async netChanged(nodeId: number) {
    if (this.userNet?.node_id === nodeId) {
      await this.getUserData();
      await this.getCircle();
      return;
    }
    const { netView } = this.app.getState();
    if (netView === 'tree') await this.getTree();
    else await this.getCircle();
  }

  async memberChanged(nodeId: number) {
    const { netView } = this.app.getState();
    if (netView === 'tree') await this.getTree();
    else await this.getCircle();
    this.findMember(nodeId);
  }

  getNetState() {
    return {
      userNetData: this.userNetData,
      net: this.userNet,
      circle: this.circle,
      tree: this.tree,
      netView: this.netView,
      boardMessages: this.board.getState(),
      memberData: this.member?.getMember(),
    };
  }

  findMember(nodeId: number) {
    const { netView } = this.app.getState();
    const { [netView!]: netViewData } = this.app.getState();
    const memberPosition = netViewData
      .findIndex((item) => item.node_id === nodeId);
    const member = netViewData[memberPosition];
    this.member = new Member(member, this.app, this as any);
    if (!member) this.app.setError(new HttpResponseError(404));
  }

  private async setNet(userNet: T.INetResponse = null) {
    if (this.userNet === userNet) return;
    this.userNet = userNet;
    if (userNet) {
      await this.getUserData();
      const userStatus = this.userNetData!.confirmed ?
        'INSIDE_NET' :
        'INVITING';
      userStatus === 'INSIDE_NET' && await this.board.read();
      await this.getCircle();
      await this.getTree();
      this.app.account.setUserStatus(userStatus);
    } else {
      this.setUserNetData();
      this.board = new NetBoard(this as any);
      this.setCircle();
      this.setTree();
      this.setView();
      this.member = null;
      this.app.account.setUserStatus('LOGGEDIN');
    }
    // this.app.userNets.getNets();
    await this.app.setNet();
    this.app.emit('net', userNet);
  }

  private setUserNetData(
    userNetData: T.IUserNetDataResponse | null = null,
  ) {
    if (this.userNetData === userNetData) return;
    this.userNetData = userNetData;
  }

  setView(netView?: T.NetViewEnum) {
    this.netView = netView;
  }

  private setCircle(circle: IMember[] = []) {
    if (this.circle === circle) return;
    this.circle = circle;
    this.app.emit('circle', circle);
  }

  private setTree(tree: IMember[] = []) {
    if (this.tree === tree) return;
    this.tree = tree;
    this.app.emit('tree', tree);
  }

  async create(args: Omit<T.INetCreateParams, 'node_id'>) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const parentNet = this.userNet;
      const net = await this.app.api.net.create({
        node_id: null,
        ...parentNet,
        ...args,
      });
      if (net) await this.app.setNet('create');
      this.app.setStatus(AppStatus.READY);
      return net;
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  async enter(net_id: number, inChain = false) {
    !inChain && this.app.setStatus(AppStatus.LOADING);
    try {
      const net = await this.app.api.net.enter({ net_id });
      await this.setNet(net);
      !inChain && this.app.setStatus(AppStatus.READY);
      return net;
    } catch (e: any) {
      if (inChain) throw e;
      await this.setNet();
      this.app.setError(e);
      return null;
    }
  }

  async getUserData() {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const net_id = this.userNet!.net_id;
      const userNetData = await this.app.api.user.net.getData({ net_id });
      await this.setUserNetData(userNetData);
      this.app.setStatus(AppStatus.READY);
      return userNetData;
    } catch (e: any) {
      await this.setUserNetData();
      this.app.setError(e);
    }
  }

  async comeout() {
    this.app.setStatus(AppStatus.LOADING);
    try {
      await this.setNet();
      this.app.setStatus(AppStatus.READY);
      return true;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }

  async leave() {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const net = this.userNet;
      const success = await this.app.api.net.leave(net!);
      if (success) {
        await this.app.setNet('leave');
        await this.setNet();
      }
      this.app.setStatus(AppStatus.READY);
      return success;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }

  async getCircle() {
      const net = this.userNet;
      const result = await this.app.api.net.getCircle(net!);
      const circle: IMember[] = result.map((member, memberPosition) => {
        const memberStatus = getMemberStatus(member);
        const memberName = this.memberActions
          .getName('circle', member, memberPosition);
        return { ...member, member_name: memberName, memberStatus };
      });
      this.setCircle(circle);
  }

  async getTree() {
      const net = this.userNet;
      const result = await this.app.api.net.getTree(net!);
      const tree: IMember[] = result.map((member, memberPosition) => {
        const memberStatus = getMemberStatus(member);
        const memberName = this.memberActions
          .getName('tree', member, memberPosition);
        return { ...member, member_name: memberName, memberStatus };
      });
      this.setTree(tree);
  }

  async connectByInvite(args: T.ITokenParams) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      const result = await this.app.api.net.connectByToken(args);
      const { error } = result || {};
      if (!error) await this.app.setNet();
      this.app.setStatus(AppStatus.READY);
      return result;
    } catch (e: any) {
      this.app.setError(e);
      throw e;
    }
  }
}
