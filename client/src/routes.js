import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { AddGameContainer, GamesContainer } from './containers';
import { Home, Archive, Welcome, About, Contact } from './components';

const routes = (
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
);

export default routes;
