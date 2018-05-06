import 'isomorphic-fetch';
import queryString from 'query-string';
import { USER_AGENT, CLIENT_ID } from './constants';

const REDIRECT_URI = 'http://127.0.0.1:8080/?authorize_callback';

export const authUrl = (state = 'abc') => `https://www.reddit.com/api/v1/authorize?${queryString.stringify({
  client_id: CLIENT_ID,
  response_type: 'code',
  state,
  duration: 'permanent',
  scope: 'save,history',
  redirect_uri: REDIRECT_URI,
}, { encode: false })}`;

export const basicAuth = `Basic ${btoa(`${CLIENT_ID}:`)}`;

export const getAccessToken = code =>
  fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': USER_AGENT,
    },
    body: queryString.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }, { encode: false }),
  })
    .then(resp => resp.json());

export const refreshAccessToken = refreshToken =>
  fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: basicAuth,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': USER_AGENT,
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }, { encode: false }),
  })
    .then(resp => resp.json());

