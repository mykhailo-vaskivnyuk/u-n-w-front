import { FC, useCallback, useEffect } from 'react';
import { HttpResponseErrorCode } from '@api/errors';
import { modalService } from '@services/modal.service';
import { MessagesMap } from '@constants/messages';
import { useAppError } from '../../hooks/useAppError';

const STATUS_TO_MESSAGES_MAP: Record<HttpResponseErrorCode, string> = {
  400: MessagesMap.BAD_REQUEST,
  401: MessagesMap.UNAUTHORIZED,
  403: MessagesMap.FORBIDDEN,
  404: 'Not found',
  409: 'Conflict',
  500: MessagesMap.SERVER_ERROR,
  503: MessagesMap.SERVER_ERROR,
};

export const ErrorCatch: FC = () => {
  const error = useAppError();

  const showError = useCallback(
    (statusCode?: HttpResponseErrorCode) =>
      modalService.showError(STATUS_TO_MESSAGES_MAP[statusCode || 500]),
    [],
  );

  useEffect(() => {
    if (!error) return;
    const { statusCode } = error || {};
    showError(statusCode);
  }, [showError, error]);

  return null;
};
