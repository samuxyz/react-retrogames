import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE
} from '../constants/auth';

const initialState = Immutable.Map({
  isAuthenticated: false,
  token: null,
  name: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_USER_SUCCESS:
    case LOGIN_USER_SUCCESS: {
      return state.merge({
        isAuthenticated: true,
        token: action.token,
        name: jwtDecode(action.token).sub
      });
    }
    case SIGNUP_USER_FAILURE:
    case LOGIN_USER_FAILURE:
    case LOGOUT_USER: return state.merge(initialState);
    default: return state;
  }
}
