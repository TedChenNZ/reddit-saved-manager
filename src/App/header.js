import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ title, children }) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
);

Header.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

Header.defaultProps = {
  title: 'Reddit Saved Manager',
  children: null,
};

export default Header;
