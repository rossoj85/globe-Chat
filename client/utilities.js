import store from './store'



export const constructChannelInfoFromPath = ()=>{
    const pathname = window.location.pathname;
    const pathnameArray = pathname.split('/')
    const channelName = pathnameArray[2]
    const foundMatchedChannel = store.getState().channels.channels.filter(channel =>
        channel.name ===channelName)[0]
    let channelInfo = {}
    
    console.log('path name array', pathnameArray);
    if(pathnameArray[1]==="dm"){
        channelInfo.id = foundMatchedChannel? foundMatchedChannel.id :null;
        channelInfo.name = channelName;
        channelInfo.isDM = true;
        channelInfo.userOne = pathnameArray[2].split('dm').sort()[0];
        channelInfo.userTwo = pathnameArray[2].split('dm').sort()[1];

        console.log('pathname ~~~~ channelInfo');
    }
    if(pathnameArray[1]==='channels'){
        channelInfo.id = pathnameArray[2];
        channelInfo.name = null;
        channelInfo.isDM = false;
        channelInfo.userOne = null;
        channelInfo.userTwo = null;
    }
    return channelInfo;
}


