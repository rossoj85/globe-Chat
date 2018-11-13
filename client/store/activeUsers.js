import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

// export const INITIALIZE = 'INITIALIZE_USERS';
export const ADD_USER  = 'ADD_USER';
// export const REMOVE = 'REMOVE_USER';
// export const UPDATE     = 'UPDATE_USER';

/* ------------     ACTION CREATORS      ------------------ */

// const init  = authors => ({ type: INITIALIZE, users });
const add = activeUser  => ({ type: ADD_USER, activeUser });
// const remove = id    => ({ type: REMOVE, id });
// const update = author  => ({ type: UPDATE, user });

/*------------      THUNKS      ------------------*/
  export const addToActiveUser = activeUser =>
        // console.log('ADDING A NEW USER', activeUser)
        dispatch =>
        dispatch(add(activeUser))
        

/* ------------          REDUCER         ------------------ */

export default function reducer (activeUsers = [], action) {
    console.log('INSIDE REDUCER')
    switch (action.type) {
    //   case INITIALIZE:
    //     return action.users;
  
      case ADD_USER:
        return [action.activeUser, ...activeUsers];
  
    //   case REMOVE:
    //     return users.filter(user => user.id !== action.id);
  
    //   case UPDATE:
    //     return users.map(user => (
    //       action.user.id === user.id ? action.user : user
    //     ));
  
      default:
        return activeUsers;
    }
  }