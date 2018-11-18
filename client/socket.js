import io from 'socket.io-client';
import store, {gotNewMessageFromServer, getChannel, fetchActiveUsers} from './store';
import axios from 'axios';
import {connect} from 'react-redux'

const socket = io(window.location.origin);
//import our state language pref


socket.on('connect', (socket) => {
  console.log('I am now connected to the server!');
  const currentUser = store.getState().currentUser
  console.log(currentUser)
});

socket.on('new-message', message=>{
  const incomingMessageLanguage = store.getState().navbar.incomingMessageLanguage
  console.log("INCOMING MESSAGE LANGUAGE",incomingMessageLanguage)
  console.log("SOCKET MESSAGE", message)

  message.incomingMessageLanguage=incomingMessageLanguage
  console.log("MESSAGE AFTER LANGUAGE", message)

  axios.post('/api/messages/translate',message)
  .then(res=>res.data)
  .then(translatedMessage=> {
    console.log("TRANSLATED MESSAGE",translatedMessage)
    const action = gotNewMessageFromServer(translatedMessage)
    store.dispatch(action)
  })
})

socket.on('new-channel', channel=>{
  store.dispatch(getChannel(channel));
})

socket.on('new-user', (user, sockID, activeUsers)=>{
  // user.sockID = sockID
  console.log( 'WE HAVE A NEW USER!!!', user)
  console.log('ARRaY of ConNeCtIoNs',activeUsers)
  store.dispatch(fetchActiveUsers(activeUsers))
})
socket.on('disconnect', user =>{
  console.log(`${user} has disconnected`)
})


const mapState = (state)=>{
  return {
    incomingMessageLanguage: state.navbar.incomingMessageLanguage
  }
}
export default socket;


