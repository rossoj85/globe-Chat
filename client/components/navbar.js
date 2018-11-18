import React, { Component } from 'react';
import {LanguageSelect} from './index'
import {connect} from 'react-redux';
import store, {setLanguage, changeIncomingMessageLanguage, reduxLogout, fetchMessages} from '../store';
import {Button } from 'react-bootstrap'
import{NavLink,withRouter} from 'react-router-dom'
import Bluebirt from 'bluebird';

class Navbar extends Component {

    constructor(props) {
      super(props);
    }

  render () {
    // console.log("NAVBAR PROPS", this.props )
    const incomingMessageLanguage= this.props.incomingMessageLanguage
    const currentChannel =this.props.currentChannel
    const currentUser =this.props.currentUser
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
        //comes from an on change on the dropdown in navbar-language-select
      console.log("@@@@@@@@@@Change registered", evt.target.value)
      const newIncomingMessageLanguage = evt.target.value
      const changeLanguageThunk = changeIncomingMessageLanguage(newIncomingMessageLanguage)
      const fetchMessagesThunk = fetchMessages(newIncomingMessageLanguage)
      dispatch(changeLanguageThunk)
      console.log('FRoM InSide handleLanguage Change', newIncomingMessageLanguage)
      dispatch(fetchMessagesThunk)
    },
    logout: ()=>{
      const currentUser = store.getState().currentUser
      dispatch(reduxLogout(currentUser))
      console.log('You logged out')
      ownProps.history.push('/');
    }
  }
}
export default withRouter(connect(mapState, mapDispatch)(Navbar))
