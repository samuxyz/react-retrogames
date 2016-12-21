import Immutable from 'immutable';
import {
  GET_GAMES_SUCCESS,
  GET_GAMES_FAILURE,
  SET_SEARCH_BAR,
  SHOW_SELECTED_GAME,
  DELETE_GAME_SUCCESS,
  DELETE_GAME_FAILURE
} from '../constants/games';

const initialState = Immutable.Map();

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_GAME_SUCCESS:
    case GET_GAMES_SUCCESS: {
      return state.merge({ list: action.games });
    }
    case SET_SEARCH_BAR: {
      return state.merge({ searchBar: action.keyword });
    }
    case SHOW_SELECTED_GAME: {
      return state.merge({ selectedGame: action.game });
    }
    case DELETE_GAME_FAILURE:
    case GET_GAMES_FAILURE: {
      return state.clear();
    }
    default:
      return state;
  }
}
