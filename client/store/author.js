import axios from 'axios';

/* -----------------    ACTION TYPES    ------------------ */

export const INITIALIZE = 'INITIALIZE_USERS';
export const CREATE     = 'CREATE_USER';
export const REMOVE = 'REMOVE_USER';
export const UPDATE     = 'UPDATE_USER';

/* ------------     ACTION CREATORS      ------------------ */

const init  = authors => ({ type: INITIALIZE, users });
const create = user  => ({ type: CREATE, user });
const remove = id    => ({ type: REMOVE, id });
const update = author  => ({ type: UPDATE, user });

/* ------------          REDUCER         ------------------ */

export default function reducer (users = [], action) {
    switch (action.type) {
  
      case INITIALIZE:
        return action.users;
  
      case CREATE:
        return [action.user, ...users];
  
      case REMOVE:
        return users.filter(user => user.id !== action.id);
  
      case UPDATE:
        return users.map(user => (
          action.user.id === user.id ? action.user : user
        ));
  
      default:
        return users;
    }
  }

  export const addUser = author => dispatch => 
  axios.post('/api/authors', author)
        .then(res=>res.data)
        .then(createdUser => {
        //  dispatch(create(createdUser))
         return createdUser
        });
      //  .catch(err => console.error(`Creating user: ${user} unsuccesful`, err));
      //we will catch for errors in the signup component
      // WE CANNOT BRACKET OUT THE FUNCTION HERE
  // export const addToActiveUser = user =>
  //       dispatch =>
  //       dispatch(create(user))

