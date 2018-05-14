import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import Post from './Post';

export class Saved extends Component {
  static propTypes = {
    name: PropTypes.string,
    postsStore: PropTypes.shape({
      posts: PropTypes.array,
      fetchSavedPosts: PropTypes.func,
    }).isRequired,
  }

  static defaultProps = {
    name: null,
  }

  componentWillMount() {

  }

  render() {
    const { postsStore, name } = this.props;
    if (postsStore && name) {
      if (postsStore.posts.length) {
        const posts = postsStore.posts[0].data.children;
        console.log(toJS(posts));
        return (
          <div>
            {posts.map(post => <Post key={post.data.id} post={post} />)}
          </div>
        );
      }
      postsStore.fetchSavedPosts(name);
    }
    return (
      <div>
        Loading...
      </div>
    );
  }
}

export default inject(stores => ({ postsStore: stores.store.postsStore }))(observer(Saved));
