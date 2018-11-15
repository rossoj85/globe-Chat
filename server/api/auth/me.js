const router = require('express').Router();
const {Author} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const hour = 360000;


    
    router.get ('/',(req,res,next)=>{
        console.log('@#$!$@!#$@!#INSIDE ME.js GET ROUTE', req.authorId)
        //so that login will recognise the passport data that is now stored on seesion
        res.json(req.user) //this is a passport method
        // Author.findById(req.session.authorId)
        // .then(author=>res.json(author))
        // .catch(next)
        // res.send('HEllo')

    })


router.put('/', (req, res, next)=>{
    console.log('HIT PUT TO SESSION!!!', req.session)
    const {email, password, nameOrEmail} = req.body
    // console.log('email',email)
    // console.log('password',password)
    // console.log('nameOrEmail',nameOrEmail)
    // Author.findOne({
    //     where: {email, password}
    // })
    Author.findOne({
        where: {password, 
            $or:[
                {email},
                {email:nameOrEmail},
                {name:nameOrEmail}
            ]
        }
    })
    .then(user=>{
        if(user){
            // console.log(author.id)
            // req.session.authorId = author.id

            // I did not realize this before but passport an sessions wasn't  fully integrated
            // *** the older code is above also had to change author to 'user to stay'
            //consistent with the oAUTh MEthods


            // FOR LATER WHEN WE INTEGRATE PASSPORT
            req.logIn(user,err=>{
                if(err) return next(err)
                res.json(user)
            })

            req.session.cookie.expires = new Date(Date.now()+ hour)
            // console.log(req.sesion)
           
            res.json(user)  //we need some kind of respondse
        }
        else{
            throw new HttpError(401,'cannot find user name/combo')
        }
    })
    .catch(next)
})

router.delete('/',(req,res,next)=>{
    req.logout()
    req.session.destroy();
    res.sendStatus(200)
    // console.log('SESSION BEFORE DESTROY', req.session)
    // we can also use:
    // delete req.session.userId
    console.log('SESSION AFTER DESTROY', req.session)
    
})

module.exports= router