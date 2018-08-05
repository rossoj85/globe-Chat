import {createStore, applyMiddleware} from 'redux';
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from '../socket'

const initialState = {
    messageCollection: [],
    newMessageEntry: '',
}

export const WRITE_MESSAGE = 'WRITE_MESSAGE';
export  const GOT_NEW_MESSAGE_FROM_SERVER ='GOT_NEW_MESSAGE_FROM_SERVER';
export const GET_MESSAGES = 'GET_MESSAGES'

export function writeMessage (inputContent){
    return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
    }
}

export function gotNewMessageFromServer(message){
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        message: message
    }
}
export function getAllMesagesFromServer(allMessages){
        return {
            type: GET_MESSAGES,
            allMessages
        }
}

// THUNKS AND DISPATCH
export function postMessage(messageData){  //we could have also passed in channelId and contents
    // console.log("messagedata#$%#$@",messageData)
    // console.log(incomingMessageLanguage)
    // const channelId = messageData.channelId
    // const incomingMessageLanguage = messageData.incomingMessageLanguage
    // console.log("INCOMING MESSAGE FROM THUNK",messageData)
    return function thunk(dispatch, getState){
        axios.post('/api/messages', messageData)
        .then(res=>res.data)
        .then(message=>{
            // console.log("Inside Post MEssage THUNK", message)
            const action = gotNewMessageFromServer(message)
            dispatch(action)
            socket.emit('new-message', message)
            dispatch(writeMessage(""))
        })
    }
}

// export const retrieveAllMessages = ()=>
//     console.log('HIT RETRIEVE ALL MESSAFES!!')
//     dispatch=>
//         axios.get('/api/messages')
//         .then(res=>console.log('RESSSSS',res.data))
//         // .then(allMessages=>console.log(allMessages))
//         // // .then(allMessages=>{
//         // //     console.log('ALL MESSAGES------->',allMessages)
//         // //     const action=getAllMesagesFromServer(allMessages)
//         // //     dispatch(action)
//         // // })
//         // .catch(logErr)
export function fetchMessages(){
    console.log('HIT FETCH MESSAGES')
    return function thunk(dispatch){
        axios.get('/api/messages')
        .then(res=>res.data)
        .then(allMessages=>{
            console.log(allMessages)
            dispatch(getAllMesagesFromServer(allMessages))
        })
    }
}

export default (state = initialState, action) => {
    //return newState
    switch (action.type){

        case WRITE_MESSAGE:
            return Object.assign({}, state, {newMessageEntry: action.newMessageEntry})

        case GOT_NEW_MESSAGE_FROM_SERVER:
            return Object.assign({}, state, {messageCollection: [...state.messageCollection, action.message]})

        case GET_MESSAGES:
            return {
                ...state,
                messageCollection: [...state.messageCollection, action.allMessages]
            }
        default:
            return state;
    }
}




// export function postMessage(messageData){  //we could have also passed in channelId and contents
//     // console.log("messagedata#$%#$@",messageData)
//     // console.log(incomingMessageLanguage)
//     const channelId = messageData.channelId
//     const incomingMessageLanguage = messageData.incomingMessageLanguage
//     console.log("INCOMING MESSAGE FROM THUNK",messageData)

//     return function thunk(dispatch, getState){
//         axios.post('/api/messages', messageData)
//         .then(res=>res.data)
//         .then(message=>{
//             message.incomingMessageLanguage=incomingMessageLanguage
//             message.channelId=channelId
//             console.log("BEFORE TRANSLATE POST",message)
//              return axios.post('/api/messages/translate',message, incomingMessageLanguage)
        
//         })
//         .then(res=>res.data)
//         .then(bothMessages=>{
//             console.log("DATA FROM BOTH MESSAGES", bothMessages)
//              const action = gotNewMessageFromServer(bothMessages)
//              dispatch(action)
//              dispatch(writeMessage(""))
//         })     
//     }
// }





