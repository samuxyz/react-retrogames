import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form/immutable';

class Form extends PureComponent {
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
								 Add a Game!
							</h2>
						</div>
						<div className="panel-body">
							<form onSubmit={this.props.handleSubmit}>
                <div className="form-group text-left">
                  <label htmlFor="name">Name</label>
                  <Field
                    name="name"
                    type="text"
                    className="form-control"
                    component="input"
                    placeholder="Enter the name"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="description">Description</label>
                  <Field
                    name="description"
                    component="textarea"
                    className="form-control"
                    placeholder="Enter the description"
                    rows="5"
                  />
                </div>
                <div className="form-group text-left">
                  <label htmlFor="price">Year</label>
                  <Field
                    name="year"
                    component="input"
                    type="number"
                    className="form-control"
                    placeholder="Enter the year"
                  />
                </div>
								<div className="form-group text-left">
				          <label htmlFor="picture">Picture</label>
				          <div className="text-center dropup">
				            <button
                      id="button-upload"
                      type="button"
                      className="btn btn-danger"
                      onClick={() => uploadPicture()}
                    >
				              Upload <span className="caret" />
				            </button>
				          </div>
				        </div>
				        <div className="form-group text-center">
									<img id="picture" className="img-responsive img-upload" src={picture} />
								</div>
								<button type="submit" className="btn btn-submit btn-block">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default reduxForm({ form: 'game' })(Form);
