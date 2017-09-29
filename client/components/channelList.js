import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import store from '../store';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


 function ChannelList (props) {
  const {messages, channels} = props;
//   console.log("CHENNELS------",channels)
//   console.log("PROPS",props)
    return (
      <ul>
      {
        channels.channels.map(channel=>{
          return (
            <li key={channel.id}>
            <NavLink to= {`/channels/${channel.id}`} activeClassName="active">
            <span># {channel.name}</span>
            <span className="badge">{messages.filter(message => message.channelId === channel.id).length}
            </span>
          </NavLink>
          </li>
          )
        })
      }
      <li>
      <NavLink to= "/new-channel">Create a channel...</NavLink>
      </li>
      </ul>
    );
}
/**Write your connect component below! */


const mapState = (state, ownProps) =>{
    // console.log(state)
  return {
    messages: state.messages.messageCollection,
    channels: state.channels
    
  }
}


const ChannelListContainer = connect(mapState)(ChannelList)
const ContainerWithRouter = withRouter(ChannelListContainer)
export default ContainerWithRouter;