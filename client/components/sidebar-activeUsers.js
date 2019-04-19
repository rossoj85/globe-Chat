import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import store from '../store';
import {connect} from 'react-redux';
import {reduxSetCurrentChannel} from '../store'


 const activeUserList = (props) => {
  const {activeUsers, currentUser} = props;
  const setCurrentChannel = (dmRoomId) =>{
    
    let channel = {
      id: null,
      name: dmRoomId,
      updatedAt: null,
      createdAt: null,
      isDM: true
    }
    props.reactSetCurrentChannel(channel)
  }
  console.log(location.pathname)
    return (
      <ul>
      {
        activeUsers.map(activeUser=>{

          let sortedUsers = [activeUser.id, currentUser.id].sort((a,b)=>a-b);
          sortedUsers.splice(1,0,'dm');
          let dmRoomId = sortedUsers.join("");
        
          
          return (
            <li key={activeUser.id} /*onClick={()=>props.reactSetCurrentChannel(channel)}*/>
            <NavLink to= {`/dm/${dmRoomId}`} onClick={()=>setCurrentChannel(dmRoomId)} activeClassName="active" >
            <span ><span className = 'activeDot'></span>{activeUser.name}</span>
            {/* <span className="badge">{messages.length && messages.filter(message => message.channelId === channel.id).length} */}
            {/* </span> */}
          </NavLink>

          </li>
          )
        })
      }
      <li>
      <NavLink to= "/new-channel">Add a friend...</NavLink>
      </li>
      </ul>
    );
}

const mapState = (state, ownProps) =>{
    console.log("THE STATE",state)
  return {
    activeUsers: state.activeUsers,
    currentUser: state.currentUser
  }
}
const mapDispatch={
  reactSetCurrentChannel: reduxSetCurrentChannel
}

const activeUserListContainer = connect(mapState, mapDispatch)(activeUserList)
const ContainerWithRouter = withRouter(activeUserListContainer)
export default ContainerWithRouter