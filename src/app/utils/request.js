import 'whatwg-fetch';
import qs from 'qs';
import logger from './logger';

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

  logger.log('Making request', requestUrl, options, headers);
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
      logger.log('API request success', url, resp);
      return resp;
    })
    .catch(e => {
      logger.log('API request error', url, e);
      throw e;
    });
}
