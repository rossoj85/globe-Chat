import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import messages from './messages'
import channels from './channels'
import navbar from './navbar'


const reducer = combineReducers({messages,channels,navbar})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware, createLogger({collapsed: true})))
const store =createStore(reducer,middleware)


export default store
export * from './messages'
export * from './channels'
export * from './navbar'