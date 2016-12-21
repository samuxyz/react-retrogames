import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';
import { Form } from '../components';
import * as gamesActionCreators from '../actions/games';
import * as filestackActionCreators from '../actions/filestack';

class AddGameContainer extends Component {
  constructor (props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }
  submit (event) {
    event.preventDefault();
    this.props.gamesActions.postGame();
    hashHistory.push('/games');
  }
  uploadPicture () {
    this.props.filestackActions.uploadPicture();
  }
  render () {
    const { picture } = this.props;
    return (
      <Form
        handleSubmit={this.submit}
        picture={picture}
        uploadPicture={this.uploadPicture}
      />
    );
  }
}

function mapStateToProps (state) {
  return {
    picture: state.getIn(['filestack', 'url'], '')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gamesActions: bindActionCreators(gamesActionCreators, dispatch),
    filestackActions: bindActionCreators(filestackActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddGameContainer);
