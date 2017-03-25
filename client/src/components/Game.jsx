import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import userAuthenticated from '../utils/authWrapper';

const options = {
  authSelector: state => state.get('auth'),
  predicate: auth => auth.get('isAuthenticated'),
  wrapperDisplayName: 'authDeleteGame',
  FailureComponent: null
};

const DeleteButton = userAuthenticated(options)(
  (props) => <button className="btn btn-danger" role="button" onClick={() => props.deleteGame(props.id)}>Delete</button>
);

export default class Game extends PureComponent {
  render () {
    const { _id, i, name, description, picture, toggleModal, deleteGame } = this.props;
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="thumbnail-frame">
            <img src={picture} alt="..." className="img-responsive thumbnail-pic" />
          </div>
          <div className="caption">
            <h5>{name}</h5>
            <p className="description-thumbnail">{`${description.substring(0, 150)}...`}</p>
            <div className="btn-group" role="group" aria-label="...">
              <button className="btn btn-success" role="button" onClick={() => toggleModal(i)}>View</button>
              <DeleteButton deleteGame={deleteGame} id={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
