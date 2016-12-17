import React, { Component } from 'react';
import { Modal, GamesListManager } from '../components';

export default class GamesContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { games: [], selectedGame: {}, searchBar: '' };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
  }

  componentDidMount () {
    this.getGames();
  }

  toggleModal (index) {
    this.setState({ selectedGame: this.state.games[index] });
    $('#game-modal').modal();
  }

  getGames () {
    fetch('http://localhost:8080/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response => response.json())
    .then(data => this.setState({ games: data }));
  }

  deleteGame (id) {
    fetch(`http://localhost:8080/games/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ games: this.state.games.filter(game => game._id !== id) });
      console.log(response.message);
    });
  }

  setSearchBar (event) {
    this.setState({ searchBar: event.target.value.toLowerCase() });
  }

  render () {
    const { games, selectedGame, searchBar } = this.state;
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
        />
      </div>
    );
  }
}
