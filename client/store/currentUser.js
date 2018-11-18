import axios from 'axios';
import socket from '../socket';


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
//REDUX LOGIN IS FOR THE APPS BUILT IN LOGIN? LOGOUT W?SESSIONS
//RETRIEVE LOGGED IN USER IS USED FOR OAUTH STRATEGIES
const logErr = console.error.bind(console)
//returns a thunk that returns dispatch which returns axios call
export const reduxLogin = credentials =>
    dispatch=>
    axios.put('/api/auth/me', credentials)
    .then(res=>res.data)
    .then(user=>{
        console.log('!!!!!!!!!!!!!!!!!!!!!!  USER INSIDE REDUX LOGIN',user)
      dispatch(set(user))
      socket.emit('new-user',user)
      return user
      // .catch(logErr)
    // catching in the Login component(WELCOME) because we want the thunked action creater to return user so that we can force a page
    // change via routerhistory in the Login component
    })

    export const retrieveLoggedInUser = credentials =>
    // console.log('HITTING RETRIEVE USER!!!!!!')
        dispatch =>{
        console.log('HITTING RETRIEVE USER!!!!!!', credentials)
        axios.get('/api/auth/me')
        .then(res=>res.data)
        
        .then(user => {
          console.log('INSIDE RETRIEVE USER USER!!!', user)
          console.log(user.length)
          dispatch(set(user))
          if(user) socket.emit('new-user',user)
        })
        .catch(logErr)
        }

    export const reduxLogout = (currentUser)=> 
          dispatch=>{
            console.log('HIT LOGOUT!!!!@#$!#$@#!%@!%@#%@#%@!#$')
            axios.delete('/api/auth/me')
            dispatch(set(null))
            socket.emit('logout', currentUser)
          }
         
        