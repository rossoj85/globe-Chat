import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Sidebar, Navbar, NewMessageEntry, MessagesList, NewChannelEntry, Welcome} from './index'
import store, {fetchChannels, fetch, fetchMessages, retrieveLoggedInUser } from '../store'

export default class Main extends Component{

    componentDidMount(){
        console.log("Main Component mounted")
        console.log(fetch)
        const channelsThunk =fetchChannels();
        const messagesThunk = fetchMessages();
        const currentUserThunk =retrieveLoggedInUser();
        store.dispatch(channelsThunk)
        store.dispatch(messagesThunk)
        store.dispatch(currentUserThunk)
    }

    render(){
        return (
           
        <div>
            <Sidebar />
            <Navbar />
            <main>
            <Route exact path='/' component={Welcome}/>
            <Switch>
                <Route path='/new-channel' component={NewChannelEntry} />
                    <Route path="/channels/:channelId" component={MessagesList} />
                    {/*<Redirect to="/channels/1" />*/}
                </Switch>
            </main>
        </div>
        )
    }
}