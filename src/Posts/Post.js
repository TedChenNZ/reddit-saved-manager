import React from 'react';

const KIND = {
  COMMENT: 't1',
  LINK: 't3',
};

const Post = ({ post }) => {
  if (post.kind === KIND.COMMENT) {
    return (
      <div>
        {post.data.body}
      </div>
    );
  }
  if (post.kind === KIND.LINK) {
    return (
      <div>
        {post.data.title}
      </div>
    );
  }
  return 'Err';
};

export default Post;
