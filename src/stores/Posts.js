import { curry } from 'ramda';
import { decorate, observable } from 'mobx';

export default class Posts {
  posts = [];

  fetchSavedPosts = () => {
    const fetch = curry(getRequest)(this.state.access_token);
    fetch(URLS.saved(this.state.name), { limit: 1 })
      .then(console.log);
  };
}

decorate(Posts, {
  posts: observable,
});
