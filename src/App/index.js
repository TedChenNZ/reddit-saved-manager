import React, { PureComponent } from 'react';
import queryString from 'query-string';
import { curry } from 'ramda';
import Header from './header';
import Login from '../Login';
import styles from './styles.scss';

import { getAccessToken, refreshAccessToken } from '../reddit/auth';
import { getRequest, URLS } from '../reddit/api';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
    };
  }
  componentWillMount() {
    const resp = queryString.parse(window.location.search);
    if (resp && resp.code) {
      getAccessToken(resp.code)
        .then((r) => {
          this.setState(r);
          return r;
        })
        .then((r) => {
          refreshAccessToken(r.refresh_token).then(console.log);
        })
        .then((r) => {
          const fetch = curry(getRequest)(this.state.access_token);
          fetch(URLS.saved(''), { limit: 1 }).then(console.log);
        });
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <Header />
        {!this.state.accessToken && <Login />}
      </div>
    );
  }
}
