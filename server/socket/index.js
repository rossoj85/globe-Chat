const Message = require('../db/models/message');
const Channel = require('../db/models/channel');

module.exports = io => {
  let activeUsers=[]
  
  io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('new-message', message => {
      socket.broadcast.emit('new-message', message);
    });

    socket.on('new-channel', channel => {
      socket.broadcast.emit('new-channel', channel);
    });
    socket.on('new-user', (user) =>{
      const sockID = socket.id
      user.sockID = sockID
      activeUsers.push(user)
      console.log('NEW USER SOCKET ID~~~~~~', sockID)

      socket.emit('new-user', user, sockID, activeUsers)
    })

  });

};