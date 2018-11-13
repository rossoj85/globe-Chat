import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import messages from './messages'
import channels from './channels'
import navbar from './navbar'
import author from './author'
import currentUser from './currentUser'
import activeUsers from './activeUsers';


const reducer = combineReducers({messages,channels,navbar,author,currentUser,activeUsers})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store =createStore(reducer,middleware)


export default store
export * from './messages'
export * from './channels'
export * from './navbar'
export * from './author'
export * from './currentUser'
export * from './activeUsers'
