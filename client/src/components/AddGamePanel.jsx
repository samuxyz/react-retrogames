import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import userAuthenticated from '../utils/authWrapper';

class AddGamePanel extends PureComponent {
  render () {
    const { userName, logout } = this.props;
    return (
      <div className="add-game-panel">
        <h5>Welcome back {userName}, <span onClick={logout}>Logout</span></h5>
        <Link to="/games/add" className="btn btn-danger">add a new Game!</Link>
      </div>
    );
  }
}

const options = {
  authSelector: state => state.get('auth'),
  predicate: auth => auth.get('isAuthenticated'),
  wrapperDisplayName: 'authAddGame',
  FailureComponent: () => {
    return (
      <div className="btn-group" role="group" aria-label="...">
        <Link to="/auth/signup" className="btn btn-primary">Sign Up</Link>
        <Link to="/auth/login" className="btn btn-danger">Login</Link>
      </div>
    );
  }
};

export default userAuthenticated(options)(AddGamePanel);
