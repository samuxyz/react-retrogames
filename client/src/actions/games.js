import {
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_GAME,
  DELETE_GAME,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE,
  POST_GAME,
  POST_GAME_SUCCESS,
  POST_GAME_FAILURE
} from '../constants/games';


function getGames () {
  return {
    type: GET_GAMES
  };
}

function getGamesSuccess (games) {
  return {
    type: GET_GAMES_SUCCESS,
    games
  };
}

function getGamesFailure () {
  return {
    type: GET_GAMES_FAILURE
  };
}

function setSearchBar (keyword) {
  return {
    type: SET_SEARCH_BAR,
    keyword
  };
}

function showSelectedGame (game) {
  return {
    type: SHOW_SELECTED_GAME,
    game
  };
}

function deleteGame (id) {
  return {
    type: DELETE_GAME,
    id
  };
}

function deleteGameSuccess (games) {
  return {
    type: DELETE_GAME_SUCCESS,
    games
  };
}

function deleteGameFailure () {
  return {
    type: DELETE_GAME_FAILURE
  };
}

function postGame () {
  return {
    type: POST_GAME
  };
}

function postGameSuccess () {
  return {
    type: POST_GAME_SUCCESS
  };
}

function postGameFailure () {
  return {
    type: POST_GAME_FAILURE
  };
}

export {
  getGames,
  getGamesSuccess,
  getGamesFailure,
  setSearchBar,
  showSelectedGame,
  deleteGame,
  deleteGameSuccess,
  deleteGameFailure,
  postGame,
  postGameSuccess,
  postGameFailure
};
