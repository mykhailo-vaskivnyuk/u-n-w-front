/* eslint-disable import/no-cycle */
import {
  IChatResponseMessage, IInstantChange, IUserChanges, OmitNull,
} from '../../server/types/types';
import { IClientAppThis } from '../types';
import { AppStatus } from '../constants';


type IApp = Pick<IClientAppThis,
  | 'api'
  | 'getState'
  | 'setStatus'
  | 'setError'
  | 'setUser'
  | 'net'
  | 'emit'
>;

export class Changes {
  private lastDate?: string;
  private netChanges: IUserChanges = [];

  constructor(private app: IApp) {}

  private setChanges(changes: IUserChanges) {
    this.netChanges = changes;
    this.app.emit('changes', changes);
  }

  getChanges() {
    return this.netChanges;
  }

  setLastDate(changes: IUserChanges) {
    this.lastDate = changes.at(-1)?.date;
  }

  isInstantChange(
    messageData: OmitNull<IChatResponseMessage> | IInstantChange,
  ): messageData is IInstantChange {
    return 'message_id' in messageData;
  }

  async read(inChain = false) {
    !inChain && this.app.setStatus(AppStatus.LOADING);
    try {
      const newChanges = await this.app.api
        .user.changes.read({ date: this.lastDate });
      this.setLastDate(newChanges);
      !inChain && await this.update(newChanges);
      if (newChanges.length) {
        const { changes: curChanges } = this.app.getState();
        this.setChanges([...curChanges, ...newChanges]);
      }
      !inChain && this.app.setStatus(AppStatus.READY);
    } catch (e: any) {
      if (inChain) throw e;
      this.app.setError(e);
    }
  }

  async update(changes: IUserChanges | IInstantChange[]) {
    const { user, net } = this.app.getState();
    const { node_id: nodeId, net_id: netId } = net || {};
    let updateAll = false;
    let updateNet = false;
    for (const change of changes) {
      const { user_node_id: userNodeId, net_view: netView } = change;
      if (netView === 'net') {
        updateAll = true;
        if (userNodeId !== undefined && netId) updateNet = true;
        break;
      }
      if (userNodeId === nodeId) updateNet = true;
    }
    if (updateAll) await this.app.setUser({ ...user! }, false)
      .catch(console.log);
    if (updateNet) await this.app.net.enter(netId!, true)
      .catch(console.log);
  }

  async confirm(messageId: number) {
    this.app.setStatus(AppStatus.LOADING);
    try {
      await this.app.api.user.changes
        .confirm({ message_id: messageId });
      this.app.setStatus(AppStatus.READY);
    } catch (e: any) {
      this.app.setError(e);
    }
  }

  remove(messageId: number) {
    const changes = this.netChanges
      .filter(({ message_id: v }) => messageId !== v);
    this.setChanges(changes);
  }
}
