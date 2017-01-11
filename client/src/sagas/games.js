import { takeLatest } from 'redux-saga';
import {
	put,
	select,
	call
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {actions as toastrActions} from 'react-redux-toastr';
import {
  GET_GAMES,
	DELETE_GAME,
  POST_GAME
} from '../constants/games';
import {
	getGamesSuccess,
	getGamesFailure ,
	deleteGameSuccess,
	deleteGameFailure,
  postGameSuccess,
  postGameFailure
} from '../actions/games';
import {
  logoutUser
} from '../actions/auth';

const selectedGames = (state) => {
  return state.getIn(['games', 'list']).toJS();
}

const selectedPicture = (state) => {
  return state.getIn(['filestack', 'url'], '');
}

const fetchGames = () => {
  return fetch('http://localhost:8080/games', {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(response => response.json());
};

const deleteServerGame = (id) => {
  return fetch(`http://localhost:8080/games/${id}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token')
    }),
    method: 'DELETE',
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

const postServerGame = (game) => {
  return fetch('http://localhost:8080/games', {
    headers: new Headers({
      'Content-Type': 'application/json',
			'x-access-token': localStorage.getItem('token')
    }),
    method: 'POST',
    body: JSON.stringify(game)
  })
  .then(response => {
    if (response.status === 200) {
      return response.json();
    }
    throw response;
  });
}

function* getGames () {
  try {
    const games = yield call(fetchGames);
    yield put(getGamesSuccess(games));
  } catch (e) {
    yield put(getGamesFailure());
  }
}

function* deleteGame (action) {
  const { id } = action;
  const games = yield select(selectedGames);
  try {
    const result = yield call(deleteServerGame, id);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retrogames Archive',
       message: result.message
     }));
    yield put(deleteGameSuccess(games.filter(game => game._id !== id)));
  } catch (e) {
    let message = '';
    if(e.status === 403) {
      yield put(logoutUser());
      message = 'Invalid token. You are being logged off';
    } else {
      yield put(deleteGameFailure());
      message = 'Sorry, an error occured!';
    }
    localStorage.removeItem('token');
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retrogames Archive',
       message: message
     }));
  }
}

const getGameForm = (state) => {
  return state.getIn(['form', 'game']).toJS();
}

function* postGame () {
  const picture = yield select(selectedPicture);
  const game = yield select(getGameForm);
  const newGame = Object.assign({}, { picture }, game.values);
  try {
    const result = yield call(postServerGame, newGame);
    yield put(toastrActions.add({
       type: 'success',
       title: 'Retrogames Archive',
       message: result.message
     }));
    yield put(postGameSuccess());
    yield put(push('/games'));
  } catch (e) {
    if(e.status === 403) {
      yield put(logoutUser());
      message = 'Invalid token. You are being logged off';
    } else {
      yield put(postGameFailure());
      message = 'Sorry, an error occured!';
    }
    localStorage.removeItem('token');
    yield put(toastrActions.add({
       type: 'error',
       title: 'Retrogames Archive',
       message: message
     }));
  }

}

function* watchGetGames () {
  yield takeLatest(GET_GAMES, getGames);
}

function* watchDeleteGame () {
	yield takeLatest(DELETE_GAME, deleteGame);
}

function* watchPostGame () {
  yield takeLatest(POST_GAME, postGame);
}

export {
	watchGetGames,
	watchDeleteGame,
  watchPostGame
};
