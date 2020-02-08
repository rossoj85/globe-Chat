


export const constructChannelInfoFromPath = (pathname)=>{
    const pathnameArray = pathname.split('/')
    // const userNameOrder = pathnameArray[2].split('dm').sort()
    let channelInfo = {}
    console.log('path anme array', pathnameArray);
    if(pathnameArray[1]==="dm"){
        channelInfo.id = null;
        channelInfo.name = pathnameArray[2];
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


