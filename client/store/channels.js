import axios from 'axios'
import socket from '../socket';

const initialState = {
    channels: [],
    newChannelEntry:'',
    currentChannelId:''
}


export const GET_CHANNELS = "GET_CHANNELS";
export const WRITE_CHANNEL_NAME ="WRITE_CHANNEL_NAME";
export const GET_CHANNEL ="GET_CHANNEL";



//ACTIONS
export function getChannels(channels){
    return {
        type: GET_CHANNELS,
        channels
    }
}

export function writeChannelName(channelName){
    return{
        type: WRITE_CHANNEL_NAME,
        newChannelEntry: channelName
    }
}


export function getChannel (channel){
    return {
        type: GET_CHANNEL,
        channel
    }
}

//THUNKS 
export function fetchChannels(){
    // console.log("FETCH RUNNING")
    return function thunk (dispatch) {
        axios.get('/api/channels')
        .then(res=>res.data)
        .then(channels=>{
            dispatch(getChannels(channels))
        })
    }
}

export function postChannel(channel, history){
    return function thunk(dispatch){
        return axios.post('/api/channels', channel)
        .then(res=>res.data)
        .then(newChannel=>{
            dispatch(getChannel(newChannel));
            socket.emit('new-channel',newChannel)
            history.push(`/channels/${newChannel.id}`)
        });
    }
}

//REDUCER
export default(state = initialState, action)=>{
    //return newState
    switch(action.type){
        case WRITE_CHANNEL_NAME:
           return Object.assign({}, state, {newChannelEntry: action.newChannelEntry})
        
           case GET_CHANNEL:
           return {
               ...state,
               channels: [...state.channels, action.channel]
           }
        
        case GET_CHANNELS:
        //    console.log("ACTION.CHANNELS",action.channels)
            return {
                ...state,
                channels: action.channels
            }
        
        default:
            return state;
    }
}