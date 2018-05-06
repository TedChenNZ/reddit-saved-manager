import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-toolbox';
import { authUrl } from '../reddit/auth';

const Login = props => (
  <div>
    <a href={authUrl()}>
      <Button>Login</Button>
    </a>
  </div>
);

Login.propTypes = {};

export default Login;
