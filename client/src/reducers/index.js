import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import games from './games';
import filestack from './filestack';

export default combineReducers({
  games,
  form,
  filestack
});
