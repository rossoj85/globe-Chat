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
export const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES';
export const GET_SINGLE_CHANNEL_MESSAGES= 'GET_SINGLE_CHANNEL_MESSSAGES';
export const GET_TRANSLATION_OF_ALL_MESSAGES = 'GET_TRANSLATION_OF_ALL_MESSAGES';

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

export const getAllMesagesFromServer =(allMessages)=>({
    type: GET_ALL_MESSAGES,
    allMessages
})

export const getSingleChannelMessages = (singleChannelMessages)=>({
    type: GET_SINGLE_CHANNEL_MESSAGES,
    singleChannelMessages
})
export const translateAllMessages = (allMessagesTranslated)=>({
    type: GET_TRANSLATION_OF_ALL_MESSAGES,
    translatedMessages
})

// THUNKS AND DISPATCH
export function postMessage(messageData){  //we could have also passed in channelId and contents
    console.log("messagedata#$%#$@",messageData)
    // console.log(incomingMessageLanguage)
    // const channelId = messageData.channelId
    // const incomingMessageLanguage = messageData.incomingMessageLanguage
    // console.log("INCOMING MESSAGE FROM THUNK",messageData)
    return function thunk(dispatch, getState){
        axios.post('/api/messages', messageData)
        .then(res=>res.data)
        .then(message=>{
            console.log("Inside Post MEssage THUNK", message)
            const action = gotNewMessageFromServer(message)
            dispatch(action)
            socket.emit('new-message', message)
            dispatch(writeMessage(""))
        })
        .catch(console.err)
    }
}


export function fetchMessages(incomingMessageLanguage){

    return function thunk(dispatch){
        // console.log('I C M L @#FROM INSIDE FETCH MESSAFES THUNK',incomingMessageLanguage)
        axios.get('/api/messages')
        .then(res=>res.data)
        .then(allMessages=>{
            const messagesArrayAndLanguageObj = {incomingMessageLanguage,allMessages}
            // console.log("@#@~~~~FETCH ALL MESSAGES CALLED~~~~~@#@@#")
            // console.log(allMessages)
            axios.post('/api/messages/translateAll',messagesArrayAndLanguageObj)
            .then(res => res.data)
            .then(translatedMessageArray=> {
                // console.log('###TRANS MES###',translatedMessageArray)
                dispatch(getAllMesagesFromServer(translatedMessageArray))
            })
        })
        .catch(console.error)
    }
}

export const fetchSingleChannelMessages = (channelId)=>
        dispatch =>
        axios.get('api/messages/:channelId')
        .then(res => res.data)
        .then(singleChannelMessages =>  singleChannelMessages )
        

export default (state = initialState, action) => {
    //return newState
    switch (action.type){

        case WRITE_MESSAGE:
            return Object.assign({}, state, {newMessageEntry: action.newMessageEntry})

        case GOT_NEW_MESSAGE_FROM_SERVER:
            return Object.assign({}, state, {messageCollection: [...state.messageCollection, action.message]})

        case GET_ALL_MESSAGES:
            return {
                ...state,
                messageCollection: action.allMessages
            }
        case GET_TRANSLATION_OF_ALL_MESSAGES:
            return{
                ...state,
                messageCollection: action.translatedMessages
            }
        default:
            return state;
    }
}


