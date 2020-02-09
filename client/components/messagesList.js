import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewMessageEntry, Message} from './index';
import axios from 'axios';




class MessagesList extends Component {
 
  render () {
  // console.log('NEW MESSAGE LIST MOUNTED')
    // const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    // const filteredMessages = messages.filter(message => message.channelId === channelId);
    console.log("!#$#@MESSAGE LIST PROPS$#@!$!@",this.props)
    
    const messages = this.props.messagesCollection
    // console.log('MeSaGe ColLecTiOn', messages)
    const channelId= this.props.channelId
    const userId = this.props.currentUser && this.props.currentUser.id
    // console.log("MESSSAGES",messages)
    const filteredMessages = messages.filter(message=>
      +message.channelId===+channelId)
    const currentChannel =this.props.currentChannel
    // console.log("props channel id ",channelId)

    console.log("filtered Messages",filteredMessages)
    // console.log("channelId", this.props.channelId)
    // const originalMessage = messages.originalMessage
    // const translatedText = messages.translatedText;
    let messageDisplayed=false
    // console.log(filteredMessages)
    
    // console.log("PAGE USER ID", userId)
    
    return (
      <div id="messagesList">
      <h3>{currentChannel ? currentChannel.name: 'Messages Go Here!'}</h3>
        <ul className="media-list">
        {filteredMessages.map(messageObject=><Message 
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
