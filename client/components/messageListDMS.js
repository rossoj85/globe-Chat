import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewMessageEntry, Message} from './index';
import axios from 'axios';


const messgeListDMS = (props)=>{
    const {currentChannel, channelId} = props;

    return (
        <div id="messagesList">
        {/*need to fix the "CURRENT CHANNEL ISSUE"*/}
        <h3>'You have a Private Message!'</h3>
          <ul className="media-list">
          {/* {filteredMessages.map(messageObject=><Message 
            message={messageObject.content} 
            translatedMessage={messageObject.translation}
            messageId={messageObject.id}
            key={messageObject.id}
            author={messageObject.author}
            userId={userId}
            />
            
          
          )} */}
          </ul>
        <NewMessageEntry channelId={channelId}/>
        </div>
      );
}
const mapState = (state, ownProps) =>{
    // console.log("OWN PROPS FROM MESSAGE LIST",ownProps)
  return {
    channelId: ownProps.match.params.channelId,
    currentUser: state.currentUser,
    currentLanguage: state.navbar.incomingMessageLanguage,
    currentChannel: state.channels.currentChannel,
    userId: state.navbar.userId
    
  }
}
export default connect(mapState)(messgeListDMS);