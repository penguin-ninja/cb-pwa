import 'whatwg-fetch';
import qs from 'qs';

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  return response.json();
}

function checkResponseStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(
  url,
  params = null,
  method = 'GET',
  headers = {}
) {
  const options = { method };
  let requestUrl = url;

  if (params) {
    if (method === 'GET') {
      const queryString = qs.stringify(params, {
        encodeValuesOnly: true,
        skipNulls: true
      });
      requestUrl = `${url}?${queryString}`;
    } else {
      options.body = JSON.stringify(params);
    }
  }

  CONCRETE_LOGGER.debug('Making request', url, options, headers);
  return fetch(requestUrl, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
    .then(checkResponseStatus)
    .then(parseJSON)
    .then(resp => {
      CONCRETE_LOGGER.debug('API request success', url, resp);
      return resp;
    })
    .catch(e => {
      CONCRETE_LOGGER.debug('API request error', url, e);
      throw e;
    });
}
