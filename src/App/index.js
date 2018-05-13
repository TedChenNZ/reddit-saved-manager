import React from 'react';
import { Provider } from 'mobx-react';
import Header from './header';
import Login from '../Login';
import styles from './styles.scss';

import { UI, Auth, Posts } from '../stores';

const uiStore = new UI();
const authStore = new Auth();
const postsStore = new Posts();

const App = () => (
  <Provider uiStore={uiStore} authStore={authStore} posts={postsStore}>
    <div className={styles.app}>
      <Header>
        <Login />
      </Header>
    </div>
  </Provider>
);

export default App;
