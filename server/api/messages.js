const router = require('express').Router();
const googleTranslate = require('../../languageTest')
const {Message, Author} = require('../db/models')

module.exports = router

router.get('/',(req,res,next)=>{
    Message()
})



router.post('/translate',(req,res,next)=>{
    // console.log("INSIDE TRANSLATE!")
    const content = req.body.content
    const incomingMessageLanguage = req.body.incomingMessageLanguage
    const id = req.body.id
    const channelId = req.body.channelId
    const author =req.body.author
    console.log(req.body)

    console.log("TRANSLATE INCOMING MESSAGE LANGUAGE",incomingMessageLanguage)
   
    console.log("What route is recieving",content)
        googleTranslate.translate(content, incomingMessageLanguage, function(err,translation) {
        if(err){console.log(err)}
        return new Promise((resolve, reject)=>{
            resolve(translation.translatedText);
            reject(console.err)
        })
          .then(translatedMessage=>res.json({id, content, translatedMessage, channelId, author}))
    })
})


//POST TO DB




router.post('/', (req,res,next)=>{
    const content = req.body.message
    const channelId = req.body.channelId
    console.log("REQ BODY",req.body)
    console.log("THIS IS THE BODY",req.body.name )
   
    Author.findOrCreate({
        where: {
          name: req.body.name || 'Jason'
        }
    })
    
    .spread(author => {
        const message = Message.build({content, channelId});
        console.log("MESSAGE CREATED",message)
        message.setAuthor(author, { save: false });
        return message.save()
          .then(message => {
            message = message.toJSON();
            message.author = author;
            return message;
        
          });
       
    })
      .then(message => {
        res.json(message);
      })
      .catch(next);

})

//STACK CHAT"S POST
// router.post('/', function (req, res, next) {
//     console.log(req.body)
//       // We don't have proper users yet (we'll get there soon, though!).
//       // Instead, we'll findOrCreate an author by name, for simplicity.
//       // Of course, you wouldn't want to do this in a real chat app!
//       Author.findOrCreate({
//         where: {
//           name: req.body.name || 'Cody'
//         }
//       })
//       .spread(author => {
//           console.log(author)
//         const message = Message.build(req.body);
//         message.setAuthor(author, { save: false });
//         return message.save()
//           .then(message => {
//             message = message.toJSON();
//             message.author = author;
//             return message;
//           });
//       })
//       .then(message => {
//         res.json(message);
//       })
//       .catch(next);
    
//     });