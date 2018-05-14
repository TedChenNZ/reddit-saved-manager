import { curry } from 'ramda';

import AuthStore from './AuthStore';
import PostsStore from './PostsStore';
import UIStore from './UIStore';

export default class RootStore {
  api;
  cache;
  authStore;
  uiStore;
  postsStore;

  constructor(api, cache) {
    this.api = api;
    this.cache = cache;
    this.authStore = new AuthStore(this, this.props);
    this.postsStore = new PostsStore(this, this.props);
    this.uiStore = new UIStore(this, this.props);
  }

  get = () => curry(this.api.get)(this.authStore.access_token);

  props = () => ({
    get: this.get,
    api: this.api,
    cache: this.cache,
  });
}
