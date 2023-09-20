import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessagesMap } from '@constants/messages';
import {
  HttpResponseErrorCode,
  httpResponseErrorEnum,
  isHttpResponseError,
} from '@client/connection/errors';
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

const showError = (statusCode: HttpResponseErrorCode) =>
  modalService.showError(STATUS_TO_MESSAGES_MAP[statusCode]);

export const ErrorCatch: FC = () => {
  const error = useAppError();
  const navigate = useNavigateTo();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!error) return;
    let statusCode: HttpResponseErrorCode;
    if (isHttpResponseError(error)) statusCode = error.statusCode;
    else statusCode = httpResponseErrorEnum.InternalServerError;
    if (statusCode === httpResponseErrorEnum.NotFound) return;
    if (statusCode === httpResponseErrorEnum.Unauthorized) {
      localStorage.setItem('pathname', pathname);
      navigate.toIndex();
    }
    showError(statusCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  if (!error) return null;
  if (!isHttpResponseError(error)) return null;
  if (error.statusCode !== httpResponseErrorEnum.NotFound) return null;

  return <NotFound />;
};
