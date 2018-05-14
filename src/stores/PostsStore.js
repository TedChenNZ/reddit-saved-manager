import { decorate, observable, action } from 'mobx';

export default class Posts {
  rootStore;
  api;
  cache;
  get;
  posts = [];

  constructor(rootStore, props) {
    this.rootStore = rootStore;
    Object.assign(this, props());
  }

  fetchSavedPosts = name =>
    this.get()(this.api.URLS.saved(name), { limit: 10 })
      .then(this.setPosts);

  setPosts = (posts) => {
    this.posts = posts;
    return posts;
  }
}

decorate(Posts, {
  posts: observable,
  fetchSavedPosts: action,
});
