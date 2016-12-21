import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { AddGameContainer, GamesContainer } from './containers';
import { Home, Archive, Welcome, About, Contact } from './components';

const store = configureStore();

const routes = (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
      <Route path="/games" component={Archive}>
        <IndexRoute component={GamesContainer} />
        <Route path="add" component={AddGameContainer} />
      </Route>
    </Router>
  </Provider>
);

export default routes;
