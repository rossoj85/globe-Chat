import React, { Component } from 'react';
import {connect} from 'react-redux';
import store, {writeMessage, postMessage, postDMchannel} from '../store';
import axios from 'axios';


class NewMessageEntry extends Component {
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }

handleChange(evt){
  const inputValue = evt.target.value
  const action =writeMessage(inputValue)
  store.dispatch(action)
}
postMessage 

//first determine id the current channel si dm or not. If current channel is DM we first
//have to create that channel with a find or create and then link the message to that 
//channel 
handleSubmit(evt){
  evt.preventDefault()
  console.log('POSTDM CHANNEL', postDMchannel);
  const content = this.props.newMessageEntry
  const authorId = this.props.currentUser.id;
  const currentChannel = this.props.currentChannel;
  console.log('~~CURRENT CHANNEL INSIDE NEW MESSAGE ENTRY~~~');

  // if(currentChannel.isDM){
  //   let postChannelThunk = postDMchannel(currentChannel);
  //   const postDMchannelThunk = postDMchannel(currentChannel);
  //   store.dispatch(postDMchannelThunk)
  // }
  const channelId = this.props.channelId
  const incomingMessageLanguage = this.props.incomingMessageLanguage
  const originalMessage ={
    message: this.props.newMessageEntry,
    incomingMessageLanguage,
    channelId,
    authorId
    } 
    // console.log('newMessageEntryProps', this.props);
    // console.log('channelId', channelId);
    // console.log('CURRENT USER',this.props.currentUser)
    console.log("ORIGINAL MESSAGE from handleSubmit",originalMessage)
  //   console.log('---> Channel ID', channelId);
  const postMessageThunk = postMessage(originalMessage)
  store.dispatch(postMessageThunk)
}




  render () {
    // console.log("NEW MESSAGE ENTRY",this.state.newMessageEntry)
    // console.log("CONTENT", this.state.newMessageEntry)
    // console.log("CHannel ID", this.props.channelId)
   
    console.log("NEW MESSAGE ENTRY PROPS",this.props)
   
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            onChange = {this.handleChange}
            className="form-control"
            value ={this.props.newMessageEntry}
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapState = (state, ownProps) =>{
  // console.log("STATE FORM NEW MESSAGE ENTRY", state)
  
  return {
    messagesCollection: state.messages.messageCollection,
    newMessageEntry: state.messages.newMessageEntry,
    incomingMessageLanguage: state.navbar.incomingMessageLanguage,
    currentUser: state.currentUser,
    currentChannel: state.channels.currentChannel

  }
}

const mapDispatch =(dispatch, ownProps)=>{
    return {
        handleChange (event) {
            dispatch(writeMessage(event.target.value))
          }
    }
}

export default connect(mapState)(NewMessageEntry)