import { app } from '@api/client.app';
import { AppState } from '@api/constants';
import { modalService } from '@services/modal.service';
import { useEffect, useState } from 'react';

export const useAppState = () => {
  const [state, setState] = useState<AppState>(AppState.INIT);
  useEffect(() => {
    const handler = (data: AppState) => {
      if (data === AppState.ERROR) {
        modalService.showMessage('Server connection is lost');
      }
      setState(data);
    };
    app.on('statechanged', handler);
    app.init();
    return app.remove('statechanged', handler);
  }, []);

  return state;
};
