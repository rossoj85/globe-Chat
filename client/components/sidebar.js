import React, { Component } from 'react';
import {ChannelList} from './index'
import store from '../store'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class Sidebar extends Component {

  render () {
    // console.log('SIDEBAR PROPS', this.props)
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
          <div>
            <h5>ACTIVE USERS</h5>
          </div>
          <div>
            <h5>Channels</h5>
            <ChannelList />
          </div>
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
// with router forces a re-render when routees changes and is essential to use when you want active navlink classes
export default withRouter(connect(mapState)(Sidebar));