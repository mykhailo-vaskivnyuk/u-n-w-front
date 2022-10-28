import { FC, useEffect } from 'react';
import { useAppState } from '@hooks/useAppState';
import { AppState } from '@api/constants';
import { modalService } from '@services/modal.service';

export const ErrorCatch: FC = () => {
  const state = useAppState();

  useEffect(() => {
    if (state !== AppState.ERROR) return;
    modalService.showError('Server connection is lost');
  }, [state]);

  return null;
};
