import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewMessageEntry, Message} from './index';
import axios from 'axios';
import { constructChannelInfoFromPath } from '../utilities';


const messgeListDMS = (props)=>{
    console.log("DM LIST PROPS", props)
    // const {currentChannel, channelId} = props;
    const {clientChannelsCollection} = props;
    console.log('clientChannelsCOllection', clientChannelsCollection);
    const channelId = constructChannelInfoFromPath()

    console.log('messgeListDMS channelId', channelId);
    
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
    console.log("OWN PROPS FROM MESSAGE LIST",ownProps)
  return {
    // channelId: ownProps.match.params.dmpair,
    messagesCollection: state.messages.messageCollection,
    currentUser: state.currentUser,
    currentLanguage: state.navbar.incomingMessageLanguage,
    currentChannel: state.channels.currentChannel,
    userId: state.navbar.userId,
    clientChannelsCollection: state.channels.channels
    
  }
}
export default connect(mapState)(messgeListDMS);