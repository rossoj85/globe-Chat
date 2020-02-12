import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewMessageEntry, Message} from '../index';
import store, {fetchSingleChannelMessages} from '../../store';
import axios from 'axios';


const channels = {}

const  MessagesList = (props) =>{
    const channelId =  props.channelId
    
  // console.log('NEW MESSAGE LIST MOUNTED')
    // const channelId = Number( props.match.params.channelId); // because it's a string "1", not a number!
    // const filteredMessages = messages.filter(message => message.channelId === channelId);
    console.log("!#$#@MESSAGE LIST PROPS$#@!$!@", props)
    
    const messages =  props.messagesCollection
    // console.log('MeSaGe ColLecTiOn', messages)
    const userId =  props.currentUser &&  props.currentUser.id
    // console.log("MESSSAGES",messages)
    console.log('CHannel ID', channelId);
    console.log('CHANNELS', channels);

    if(channelId && !channels[channelId]){
      console.log('CALLING THE DISPATCH FROM FREONT END');
      const fetechSingleChannelMessagesThunk = fetchSingleChannelMessages(channelId)
      store.dispatch(fetechSingleChannelMessagesThunk);
      channels[channelId] = "dirty";
    }

    const filteredMessages = messages && messages.filter(message=>
      +message.channelId===+channelId)
    const currentChannel = props.currentChannel
    console.log("filtered Messages",filteredMessages)
    // console.log("channelId",  props.channelId)
    // const originalMessage = messages.originalMessage
    // const translatedText = messages.translatedText;
    let messageDisplayed=false

    return (
      <div id="messagesList">
      <h3>{currentChannel ? currentChannel.name: 'Messages Go Here!'}</h3>
        <ul className="media-list">
        {filteredMessages && filteredMessages.map(messageObject=><Message 
          message={messageObject.content} 
          translatedMessage={messageObject.translation}
          messageId={messageObject.id}
          key={messageObject.id}
          author={messageObject.author}
          userId={userId}
          />
          
        
        )}
        </ul>
      <NewMessageEntry />
      </div>
    );
}
const mapState = (state, ownProps) =>{
    console.log("OWN PROPS Params FROM MESSAGE LIST",ownProps.match.params)
  return {
    messagesCollection: state.messages.messageCollection,
    channelId: ownProps.match.params.channelId,
    currentUser: state.currentUser,
    currentLanguage: state.navbar.incomingMessageLanguage,
    currentChannel: state.channels.currentChannel,
    userId: state.navbar.userId
    
  }
}

export default connect(mapState)(MessagesList)
