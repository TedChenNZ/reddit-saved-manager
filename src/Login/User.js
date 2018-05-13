import React from 'react';
import PropTypes from 'prop-types';

const User = ({ name }) => (
  <div>
    Welcome {name}
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
};

export default User;
