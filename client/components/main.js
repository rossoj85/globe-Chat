import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import {Sidebar, Navbar, NewMessageEntry, MessagesList, NewChannelEntry, SignUp, Login, MessageListDMS} from './index'
import store, {fetchChannels,  fetchMessages,  retrieveLoggedInUser, reduxSetCurrentChannel } from '../store'
import { constructChannelInfoFromPath} from '../utilities'

export default class Main extends Component{

    componentDidMount(){
        console.log('constructChannelInfoFromPath', constructChannelInfoFromPath);
        let currentUser = store.getState().currentUser
        console.log("~~~~~~~~~~Main Component mounted~~~~~~~~~~")
        console.log('###',currentUser)
        const incomingMessageLanguage = store.getState().navbar.incomingMessageLanguage;
        const channelsThunk =fetchChannels();

        const messagesThunk = fetchMessages(incomingMessageLanguage);
        const currentUserThunk =retrieveLoggedInUser();

        // const pathname = window.location.pathname;
        const channelInfo = constructChannelInfoFromPath();
        const setCurrentChannelThunk = reduxSetCurrentChannel(channelInfo);


        store.dispatch(channelsThunk)
        // store.dispatch(messagesThunk)
        store.dispatch(currentUserThunk)
        store.dispatch(setCurrentChannelThunk)
        console.log('MAIN COMPONENT CURRENT LANGUAGE', incomingMessageLanguage)
        console.log('MAIN COMPONENT PROPS', this.props);
    }


    render(){
        console.log('~~~~~MAIN COMPONENT RERENDER & PROPS~~~~', this.props)
        return (
            
        <div>
            <Sidebar />
            <Navbar />
            <main>
            <Route exact path='/' component={SignUp}/>
            <Route exact path='/login' component={Login}/>
            <Switch>
                <Route path='/new-channel' component={NewChannelEntry} />
                    <Route path="/channels/:channelId" component={MessagesList} />
                    <Route path ="/dm/:dmpair" component={MessageListDMS} />
                    {/*<Redirect to="/channels/1" />*/}
                </Switch>
            </main>
        </div>
        )
    }
}

// const mapState = (state, ownProps) =>{
//     // console.log("OWN PROPS FROM MESSAGE LIST",ownProps)
//   return {
//     messagesCollection: state.messages.messageCollection,
//     // channelId: ownProps.match.params.channelId,
//     // currentUser: state.currentUser,
//     // currentLanguage: state.navbar.incomingMessageLanguage,
//     // currentChannel: state.channels.currentChannel,
//     // userId: state.navbar.userId
    
//   }
// }

// export default connect(mapState)(Main)