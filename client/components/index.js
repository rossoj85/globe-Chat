// so that we can say
// import { Main } from './components';
// instead of
// import { Main } from './components/Main;
export { default as Main } from './main';
export {default as Sidebar} from './sidebar';
export {default as Navbar} from './navbar/navbar';
export {default as MessagesList} from './messageLists/messagesList';
export {default as ActiveUsersList} from './sidebar/sidebar-activeUsers'
export {default as NewMessageEntry} from './newMessageEntry';
export {default as Message} from './messageLists/message';
export{default as LanguageSelect} from './navbar/navbar-language-select'
export {default as ChannelList} from './sidebar/channelList';
export {default as NewChannelEntry} from './sidebar/newChannelEntry';
export{default as NameEntry} from './navbar/navbar-nameEntry';
export{default as SignUp} from './signup';
export{default as Login} from './login';
export {default as MessageListDMS} from './messageLists/messageListDMS'