const REST_RESPONSE_CODES_AND_KEY_MAPPING = {
  200: 'ok',
  401: 'unauthorized',
  404: 'notFound',
  500: 'serviceNotAvailable',
};

const REST_REQUEST_RESPONSE_CODES = {
  ok: {
    statusString: '200',
    status: 200,
    statusText: 'Ok',
    ok: true,
    type: 'cors',
    redirected: false,
    bodyUsed: false,
  },
  unauthorized: {
    statusString: '401',
    status: 401,
    statusText: 'Unauthorized',
    ok: false,
  },
  notFound: {
    statusString: '404',
    status: 404,
    statusText: 'Not Found',
    ok: false,
  },
  serviceNotAvailable: {
    statusString: '500',
    status: 500,
    statusText: 'Service Not Available',
    ok: false,
  },
};

module.exports = {
  REST_RESPONSE_CODES_AND_KEY_MAPPING,
  REST_REQUEST_RESPONSE_CODES,
};
