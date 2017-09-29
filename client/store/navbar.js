import axios from 'axios';


const initialState = {
    incomingMessageLanguage:'en',
    name: '',
}


export const CHANGE_INCOMING_MESSAGE_LANGUAGE = 'CHANGE_INCOMING_MESSAGE_LANGUAGE'
export const WRITE_NAME = "WRITE_NAME";



//actions 
export function changeIncomingMessageLanguage(language){
    return {
        type: CHANGE_INCOMING_MESSAGE_LANGUAGE,
        incomingMessageLanguage: language
    }
}

export function writeName(nameInput){
    return {
        type: WRITE_NAME,
        nameInput
    }
}


//thunks 
export function setLanguage(language){
    
  return function  (dispatch){
      const action = changeIncomingMessageLanguage(language)
      dispatch(action)
  }
}


export default (state = initialState, action) => {
    //return newState
    switch (action.type){


        case CHANGE_INCOMING_MESSAGE_LANGUAGE:
            
            return Object.assign({},state,{incomingMessageLanguage: action.incomingMessageLanguage})

            case WRITE_NAME:
            return Object.assign({}, state, {name: action.nameInput});

        default:
            return state;
    }
}