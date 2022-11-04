import { FC, useCallback, useEffect } from 'react';
import { useAppState } from '@hooks/useAppState';
import { AppState } from '@api/constants';
import { modalService } from '@services/modal.service';
import { MessagesMap } from '@constants/messages';
import { app } from '@api/app/client.app';
import { HttpResponseErrorCode } from '@api/errors';

const STATUS_TO_MESSAGES_MAP: Record<HttpResponseErrorCode, string> = {
  400: MessagesMap.BAD_REQUEST,
  404: 'Not found',
  409: 'Conflict',
  500: MessagesMap.SERVER_ERROR,
  503: MessagesMap.SERVER_ERROR,
};

export const ErrorCatch: FC = () => {
  const state = useAppState();

  const showError = useCallback(
    (statusCode: HttpResponseErrorCode) =>
      modalService.showError(STATUS_TO_MESSAGES_MAP[statusCode]),
    [],
  );

  useEffect(() => {
    if (state !== AppState.ERROR) return;
    const { error } = app.getState();
    const { statusCode } = error;
    showError(statusCode);
  }, [showError, state]);

  return null;
};
