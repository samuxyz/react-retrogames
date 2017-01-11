import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { LOGIN_USER, SIGNUP_USER } from '../constants/auth';
import {
  loginUserSuccess,
  loginUserFailure,
  signupUserSuccess,
  signupUserFailure
} from '../actions/auth';
import { push } from 'react-router-redux';
import {actions as toastrActions} from 'react-redux-toastr';

const getForm = (state, form) => {
  return state.getIn(['form', form]).toJS();
}

const sendCredentials = (route, credentials) => {
  return fetch(`http://localhost:8080/auth/${route}`, {
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(credentials)
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
};

function* loginUser (action) {
  const { redirection } = action;
  try {
    const credentials = yield select(getForm, 'login');
    const result = yield call(sendCredentials, 'login', credentials.values);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retrogames Archive',
       message: result.message
    }));
    localStorage.setItem('token', result.token);
    yield put(loginUserSuccess(result.token));
    yield put(push(redirection));
  } catch (e) {
    let message = '';
    if(e.status === 401) {
      message = 'Invalid email/password';
    } else {
      message = 'Sorry, an error occured!';
    }
    yield put(loginUserFailure());
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retrogames Archive',
       message: message
     }));
  }
}

function* signupUser () {
  try {
    const credentials = yield select(getForm, 'signup');
    const result = yield call(sendCredentials, 'signup', credentials.values);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retrogames Archive',
       message: result.message
    }));
    localStorage.setItem('token', result.token);
    yield put(signupUserSuccess(result.token));
    yield put(push('/games'));
  } catch (e) {
    let message = '';
    if(e.status === 409) {
      message = 'Email is already taken';
    } else {
      message = 'Sorry, an error occured!';
    }
    yield put(signupUserFailure());
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retrogames Archive',
       message: message
     }));
  }
}

export function* watchLoginUser () {
  yield takeLatest(LOGIN_USER, loginUser);
}

export function* watchSignupUser () {
  yield takeLatest(SIGNUP_USER, signupUser);
}
