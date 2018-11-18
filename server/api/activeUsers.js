const router = require('express').Router();
const socketBackend = require('../socket')

module.exports = router

router.get('/',(req,res,err)=>{
    res.send(socketBackend.activeUsers)
})



