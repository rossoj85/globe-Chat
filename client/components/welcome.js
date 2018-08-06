import React from 'react';
import { connect } from 'react-redux';
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";


class Welcome extends React.Component {
    constructor(props) {
      super(props);
     
    }
  
    render() {
    
      const { message } = this.props;
      console.log(this.props)
      console.log('MESSAGE',message)
      
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
            
            <a href="api/auth/google">
            <GoogleLoginButton href="api/auth/google"
            onClick={() => alert("Hello")} />
            </a>

            <a href="api/auth/facebook">
            <FacebookLoginButton  href="api/auth/facebook"
            onClick={() => alert("Hello")} />
            </a>
           
          </div>
        </div>
      );
    }
    
}
const mapState = () => ({ message: 'Login' });

export default connect(mapState)(Welcome);