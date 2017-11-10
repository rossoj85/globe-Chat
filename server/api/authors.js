const router = require('express').Router();
const {Author} = require('../db/models');

module.exports = router

router.get('/', (req, res, next)=> {
    Author.findAll()
    .then(authors=>res.json(authors))
    .catch(next)
})

router.get('/:userName', (req, res, next)=> {
    const userName = req.params.userName

    Author.findOrCreate({
        where: {name: userName}
    })
    .then(user=>res.json(user))
    .catch(next);
})