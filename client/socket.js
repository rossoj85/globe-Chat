import io from 'socket.io-client';
import store, {gotNewMessageFromServer, getChannel} from './store';
import axios from 'axios';
import {connect} from 'react-redux'

const socket = io(window.location.origin);
//import our state language pref

socket.on('connect', () => {
  console.log('I am now connected to the server!');
  console.log(store);
  
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

const mapState = (state)=>{
  return {
    incomingMessageLanguage: state.navbar.incomingMessageLanguage
  }
}
export default socket;

