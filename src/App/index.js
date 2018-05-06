import React, { PureComponent } from 'react';
import queryString from 'query-string';
import { curry } from 'ramda';
import Header from './header';
import Login from '../Login';
import styles from './styles.scss';

import { getAccessToken } from '../reddit/auth';
import { getRequest, URLS } from '../reddit/api';
import { saveAuth, saveUser, loadAuthAndUser } from '../reddit/session';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
    };
  }
  componentWillMount() {
    const authResponse = queryString.parse(window.location.search);

    const getSaved = () => {
      const fetch = curry(getRequest)(this.state.access_token);
      fetch(URLS.saved(this.state.name), { limit: 1 })
        .then(console.log);
    };

    if (authResponse && authResponse.code) {
      getAccessToken(authResponse.code)
        .then(saveAuth)
        .then((data) => {
          this.setState(data);
          return data;
        })
        .then(data => Promise.all([getRequest(data.access_token, URLS.me())]))
        .then(data => data[0])
        .then(saveUser)
        .then((data) => {
          this.setState(data);
          return data;
        })
        .then(getSaved);
    } else {
      this.setState(loadAuthAndUser(), getSaved);
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        {!this.state.access_token && <Login />}
      </div>
    );
  }
}
