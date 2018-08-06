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
            onClick={() => alert("Hello")}></GoogleLoginButton>
            </a>

            <a href="api/auth/facebook">
            <FacebookLoginButton  href="api/auth/facebook"
            onClick={() => alert("Hello")} />
            </a>
           
          </div>
        </div>
      );
    }
    onSignupSubmit(event) {
      event.preventDefault();
      const {email, password} = event.target; 
      const user = {
        email: email.value,
        password: password.value
      }
      this.props.reactSignup(user)
      .then(createdUser=>{
        this.props.reactLogin(createdUser)
        .then( loggedInUser =>
          this.props.history.push(`/users/${loggedInUser.id}`)
        )
      })
      .catch(console.error())
  
      const { message } = this.props;
      console.log('SIGNUP CLICKED')
      // console.log(`${message} isn't implemented yet`);
    }
}
const mapState = () => ({ message: 'Signup or Login' });

export default connect(mapState)(Welcome);