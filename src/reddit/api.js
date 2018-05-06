import 'isomorphic-fetch';
import queryString from 'query-string';
import { USER_AGENT, URI } from './constants';

export const getRequest = (token, url, options = {}) =>
  fetch(`${url}?${queryString.stringify(options)}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${token}`,
      'User-Agent': USER_AGENT,
    },
  })
    .then(resp => resp.json());


export const URLS = {
  saved: username => `${URI}/user/${username}/saved`,
  me: () => `${URI}/api/v1/me`,
};

