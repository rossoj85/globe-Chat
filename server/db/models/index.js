const Message = require('./message');
const Channel = require('./channel');
const Author = require('./author');

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true
});

Channel.belongsToMany(Author,{as:'DM_Channel', through: 'DM_Channels', foreignKey:'DM_Channel_ID'})
Author.belongsToMany(Channel,{as: 'DmUser', through: 'DM_Channels', foreignKey: 'DMUser'})

Author.hasMany(Message);

Message.belongsTo(Channel);
Message.belongsTo(Author);

module.exports = {
  Channel,
  Message,
  Author
};
