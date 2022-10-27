import { app } from '@api/client.app/client.app';
import { AppState } from '@api/constants';
import { useAppState } from '@hooks/useAppState';
import { modalService } from '@services/modal.service';
import { useEffect } from 'react';

export const useApp = () => {
  const state = useAppState();

  useEffect(() => {
    app.init();
  }, []);

  useEffect(() => {
    if (state !== AppState.ERROR) return;
    modalService.showError('Server connection is lost');
  }, [state]);
};
