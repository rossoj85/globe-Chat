import axios from 'axios';


const SET = 'SET_CURRENT_USER'

// ACTIONS 
//take user credentials and return an object whos type is set and the user is equal to the current user
const set = user=> ({type:SET, user})
const logout = ()=>({type:LOGOUT})

// REDUCER 
export default function reducer (currentUser = null, action) {
    switch (action.type) {
  
      case SET:
        return action.user;
  
  
      default:
        return currentUser;
    }
  }

//THUNKED  ACTION CREATORS

const logErr = console.error.bind(console)
//returns a thunk that returns dispatch which returns axios call
export const reduxLogin = credentials =>
    dispatch=>
    axios.put('/api/auth/me', credentials)
    .then(res=>res.data)
    .then(user=>{
        console.log('USER INSIDE REDUX LOGIN',user)
      dispatch(set(user))
      return user
      // .catch(logErr)
    // catching in the Login component(WELCOME) because we want the thunked action creater to return user so that we can force a page
    // change via routerhistory in the Login component
    })

    export const retrieveLoggedInUser = credentials =>
    // console.log('HITTING RETRIEVE USER!!!!!!')
        dispatch =>{
        console.log('HITTING RETRIEVE USER!!!!!!')
        axios.get('/api/auth/me')
        .then(res=>console.log('THE RESPONSE',res.data))
        
        .then(user => {
          console.log('INSIDE RETRIEVE USER USER!!!', user)
          dispatch(set(user))
        })
        .catch(logErr)
        }