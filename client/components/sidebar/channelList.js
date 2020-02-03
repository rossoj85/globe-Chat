import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import store from '../store';
import {connect} from 'react-redux';
import {reduxSetCurrentChannel} from '../../store'


 function ChannelList (props) {
  const {messages, channels} = props;

  // console.log("CHANNEL LIST PROPS",props)
  // console.log(reduxSetCurrentChannel)
  //test push
  console.log(location.pathname)
    return (
      <ul>
      {
        channels.channels.map(channel=>{
          return (
            <li key={channel.id} onClick={()=>props.reactSetCurrentChannel(channel)}>
            <NavLink to= {`/channels/${channel.id}`} activeClassName="active" >
            <span># {channel.name}</span>
            <span className="badge">{messages.length && messages.filter(message => message.channelId === channel.id).length}
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


const mapState = (state, ownProps) =>{
    // console.log(state)
  return {
    messages: state.messages.messageCollection,
    channels: state.channels
    
  }
}
const mapDispatch={
    reactSetCurrentChannel: reduxSetCurrentChannel
}

const ChannelListContainer = connect(mapState, mapDispatch)(ChannelList)
const ContainerWithRouter = withRouter(ChannelListContainer)
export default ContainerWithRouter;


// activeClassName={location.pathname !== "your pathname"? null : "nav-link-gdc-selected"} 
// activeClassName="active"
// activeClassName={location.pathname === `/channels/${channel.id}` ? 'active': null}