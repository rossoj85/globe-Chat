import React from 'react';
import { connect } from 'react-redux';


export default class Welcome extends React.Component {
    constructor(props) {
      super(props);
     
    }
  
    render() {
    
      const { message } = this.props;
      console.log(this.props)
      
      return (
        <div className="signin-container">
          <div className="buffer local">
            <form >
              <div className="form-group">
                <label>email</label>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                  <label>password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    required
                  />
              </div>
              <button type="submit"  className="btn btn-block btn-primary">{message}</button>
            </form>
          </div>
          <div className="or buffer">
            <div className="back-line">
              <span>OR</span>
            </div>
          </div>
          <div className="buffer oauth">
            <p>
              <a
                target="_self"
                href="api/auth/google"
                className="btn btn-social btn-google">
                <i className="fa fa-google" />
                <span>{message} with Google</span>
              </a>
              
              <a
              style={{'marginTop': '15px'}}
              target="_self"
              href="api/auth/facebook"
              className="btn btn-social btn-facebook">
              <i className="fa fa-facebook" />
              <span>{message} with Facebook</span>
            </a>
              
            </p>
          </div>
        </div>
      );
    }
}