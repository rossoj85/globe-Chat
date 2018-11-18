import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// import store from '../store';
import {connect} from 'react-redux';
// import {reduxSetCurrentChannel} from '../store'


 const activeUserList = (props) => {
  const {activeUsers} = props;

  console.log(location.pathname)
    return (
      <ul>
      {
        activeUsers.map(activeUser=>{
          return (
            <li key={activeUser.id} /*onClick={()=>props.reactSetCurrentChannel(channel)}*/>
            <NavLink to= {`/dm/${activeUser.id}`} activeClassName="active" >
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
    // console.log(state)
  return {
    activeUsers: state.activeUsers
    
  }
}
const activeUserListContainer = connect(mapState)(activeUserList)
const ContainerWithRouter = withRouter(activeUserListContainer)
export default ContainerWithRouter