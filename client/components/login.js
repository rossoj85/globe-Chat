import React from 'react';
import { connect } from 'react-redux';
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";
import {reduxLogin} from '../store';
//so redux signup creates user in db, but we should amke itto create or find



class Login extends React.Component {
    constructor(props) {
      super(props);
     this.onLoginSubmit=this.onLoginSubmit.bind(this)
    }
  
    render() {
    
      const { message } = this.props;
    //   console.log('WELCOME PAGE PROPS', this.props)
    //   console.log('MESSAGE',message)
    //   console.log(reduxSignup)
    //   console.log('#@#@#@# LOGIN #@#@#@#', reduxLogin)
      
      return (
        <div className="signin-container">
          <div className="buffer local">
            <form onSubmit={this.onLoginSubmit}>


              <div className="form-group">
                
                <label>email or user name</label>
                <input
                  name="nameOrEmail"
                  type="nameOrEmail"
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
              ></GoogleLoginButton>
            </a>

            <a href="api/auth/facebook">
              <FacebookLoginButton  href="api/auth/facebook"
              />
            </a>
           
          </div>
        </div>
      );
    }
    onLoginSubmit(event) {
      event.preventDefault();
      const {nameOrEmail, password} = event.target; 
      const user = {
        nameOrEmail: nameOrEmail.value,
        password: password.value
      }//
     
        this.props.reactLogin(user)
  
        .then( loggedInUser =>{
          console.log(loggedInUser)
          this.props.history.push(`/channels/1`)
        })
      .catch(console.error())
  
      const { message } = this.props;
      console.log('SIGNUP CLICKED')
      console.log(user.email)
      console.log(user.password)
      console.log(`${message} isn't implemented yet`);
    }
}
const mapState = () => ({ message: 'Login' });

const mapDispatch = {
//   reactSignup: reduxSignup,
  reactLogin: reduxLogin
}

export default connect(mapState, mapDispatch)(Login);