import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Welcome, Sidebar, Navbar, NewMessageEntry, MessagesList, 
    NewChannelEntry} from './index'
import store, {fetchChannels, fetchMessages } from '../store'

export default class Main extends Component{

    componentDidMount(){
        console.log("Main Component mounted")
        console.log(fetchMessages)
        const channelsThunk =fetchChannels();
        const messagesThunk = fetchMessages();
        store.dispatch(channelsThunk)
        store.dispatch(messagesThunk)
    }

    render(){
        return (
           
        <div>
            <Sidebar />
            <Navbar />
            <main>
            <Switch>
                <Route path='/welcome' component={Welcome} />
                <Route path='/new-channel' component={NewChannelEntry} />
                    <Route path="/channels/:channelId" component={MessagesList} />
                    <Redirect to="/channels/1" />
                </Switch>
            </main>
        </div>
        )
    }
}