/* eslint-disable camelcase */
// To keep vars consistent with api

import { observable, decorate, action } from 'mobx';
import { fetchAuthTokens } from '../reddit/auth';
import { saveAuth, saveUser, loadAuthAndUser } from '../reddit/session';
import { getRequest, URLS } from '../reddit/api';


// TODO: Uncouple session
export default class Auth {
  access_token;
  refresh_token;
  expires_at;
  name;

  constructor() {
    const data = loadAuthAndUser();
    this.setAuthTokens(data);
    this.setUserDetails(data);
  }

  fetchLogin = code => fetchAuthTokens(code)
    .then(saveAuth)
    .then(this.setAuthTokens)
    .then(data => Promise.all([getRequest(data.access_token, URLS.me())]))
    .then(data => data[0])
    .then(saveUser)
    .then(this.setUserDetails)

  setAuthTokens = (data) => {
    this.access_token = data.access_token;
    this.refresh_token = data.refresh_token;
    this.expires_at = data.expires_at;
    return data;
  }

  setUserDetails = (data) => {
    if (data.name) {
      this.name = data.name;
    }
    return data;
  }
}

decorate(Auth, {
  access_token: observable,
  refresh_token: observable,
  expires_at: observable,
  name: observable,
  fetchLogin: action,
  setAuthTokens: action,
  setUserDetails: action,
});
