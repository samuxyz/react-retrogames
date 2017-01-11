import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, GamesListManager } from '../components';
import * as gamesActionCreators from '../actions/games';
import * as authActionCreators from '../actions/auth';
import { toastr } from 'react-redux-toastr';

class GamesContainer extends Component {
  constructor (props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    this.getGames();
  }

  toggleModal (index) {
    this.props.gamesActions.showSelectedGame(this.props.games[index]);
    $('#game-modal').modal();
  }

  getGames () {
    this.props.gamesActions.getGames();
  }

  deleteGame (id) {
    this.props.gamesActions.deleteGame(id);
  }

  setSearchBar (event) {
    this.props.gamesActions.setSearchBar(event.target.value.toLowerCase());
  }

  logout () {
    this.props.authActions.logoutUser();
    toastr.success('Retrogames archive', 'Your are now logged out');
    localStorage.removeItem('token');
  }

  render () {
    const { games, selectedGame, searchBar, userName, authActions } = this.props;
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
          userName={userName}
          logout={this.logout}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    games: state.getIn(['games', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['games', 'searchBar'], ''),
    selectedGame: state.getIn(['games', 'selectedGame'], Immutable.List()).toJS(),
    userName: state.getIn(['auth', 'name'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch),
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
