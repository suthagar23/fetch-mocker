
import { parseUrl } from './utils';
import generateResponse from './generateResponse';

const requestParser = (requestUrl, requestParameters) => {
  const { method, body } = requestParameters || {};

  const parsedUrl = parseUrl(requestUrl);
  let bodyParams = {};
  if (requestParameters) bodyParams = JSON.parse(body || '{}');
  return {
    method: method || 'GET',
    parsedUrl,
    body: bodyParams,
  };
};

export default (requestUrl, requestParameters, handlers) => {
  const {
    method,
    parsedUrl,
    body,
  } = requestParser(requestUrl, requestParameters);
  if (!method) {
    return null;
  }

  const handlersForRequestMethod = handlers[method.toUpperCase()] || handlers.OTHERS;
  for (let index = 0; index < handlersForRequestMethod.length; index += 1) {
    const handler = handlersForRequestMethod[index];
    if (parsedUrl.fullPathName === handler.path) {
      return generateResponse({
        responses: handler.responses,
        requestMethod: method,
        requestPath: parsedUrl.fullPathName,
        bodyParams: body,
      });
    }
  }
  return null;
};
