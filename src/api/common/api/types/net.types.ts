import {
  ITableNets, ITableNetsData,
  ITableNodesInvites, ITableUsers,
} from '../../../local/imports';
import { OmitNull } from '../../types';

export type INetCreateParams  = Pick<ITableNetsData, 'name'>;
export type INetResponse = (ITableNets & INetCreateParams) | null;
export type INetsResponse = OmitNull<INetResponse>[];
export type INetReadParams = { net_id: number };
export type IMemberResponse =
  Pick<ITableUsers, 'name'> &
  Omit<ITableNodesInvites, 'token'> & {
    token: string | null;
  };
export type INetCircleResponse = IMemberResponse[];
