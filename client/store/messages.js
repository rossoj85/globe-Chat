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


//action creators

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
        axios.get('/api/messages')
        .then(res=>res.data)
        .then(allMessages=>{
            const messagesArrayAndLanguageObj = {incomingMessageLanguage,allMessages}

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

export function fetchSingleChannelMessages(channelId){
        console.log('fetch single channel messages called -- channelid', channelId);
        return function thunk(dispatch){
            console.log('inside dispatch');
            axios.get(`/api/messages/${channelId}`)
            .then(res => res.data)
            .then(singleChannelMessages => {
                console.log('SINGLE CHANNEL MESSAGES INSIDE THUNK', singleChannelMessages)
                dispatch(getSingleChannelMessages(singleChannelMessages))
            })
            .catch(console.err)
        }

}
        

export default (state = initialState, action) => {
    //return newState
    // let cumMessageCollection = null;
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
        case GET_SINGLE_CHANNEL_MESSAGES:
             let cumMessageCollection = state.messageCollection.concat(action.singleChannelMessages)
            return {
                ...state,
                messageCollection: cumMessageCollection
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


