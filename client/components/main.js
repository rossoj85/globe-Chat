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

        const pathname = window.location.pathname;
        const channelInfo = constructChannelInfoFromPath(pathname);
        const setCurrentChannelThunk = reduxSetCurrentChannel(channelInfo);


        store.dispatch(channelsThunk)
        store.dispatch(messagesThunk)
        store.dispatch(currentUserThunk)
        store.dispatch(setCurrentChannelThunk)
        console.log('MAIN COMPONENT CURRENT LANGUAGE', incomingMessageLanguage)
        console.log('MAIN COMPONENT PROPS', this.props);
        
    }

    // constructChannelInfoFromPath(pathname){
    //     const pathnameArray = pathname.split('/')
    //     // const userNameOrder = pathnameArray[2].split('dm').sort()
    //     let channelInfo = {}
    //     console.log('path anme array', pathnameArray);
    //     if(pathnameArray[1]==="dm"){
    //         channelInfo.id = null;
    //         channelInfo.name = pathnameArray[2];
    //         channelInfo.isDM = true;
    //         channelInfo.userOne = pathnameArray[2].split('dm').sort()[0];
    //         channelInfo.userTwo = pathnameArray[2].split('dm').sort()[1];

    //         console.log('pathname ~~~~ channelInfo');
    //     }
    //     if(pathnameArray[1]==='channels'){
    //         channelInfo.id = pathnameArray[2];
    //         channelInfo.name = null;
    //         channelInfo.isDM = false;
    //         channelInfo.userOne = null;
    //         channelInfo.userTwo = null;
    //     }
    //     return channelInfo;
    // }

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