import React, { Component } from 'react';
import {LanguageSelect} from './index'
import {connect} from 'react-redux';
import store, {setLanguage, changeIncomingMessageLanguage, reduxLogout} from '../store';
import {Button } from 'react-bootstrap'
import{NavLink,withRouter} from 'react-router-dom'


class Navbar extends Component {

    constructor(props) {
      super(props);
    }

  render () {
    console.log("NAVBAR PROPS", this.props )
  
    const incomingMessageLanguage= this.props.incomingMessageLanguage
    const currentChannel =this.props.currentChannel
    const currentUser =this.props.currentUser
  
    // console.log(setLanguage)
    // console.log(currentChannel)
    // console.log('$$$$$NAVBAR STORE$$$$',store.getState())
    return (
      <nav>

      {currentUser ? 
        <div className='signedInControls'>
          <p>Welcome {currentUser.name}</p>
          <LanguageSelect 
                    incomingMessageLanguage={incomingMessageLanguage} 
                    // handleLanguageSubmit={this.props.handleLanguageSubmit} 
                    handleLanguageChange={this.props.handleLanguageChange}
          />
          <Button className='btn btn-secondary' onClick={()=>this.props.logout()}>Logout</Button>
        </div>
        :
        <div className='signupLogin'>
          <NavLink to='/'><Button className='btn btn-secondary'>Signup</Button></NavLink>
          <NavLink to='/login'><Button className='btn btn-secondary'>Login</Button></NavLink>
        </div>
      }
      </nav>
    );
  }
}

const mapState=(state)=>{
  return{
      incomingMessageLanguage: state.navbar.incomingMessageLanguage,
      currentChannel: state.channels.currentChannel,
      currentUser: state.currentUser
  }
}
const mapDispatch=(dispatch,ownProps)=>{
  return {
    handleLanguageChange: function(evt){
      console.log("Change registered", evt.target.value)
      const inputVal = evt.target.value
      const action = changeIncomingMessageLanguage(inputVal)
      dispatch(action)
    },
    logout: ()=>{
      dispatch(reduxLogout())
      console.log('You logged out')
      ownProps.history.push('/');
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(Navbar))
