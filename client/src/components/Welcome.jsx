import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Welcome extends PureComponent {
  render () {
    return (
      <div className="inner cover">
        <h1 className="cover-heading">Welcome</h1>
        <p className="lead">Click on browse to start your journey into the wiki of games that made history.</p>
        <p className="lead">
          <Link className="btn btn-lg" to="/games">Browse!</Link>
        </p>
      </div>
    );
  }
}
