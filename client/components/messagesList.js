import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NewMessageEntry, Message} from './index';
import axios from 'axios';




class MessagesList extends Component {
 



  render () {
  
    // const channelId = Number(this.props.match.params.channelId); // because it's a string "1", not a number!
    // const filteredMessages = messages.filter(message => message.channelId === channelId);
    console.log("!#$#@MESSAGE LIST PROPS$#@!$!@",this.props)
    const messages = this.props.messagesCollection
    const channelId= this.props.channelId
    const userId = this.props.userId
    // console.log("MESSSAGES",messages)
    const filteredMessages = messages.filter(message=>
      +message.channelId===+channelId)
    // console.log("props channel id ",channelId)
    // console.log("filtered Messages",filteredMessages)
    // console.log("channelId", this.props.channelId)
    // const originalMessage = messages.originalMessage
    // const translatedText = messages.translatedText;
    let messageDisplayed=false

    console.log("MESSSAGES",messages)
    console.log("PAGE USER ID", userId)
    
    return (
      <div id="messagesList">
      <h3>Messages GO HERE!</h3>
        <ul className="media-list">
        {filteredMessages.map(messageObject=><Message 
          message={messageObject.content} 
          translatedMessage={messageObject.translatedMessage}
          messageId={messageObject.id}
          key={messageObject.id}
          author={messageObject.author}
          userId={userId}
          />
          
        
        )}
        </ul>
      <NewMessageEntry channelId={channelId}/>
      </div>
    );
  }
}
const mapState = (state, ownProps) =>{
    // console.log("OWN PROPS FROM MESSAGE LIST",ownProps)
  return {
    messagesCollection: state.messages.messageCollection,
    channelId: ownProps.match.params.channelId,
    userId: state.navbar.userId
    
  }
}

export default connect(mapState)(MessagesList)
