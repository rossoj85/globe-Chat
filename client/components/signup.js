import React from 'react';
import { connect } from 'react-redux';
import { FacebookLoginButton,GoogleLoginButton } from "react-social-login-buttons";
import {FacebookSignupButton, GoogleSignupButton} from './customButtons'
import {addUser as reduxSignup,reduxLogin} from '../store';
//so redux signup creates user in db, but we should amke itto create or find



class SignUp extends React.Component {
    constructor(props) {
      super(props);
     this.onSignupSubmit=this.onSignupSubmit.bind(this)
    }
  
    render() {
    
      const { message } = this.props;
      console.log('WELCOME PAGE PROPS', this.props)
      console.log('MESSAGE',message)
      console.log(reduxSignup)
      console.log('#@#@#@# LOGIN #@#@#@#', reduxLogin)
      
      return (
        <div className="signin-container">
          <div className="buffer local">
            <form onSubmit={this.onSignupSubmit}>
            <div className="form-group">
                
            <label>User Name</label>
            <input
              name="userName"
              type="userName"
              className="form-control"
              required
            />
          </div>

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
            <GoogleSignupButton href="api/auth/google"
            onClick={() => alert("Hello")}></GoogleSignupButton>
            </a>

            <a href="api/auth/facebook">
            <FacebookSignupButton  href="api/auth/facebook"
            onClick={() => alert("Hello")} />
            </a>
           
          </div>
        </div>
      );
    }
    onSignupSubmit(event) {
      event.preventDefault();
      const {userName,email, password} = event.target; 
      const user = {
        name: userName.value,
        email: email.value,
        password: password.value
      }
      this.props.reactSignup(user)
      .then(createdUserArray=>{
        // console.log('CREATED (*OR FOUND*) USER',createdUser)
        //FIND OR CREATE RETURN AN ARRAY OF OBJECTS
        const createdUser=createdUserArray[0]
        this.props.reactLogin(createdUser)
      })
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
const mapState = () => ({ message: 'Signup' });

const mapDispatch = {
  reactSignup: reduxSignup,
  reactLogin: reduxLogin
}

export default connect(mapState, mapDispatch)(SignUp);