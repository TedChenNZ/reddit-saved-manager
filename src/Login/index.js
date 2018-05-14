import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import queryString from 'query-string';
import Login from './Login';
import User from './User';

export class LoginWrapper extends Component {
  static propTypes = {
    authStore: PropTypes.shape({
      name: PropTypes.string,
      fetchLogin: PropTypes.func,
    }).isRequired,
  }

  componentWillMount() {
    if (!this.props.authStore.name) {
      const authResponse = queryString.parse(window.location.search);
      if (authResponse && authResponse.code) {
        this.props.authStore.fetchLogin(authResponse.code);
      }
    }
  }

  render() {
    const { name } = this.props.authStore;
    if (!name) {
      return (
        <Login />
      );
    }
    return (
      <User name={name} />
    );
  }
}

export default inject(stores => ({ authStore: stores.store.authStore }))(observer(LoginWrapper));
