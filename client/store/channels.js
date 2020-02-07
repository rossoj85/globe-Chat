import axios from 'axios'
import socket from '../socket';

const initialState = {
    channels: [],
    newChannelEntry:'',
    currentChannel: null
}


export const GET_CHANNELS = "GET_CHANNELS";
export const WRITE_CHANNEL_NAME ="WRITE_CHANNEL_NAME";
export const GET_CHANNEL ="GET_CHANNEL";
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL'


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
export function setCurrent(channel){
    return{
        type: SET_CURRENT_CHANNEL,
        channel
    }
}

//THUNKS 
export function fetchChannels(){
    // console.log("FETCH CHANNELS 1")
    return function thunk (dispatch) {
        axios.get('/api/channels')
        .then(res=>res.data)
        .then(channels=>{
            dispatch(getChannels(channels))
        })
        .then(res=>console.log('1 - CHANNELS FETCHED'))
        .catch(console.err)
    }
}
export function postDMchannel(channel){
    return function thunk(dispatch){
        return axios.post('/api/channels', channel)
        .then(res=>res.data)
        .then(newDMchannel=>{
            console.log('NEW DM CHANNEL', newDMchannel);
            dispatch(getChannel(newDMchannel));
            socket.emit('new-channel', newDMchannel)
            return;
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
export function reduxSetCurrentChannel(channel){

    console.log('Inside reduxSetCurrentChannel ', channel)
    // console.log(`api/channels/${channelId}`)
    if(!channel.isDM) return function thunk(dispatch){dispatch(setCurrent(channel))}
    else {
        return function thunk(dispatch){
            console.log('------>INSIDE reduxSetCurrentChannel THUNK',channel)

            //this is a find or create post. it is necessary because it might be 
            //first time user clicks on specific cahnnel 

            axios.post(`/api/channels/dm/${channel.name}`, channel)
            .then(res =>{
                console.log('apI POST TO DM RES', res.data)
                let DMchannel = res.data[0];
                dispatch(setCurrent(DMchannel))
            })
        }
    }
}

//REDUCER (look into how history is pushed)
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
        case SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.channel
            }

            
        
        default:
            return state;
    }
}
