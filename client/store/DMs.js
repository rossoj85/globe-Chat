import axios from 'axios';
import socket from '../socket';

//there is some overlap with DMs and channels. DM channels are jsut channels, but there is 
//unique wat to psot new DM channels , so for organizartion's sake, it has its won seperate reducer.


const initialState = {
    usersDMChannels: []
}

//consts
export const POST_NEW_DM_CHANNEL ="POST_NEW_DM_CHANNEL";

//actions creator
export const postDMchannel = (channel) =>({type: POST_NEW_DM_CHANNEL,channel});

//thunk
export const postDMchannelToDB = (channel)=>{
    console.log('inside postDMchannelToDB');
    console.log('~~~ channel info', channel);
    return axios.post(`/api/channels/dm/${channel.name}`, channel)
    .then(res =>{
        console.log('apI POST TO DM RES', res.data)
        let DMchannel = res.data[0];
        console.log('~~~~DMchannel', DMchannel);
        return DMchannel;
        })
};

export default(state=initialState, action) =>{
    switch(action.type){
        case POST_NEW_DM_CHANNEL:
        return {
            ...state,
            usersDMChannels
        }
        default:
            return state
    }
};