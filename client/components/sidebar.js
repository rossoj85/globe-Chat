import React, { Component } from 'react';
import {ChannelList} from './index'

export default class Sidebar extends Component {

  render () {
    return (
      <sidebar>
        <div className="sidebar-header">
          <h3 href="#">
            <div>Globe Chat</div>
            <i alt="Brand" className="glyphicon glyphicon-globe">
            </i>
          </h3>
        </div>
        <h5>Channels</h5>
        <ChannelList />
      </sidebar>
    );
  }
}