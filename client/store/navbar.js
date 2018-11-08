import axios from 'axios';


const initialState = {
    incomingMessageLanguage:'en',
    // nameWrite: '',
    // finalName:'',
    userId: null,
}


export const CHANGE_INCOMING_MESSAGE_LANGUAGE = 'CHANGE_INCOMING_MESSAGE_LANGUAGE'
// export const WRITE_NAME = "WRITE_NAME";
// export const SET_NAME_AND_ID= "SET_NAME_AND_ID";


//actions 
export function changeIncomingMessageLanguage(language){
    return {
        type: CHANGE_INCOMING_MESSAGE_LANGUAGE,
        incomingMessageLanguage: language
    }
}

// export function writeName(nameInput){
//     return {
//         type: WRITE_NAME,
//         nameInput
//     }
// }
// export function setNamePlusId(finalName, id){
//     return {
//         type: SET_NAME_AND_ID,
//         finalName,
//         id
//     }
// }



// export function setUserNameAndId(finalName){

//     return function thunk(dispatch){
//         axios.get(`/api/authors/${finalName}`)
//         .then(res=>res.data)
//         .then(user=>{
//             console.log("FROM INSIDE SETUSERID THUNK", user)
//             const finalName= user[0].name
//             const id= user[0].id
//             console.log(id,finalName)
//             const action= setNamePlusId(finalName, id)
//             dispatch(action)
//         })
//     }
// }


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