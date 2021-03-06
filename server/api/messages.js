const router = require('express').Router();
// const googleTranslate = require('../../languageTest')
const {Message, Author} = require('../db/models')
const Bluebird = require('bluebird')
const googleTranslate = require('../../languageTest')
module.exports = router

router.get('/',(req,res,next)=>{
    console.log('@$#!@!#$@#!$@#!$@!#$#!2HIT MESSAGES ROUTE$@#@#!$@!#$!@#$@!#$@#$@!#')
    Message.findAll()
    .then(allMessages=>res.json(allMessages))
    .catch(next)
})
router.get('/:channelId',(req,res,next)=>{
    console.log('HIT GET MESSAGE FROM CHANNEL')
    const channelId = req.params.channelId
    console.log(channelId)
    Message.findAll({ where: { channelId } })
    .then(messages => res.json(messages))
    .catch(next);
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
          .then(translation =>res.json({id, content, translation , channelId, author}))
    })
})
router.post('/translateAll',(req,res,next)=>{
    const messageArrayAndLanguageObj = req.body
    const incomingMessageLanguage = messageArrayAndLanguageObj.incomingMessageLanguage
    const messageArray = messageArrayAndLanguageObj.allMessages
    console.log("------BOOOOOOOMMMMM-------")
    // console.log(incomingMessageLanguage)
    // console.log(messageArray)



    function promisedTranslation(message){
        console.log("SINGLE MESSAGE~~~`", message)
        console.log("TRANSLATION KEY---->",googleTranslate)
        return  new Promise((resolve,reject)=>{
            return googleTranslate.translate(message.content, incomingMessageLanguage, (err, translation)=>{
                console.log("messaage.content", message.content)
                console.log("TRANSLAITON~~~", translation)
                if(err !==null) reject(err)
                else resolve(translation)
            })
        })
    }
    Bluebird.map(messageArray,(message)=>{
        return promisedTranslation(message)
        .then(translation=>{
            console.log("MESSAGE",message)
            console.log("TRANSLATED TEXT",translation.translatedText)
            message.translation=translation.translatedText
            // console.log(message)
        })
    }).then(resInfo=>{
        console.log('D O N E')
        // console.log(messageArray)
        console.log('- - - - - - - ')
        // console.log(messageArray)
        res.send(messageArray)
    })
    .catch(next)
})


//POST TO DB
router.post('/', (req,res,next)=>{
    console.log('INSIDE POST MESSAGE!!!!!')
    const content = req.body.message;
    const channelId = req.body.channelId;
    const isDM = req.body.isDM;
    console.log("REQ BODY",req.body)
    // console.log("THIS IS THE BODY",req.body.name )
   
    Author.findAll({
        where: {
          id: req.body.authorId 
        }
    })
    
    .spread(author => {
        console.log('INSDIE THE AUHTOER SPREAD');
        const message = Message.build({content, channelId});
        // console.log("MESSAGE CREATED",message)
        message.setAuthor(author, { save: false });
        return message.save()
          .then(message => {
            message = message.toJSON();
            message.author = author;
            return message;
          });
       
    })
      .then(message => {
          console.log('MESSAGE:', message)
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