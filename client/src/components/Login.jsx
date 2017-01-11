import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';
import * as authActionCreators from '../actions/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends PureComponent {
  login () {
    this.props.authActions.loginUser(this.props.location.query.next || '/games');
  }

  render () {
    const { picture, uploadPicture } = this.props;
    return (
      <div className="row scrollable">
				<div className="col-md-offset-2 col-md-8">
          <div className="text-left">
          <Link to="/games" className="btn btn-info">Back</Link>
          </div>
					<div className="panel panel-default">
						<div className="panel-heading">
							<h2 className="panel-title text-center">
								 Login
							</h2>
						</div>
						<div className="panel-body">
							<form>
                <div className="form-group text-left">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="email"
                    type="text"
                    className="form-control"
                    component="input"
                    placeholder="Enter the name"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    component="textarea"
                    className="form-control"
                    placeholder="Enter the password"
                    rows="5"
                  />
                </div>
								<button type="button" className="btn btn-submit btn-block" onClick={() => this.login()}>Login</button>
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}

export default reduxForm({ form: 'login' })(connect(null, mapDispatchToProps)(Login));
