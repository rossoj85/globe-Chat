const router = require('express').Router();
const {Author} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const hour = 360000;

router.get('/',(res,req,next)=>{
    
    res.send('HITTING THE AUTH/ME ROUTER')
})

router.put('/', (req, res, next)=>{
    const {email, password} = req.body
    Author.findOne({
        where: {email, password}
    })
    .then(author=>{
        if(author){
            req.session.authorId = author.id

            // FOR LATER WHEN WE INTEGRATE PASSPORT
            // req.logIn(author,err=>{
            //     if(err) return next(err)
            //     res.json(author)
            // })


            req.session.cookie.expires = new Date(Date.now()+ hour)
           
            // res.json(author)  //we need some kind of respondse
        }
        else{
            throw new HttpError(401,'cannot find user name/combo')
        }
    })
    .catch(next)
})

router.delete('/',(req,res,next)=>{
    req.logout()
    res.sendStatus(204)
    // console.log('SESSION BEFORE DESTROY', req.session)
    // req.session.destroy()
    // // we can also use:
    // // delete req.session.userId
    // console.log('SESSION AFTER DESTROY', req.session)
 
})

module.exports= router