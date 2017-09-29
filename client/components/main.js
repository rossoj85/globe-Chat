import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Sidebar, Navbar, NewMessageEntry, MessagesList, NewChannelEntry} from './index'
import store, {fetchChannels} from '../store'

export default class Main extends Component{

    componentDidMount(){
        console.log("Main Component mounted")
      
        const channelsThunk =fetchChannels();
        store.dispatch(channelsThunk)
    }

    render(){
        return (
           
        <div>
            <Sidebar />
            <Navbar />
            <main>
            <Switch>
                <Route path='/new-channel' component={NewChannelEntry} />
                    <Route path="/channels/:channelId" component={MessagesList} />
                    <Redirect to="/channels/1" />
                </Switch>
            </main>
        </div>
        )
    }
}