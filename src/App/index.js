import React from 'react';
import { Provider } from 'mobx-react';
import Header from './header';
import Login from '../Login';
import styles from './styles.scss';

import RootStore from '../stores';
import Posts from '../Posts';
import cache from '../reddit/cache';
import api from '../reddit/api';

const store = new RootStore(api, cache);

const App = () => (
  <Provider store={store}>
    <div className={styles.app}>
      <Header>
        <Login />
      </Header>
      <Posts name={store.authStore.name} />
    </div>
  </Provider>
);

export default App;
