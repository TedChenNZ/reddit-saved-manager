import React from 'react';

import { Button } from 'react-toolbox';
import { authUrl } from '../reddit/api';

const Login = () => (
  <div>
    <a href={authUrl()}>
      <Button>Login</Button>
    </a>
  </div>
);

export default Login;
