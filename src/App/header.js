import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title }) => (
  <div>
    <h1>{title}</h1>
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: 'Reddit Saved Manager',
};

export default Header;
