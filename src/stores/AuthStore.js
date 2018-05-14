import { observable, decorate, action } from 'mobx';

export default class Auth {
  rootStore;
  api;
  cache;
  get;
  access_token;
  refresh_token;
  expires_at;
  name;

  constructor(rootStore, props) {
    this.rootStore = rootStore;
    Object.assign(this, props());
    const data = this.cache.loadAuthAndUser();
    this.setAuthTokens(data);
    this.setUserDetails(data);
  }

  fetchAuth = code => this.api.fetchAuthTokens(code)
    .then(this.cache.saveAuth)
    .then(this.setAuthTokens);

  fetchUser = () => this.get()(this.api.URLS.me())
    .then(x => x[0])
    .then(this.cache.saveUser)
    .then(this.setUserDetails);

  fetchLogin = code => this.fetchAuth(code)
    .then(this.fetchUser);

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
  setAuthTokens: action,
  setUserDetails: action,
});
