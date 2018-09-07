import React, { Component } from 'react';
import {ChannelList} from './index'
import store from '../store'
import {connect} from 'react-redux';
class Sidebar extends Component {

  render () {
    console.log('SIDEBAR PROPS', this.props)
    const currentUser = this.props.currentUser
    return (
      <sidebar>
        <div className="sidebar-header">
          <h3 href="#">
            <div>Globe Chat</div>
            <i alt="Brand" className="glyphicon glyphicon-globe">
            </i>
          </h3>
        </div>
      {
        currentUser ?
        <div>
          <h5>Channels</h5>
          <ChannelList />
        </div>
        :
        null
      }
      </sidebar>
    );
  }
}
const mapState=(state)=>{
  return{
      
      currentUser: state.currentUser
  }
}

export default connect(mapState)(Sidebar)