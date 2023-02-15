/* eslint-disable import/no-cycle */
import * as T from '../../server/types/types';
import { INITIAL_NETS, IClientAppThis, INets } from '../types';

type IApp = Pick<IClientAppThis,
  | 'api'
  | 'getState'
  | 'chat'
  | 'emit'
>;

export class UserNets {
  private allNets: T.INetsResponse = [];
  private nets: INets = INITIAL_NETS;

  constructor(private app: IApp) {}

  getUserNetsState() {
    return {
      allNets: this.allNets,
      nets: this.nets,
    };
  }

  private setAllNets(nets: T.INetsResponse) {
    if (this.allNets === nets) return;
    this.allNets = nets;
  }

  private setNets(nets: INets) {
    if (this.nets === nets) return;
    this.nets = nets;
    this.app.emit('nets', this.nets);
  }

  async getAllNets() {
    const nets = await this.app.api.user.nets.get();
    await this.app.chat.connectAll();
    this.setAllNets(nets);
  }

  getNets() {
    const { net } = this.app.getState();
    const {
      net_id: netId = null,
      parent_net_id: parentNetId = null,
    } = net || {};
    const nets = { ...INITIAL_NETS };
    nets.siblingNets = this.allNets
      .filter(({ parent_net_id }) => parent_net_id === parentNetId,
      );
    if (!net) return this.setNets(nets);
    nets.childNets = this.allNets
      .filter((item) => item.parent_net_id === netId);
    let curParentNetId = parentNetId;
    nets.parentNets = this.allNets
      .reduceRight((acc, item) => {
        if (!curParentNetId) return acc;
        const { net_id: curNetId, parent_net_id: nextParentNetId } = item;
        if (curNetId !== curParentNetId) return acc;
        acc.push(item);
        curParentNetId = nextParentNetId;
        return acc;
      }, [...nets.parentNets])
      .reverse();
    this.setNets(nets);
  }
}