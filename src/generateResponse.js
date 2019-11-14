import React from 'react';
import ReactDOM from 'react-dom';
import ResponseCustomizer from './responseCustomizer';
import { REST_REQUEST_RESPONSE_CODES, REST_RESPONSE_CODES_AND_KEY_MAPPING } from './mappings';

const renderElemnet = document.createElement('div');
renderElemnet.id = 'fetchMocker';
document.body.appendChild(renderElemnet);

ReactDOM.render(<ResponseCustomizer />, document.getElementById('fetchMocker'));

const dispatchModalVisibility = ({
  visibility, requestMethod, requestPath, responseCodes,
}) => {
  document.dispatchEvent(new CustomEvent('FETCH_MOCKER_MODAL_VISIBLE', {
    detail: {
      visibility, requestPath, requestMethod, responseCodes,
    },
  }));
};

const reciveResponse = async () => new Promise(((resolve) => {
  document.addEventListener('FETCH_MOCKER_RESPONSE', ({ detail }) => {
    resolve(detail.responseCode);
  }, { once: true }); // remove event after run once
}));

export default async ({
  responses,
  requestMethod,
  requestPath,
  bodyParams,
}) => {
  const responseCodes = Object.keys(responses);
  dispatchModalVisibility({
    visibility: true, requestMethod, requestPath, responseCodes,
  });
  let responseData = REST_REQUEST_RESPONSE_CODES.ok;
  let responseAttributes = REST_REQUEST_RESPONSE_CODES.ok;
  if (responses) {
    const responseStatus = await reciveResponse();
    const responseStatusKey = REST_RESPONSE_CODES_AND_KEY_MAPPING[responseStatus];
    responseAttributes = REST_REQUEST_RESPONSE_CODES[responseStatusKey];
    const { status } = responseAttributes;
    const responseDataConfig = responses[status] || responses.default || {};
    const { data, method } = responseDataConfig;
    if (data) {
      responseData = data;
    } else if (method) {
      responseData = await method(bodyParams);
    }
  }

  return {
    ...responseAttributes,
    json: () => responseData,
  };
};
