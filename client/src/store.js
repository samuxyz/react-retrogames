import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import Immutable from 'immutable';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducer from './reducers';
import { routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import isAuthenticated from './utils/authentication';

const initialState = Immutable.fromJS({
  auth: isAuthenticated()
});

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const routeMiddleware = routerMiddleware(hashHistory);
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware, routeMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
}
export default configureStore;
