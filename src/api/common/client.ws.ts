import { TFetch } from './api/types';

export const getConnection = (baseUrl: string): Promise<TFetch> => {
  const socket = new WebSocket(baseUrl);

  const fetch = async (url: string, data?: Record<string, any>): Promise<any> => {
    // const options: RequestInit = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data || {}),
    //   credentials: 'include',
    // };
    const request = {
      data: JSON.stringify({ ...data }),
      url,
    };
    console.log('SEND', data);
    socket.send(JSON.stringify(request));

    return new Promise((resolve) => {
      const handler = (event: MessageEvent) => {
        const response = JSON.parse(event.data);
        console.log('receive', response);
        socket.removeEventListener('message', handler);
        resolve(response);
      };
      socket.addEventListener('message', handler);
    });
  };

  return new Promise((resolve) => {
    socket.addEventListener('open', () => resolve(fetch));
  });
};
