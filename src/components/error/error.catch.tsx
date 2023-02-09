import React, { FC, useEffect } from 'react';
import { MessagesMap } from '@constants/messages';
import { HttpResponseErrorCode, HTTP_RESPONSE_ERROR_MAP } from '@client/connection/errors';
import { modalService } from '@services/modal.service';
import { useNavigateTo } from '@hooks/useNavigateTo';
import { useAppError } from '@hooks/useAppError';
import { NotFound } from '@views/not.found/not.found';

const STATUS_TO_MESSAGES_MAP: Record<HttpResponseErrorCode, string> = {
  400: MessagesMap.BAD_REQUEST,
  401: MessagesMap.UNAUTHORIZED,
  403: MessagesMap.FORBIDDEN,
  404: 'Not found',
  409: 'Conflict',
  500: MessagesMap.SERVER_ERROR,
  503: MessagesMap.SERVER_ERROR,
};

const showError = (statusCode?: HttpResponseErrorCode) =>
  modalService.showError(STATUS_TO_MESSAGES_MAP[statusCode || 500]);

export const ErrorCatch: FC = () => {
  const { statusCode } = useAppError() || {};
  const navigate = useNavigateTo();

  useEffect(() => {
    if (!statusCode) return;
    if (HTTP_RESPONSE_ERROR_MAP[statusCode] === 'Not found') return;
    if (HTTP_RESPONSE_ERROR_MAP[statusCode] === 'Unauthorized') return navigate.toIndex();
    showError(statusCode);
  }, [statusCode, navigate]);

  if (statusCode === 404) return <NotFound />;

  return null;
};
