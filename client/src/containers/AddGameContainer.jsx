import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Form } from '../components';

export default class AddGameContainer extends Component {
  constructor (props) {
    super(props);
    this.state = { newGame: {}};
    this.submit = this.submit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
    this.setGame = this.setGame.bind(this);
  }
  submit () {
    const newGame = Object.assign({}, { picture: $('#picture').attr('src') }, this.state.newGame);
    fetch('http://localhost:8080/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(newGame)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message);
      hashHistory.push('/games');
    });
  }
  uploadPicture () {
    filepicker.pick (
      {
        mimetype: 'image/*',
        container: 'modal',
        services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
        openTo: 'COMPUTER'
      },
      function (Blob) {
        console.log(JSON.stringify(Blob));
        $('#picture').attr('src', Blob.url);
      },
      function (FPError) {
        console.log(FPError.toString());
      }
    );
  }
  setGame () {
    const newGame = {
      name: document.getElementById('name').value,
      description: document.getElementById('description').value,
      year: document.getElementById('year').value,
      picture: $('#picture').attr('src')
    };
    this.setState({ newGame });
  }
  render () {
    return <Form submit={this.submit} uploadPicture={this.uploadPicture} setGame={this.setGame} />
  }
}
