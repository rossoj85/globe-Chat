const router = require('express').Router();
const { Channel, Message } = require('../db/models');

module.exports = router

// GET api/channels
router.get('/', function (req, res, next) {
    Channel.findAll()
      .then(channels => res.json(channels))
      .catch(next);
  });
  //going to have a duplicat of this in messages routes
  // GET /api/channels/:channelId/messages
  router.get('/:channelId/messages', function (req, res, next) {
    const channelId = req.params.channelId;
  
    Message.findAll({ where: { channelId } })
      .then(messages => res.json(messages))
      .catch(next);
  });
  //GET A SINGLE CHANNGEL 
  // GET api/channels/:channelId 
  router.get('/:channelId', (req,res,next)=>{
    const channelId = req.params.channelId
    console.log('CHANNEL PARAMS', channelId)

    Channel.findById(channelId)
    .then(channel=>res.json(channel))
    .catch(next)
  })
  //FIND OR CREATE A SINGLE DM CHANNEL BY NAME

  router.post('/dm/:dmChannelName',(req,res,next)=>{
    const dmChannelName = req.params.dmChannelName;
    const isDM = req.body.isDM;
    const userOne = req.body.userOne;
    const userTwo = req.body.userTwo;
    const channel = req.body;

    console.log("@@@@@@@@@INSIDE DM GET ROUTE ! ! ! !")
    console.log("---->CHANNEL FROM BODY", channel)
    Channel.findOrCreate({
      where:{
        name: dmChannelName,
        isDM,
        userOne,
        userTwo
      }
    })
    .then(channel=>console.log(channel));
  })
  // POST /api/channels
  router.post('/', function (req, res, next) {
    Channel.create(req.body)
      .then(channel => res.json(channel))
      .catch(next);
  });
  
  // DELETE /api/channels
  router.delete('/:channelId', function (req, res, next) {
    const id = req.params.channelId;
  
    Channel.destroy({ where: { id } })
      .then(() => res.status(204).end())
      .catch(next);
  });
  