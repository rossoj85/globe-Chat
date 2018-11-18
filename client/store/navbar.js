import axios from 'axios';


const initialState = {
    incomingMessageLanguage:'en',
    userId: null,
}


export const CHANGE_INCOMING_MESSAGE_LANGUAGE = 'CHANGE_INCOMING_MESSAGE_LANGUAGE'


//actions 
export function changeIncomingMessageLanguage(language){
    return {
        type: CHANGE_INCOMING_MESSAGE_LANGUAGE,
        incomingMessageLanguage: language
    }
}



export default (state = initialState, action) => {
    //return newState
    switch (action.type){


        case CHANGE_INCOMING_MESSAGE_LANGUAGE:
            
            return Object.assign({},state,{incomingMessageLanguage: action.incomingMessageLanguage})

            // case WRITE_NAME:
            // return Object.assign({}, state, {nameWrite: action.nameInput});

            // case SET_NAME_AND_ID:
            // return Object.assign({},state,{finalName: action.finalName, userId:action.id})

        default:
            return state;
    }
}