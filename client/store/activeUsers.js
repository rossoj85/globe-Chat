import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

// export const INITIALIZE = 'INITIALIZE_USERS';
export const REPLACE_ACTIVE_USER_ARRAY = 'REPLACE_ACTIVE_USER_ARRAY';
// export const REMOVE = 'REMOVE_USER';
// export const UPDATE     = 'UPDATE_USER';

/* ------------     ACTION CREATORS      ------------------ */

// const init  = authors => ({ type: INITIALIZE, users });
const getActiveUsers = newActiveUserArray  => ({ type: REPLACE_ACTIVE_USER_ARRAY, newActiveUserArray });
// const remove = id    => ({ type: REMOVE, id });
// const update = author  => ({ type: UPDATE, user });

/*------------      THUNKS      ------------------*/
  export const fetchActiveUsers = newActiveUserArray =>
        // console.log('ADDING A NEW USER', activeUser)
        dispatch =>
        dispatch(getActiveUsers(newActiveUserArray))
        

/* ------------          REDUCER         ------------------ */

export default function reducer (activeUsers = [], action) {
    console.log('INSIDE REDUCER')
    switch (action.type) {
    //   case INITIALIZE:
    //     return action.users;
  
      case REPLACE_ACTIVE_USER_ARRAY:
        return action.newActiveUserArray;
  
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