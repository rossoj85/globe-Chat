const Message = require('../db/models/message');
const Channel = require('../db/models/channel');



module.exports = io => {
  let activeUsers=[]
  let quickLookup ={}
  io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('new-channel', channel => {
      socket.broadcast.emit('new-channel', channel);
    });


    socket.on('new-user', (user) =>{

      if (!quickLookup[user.id]){
            quickLookup[user.id] = socket.id

            user.sockId=socket.id
            activeUsers.push(user)
      }
      else{
          for(let activeUser of activeUsers)
            if(activeUser.id === user.id){
              activeUser.sockId = socket.id
              quickLookup[user.id]=socket.id
              break;
            }
      }
      console.log(quickLookup)
      socket.broadcast.emit('new-user', user, socket.id, activeUsers)
      // const sockID = socket.id
      // user.sockID = sockID
      // activeUsers.push(user)
      // console.log('NEW USER SOCKET ID~~~~~~', sockID)
      // socket.emit('new-user', user, sockID, activeUsers)
    })
    socket.on('disconnect',(user)=>{
      console.log('DISCONNECT IN THE BACK END ', user)
    })
  });

};