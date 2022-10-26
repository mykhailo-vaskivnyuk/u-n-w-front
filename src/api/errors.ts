import { getEnumFromMap } from './utils';

export const HttpResponseErrorMap = {
  400: 'Bad request',
  404: 'Not found',
  409: 'Conflict',
  500: 'Internal server error',
  503: 'Service unavailable',
};
export type ErrorCodeType = keyof typeof HttpResponseErrorMap;
export const HttpResponseErrorEnum = getEnumFromMap(HttpResponseErrorMap);

export class HttpResponseError extends Error {
  constructor(code: ErrorCodeType) {
    super(HttpResponseErrorMap[code || 500]);
    this.name = this.constructor.name;
  }
}
