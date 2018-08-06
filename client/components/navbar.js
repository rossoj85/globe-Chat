import React, { Component } from 'react';
import {LanguageSelect, NameEntry} from './index'
import {connect} from 'react-redux';
import store, {setLanguage, changeIncomingMessageLanguage} from '../store';

class Navbar extends Component {


handleLanguageChange(evt){
  
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
        <h3>{currentChannel&&currentChannel.name}</h3>
       {currentUser?  <p>Welcome {currentUser.name}</p>: <NameEntry/>}
       <LanguageSelect 
                      incomingMessageLanguage={incomingMessageLanguage} 
                      // handleLanguageSubmit={this.props.handleLanguageSubmit} 
                      handleLanguageChange={this.props.handleLanguageChange}
       />
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
const mapDispatch=(dispatch)=>{
  return {
    handleLanguageChange: function(evt){
      console.log("Change registered", evt.target.value)
      const inputVal = evt.target.value
      const action = changeIncomingMessageLanguage(inputVal)
      dispatch(action)
    },
 
  }
}
export default connect(mapState, mapDispatch)(Navbar)
