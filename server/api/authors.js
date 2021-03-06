const router = require('express').Router();
const {Author} = require('../db/models');

module.exports = router

router.get('/', (req, res, next)=> {
    Author.findAll()
    .then(authors=>res.json(authors))
    .catch(next)
})

//NAVBAR SEEMS TO BE USING THIS AS A POST TO PUT THE AUTHOR IN THE DATABASE(BUT ALSO TO FIND)
//HENCE THE GET
router.get('/:userName', (req, res, next)=> {
    console.log('INSIDE AUTHORS GET')
    const userName = req.params.userName
    console.log(userName)
    Author.findOrCreate({
        where: {name: userName}
    })
    .then(user=>res.json(user))
    .catch(next);
})

// router.post('/', (req, res, next) => {
//     console.log(req.body)
//     Author.create(req.body)
//       .then(user => res.status(201).json(user))
//       .catch(next);
//   });

  router.post('/', (req, res, next) => {
    console.log('THE INFO - ',req.body)
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    console.log('CONSTS - ',name,email,password)

    Author.findOrCreate({
        where:{name,password,
            $or:[{email,password}]
        }
    })
      .then(user => {
          console.log('hello')
          console.log(user)
          res.status(201).json(user)
        })
      .catch(next);
  });