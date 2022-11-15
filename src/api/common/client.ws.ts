import { logData } from './utils';
import { TPromiseExecutor } from '../local/imports';
import { IWsResponse, TFetch } from './types';
import { HttpResponseError } from './errors';

export const getConnection = async (baseUrl: string): Promise<TFetch> => {
  const requests = new Map<any, number>();
  let id = 0;
  const getId = () => {
    id = (id + 1) % 100;
    return id;
  };

  let socket = new WebSocket(baseUrl);

  const checkConnection = async () => {
    const { readyState, OPEN, CLOSED } = socket;
    if (readyState === OPEN) return;
    if (readyState === CLOSED) socket = new WebSocket(baseUrl);
    const executor: TPromiseExecutor<void> = (rv, rj) => {
      const timer = setTimeout(() => {
        rj(new HttpResponseError(503));
      }, 5000);
      const listeners = {} as any;
      const removeListeners = () => {
        socket.removeEventListener('open', listeners.handleOpen);
        socket.removeEventListener('error', listeners.handleError);
      };
      listeners.handleOpen = () => {
        clearTimeout(timer);
        removeListeners();
        rv();
      };
      listeners.handleError = () => {
        removeListeners();
        rj(new HttpResponseError(503));
      };
      socket.addEventListener('error', listeners.handleError);
      socket.addEventListener('open', listeners.handleOpen);
    };
    return new Promise<void>(executor);
  };

  await checkConnection();

  const getHandler = (...[rv, rj]: Parameters<TPromiseExecutor<any>>) =>
    function handler({ data: message }: MessageEvent) {
      const response = JSON.parse(message) as IWsResponse;
      logData(response, 'response');
      const { requestId: reqId, status, data: resData } = response;
      if (reqId && reqId !== requests.get(handler)) return;
      socket.removeEventListener('message', handler);
      requests.delete(handler);
      if (status !== 200) rj(new HttpResponseError(status));
      rv(resData);
    };

  const fetch = async (
    pathname: string, data: Record<string, any> = {},
  ): Promise<any> => {
    await checkConnection();
    const requestId = getId();
    const request = { requestId, pathname, data };
    logData(request, 'request');
    const requestMessage = JSON.stringify(request);
    const executor: TPromiseExecutor<void> = (resolve, reject) => {
      const handler = getHandler(resolve, reject);
      requests.set(handler, id);
      socket.addEventListener('message', handler);
      socket.send(requestMessage);
    };
    return new Promise(executor);
  };

  return fetch;
};
