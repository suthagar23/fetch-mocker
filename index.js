import requestHandler from './src/requestHandler';
import { setFormattedHandlers, getFormattedHandlers } from './src/cache';

const actualFetch = fetch;

export default async (fetchMovkerConfig) => {
  const { config, handlers } = fetchMovkerConfig();

  const formattedHandlers = getFormattedHandlers()
    || setFormattedHandlers(formatHandlers(handlers));

  window.fetch = async (requestUrl, requestParameters) => {
    if (config && config.baseUrl && requestUrl.includes(config.baseUrl)) {
      const response = await requestHandler(requestUrl, requestParameters, formattedHandlers);
      if (response) {
        return response;
      }
    }

    const actualData = await actualFetch(requestUrl, requestParameters);
    return actualData;
  };
};

const formatHandlers = (handlers) => {
  const formattedHandlers = {
    GET: [],
    POST: [],
    DELTE: [],
    PUT: [],
    OTHERS: [],
  };

  if (!handlers || !Array.isArray(handlers)) {
    return formattedHandlers;
  }

  for (let index = 0; index < handlers.length; index += 1) {
    const handler = handlers[index];
    const requestMethod = handler && handler.method && handler.method.toUpperCase();

    if (formattedHandlers[requestMethod]) {
      formattedHandlers[requestMethod].push(handler);
    } else {
      formattedHandlers.OTHERS.push(handler);
    }
  }
  return formattedHandlers;
};
