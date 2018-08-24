const router = require('express').Router();
const {Author} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy


passport.use(
    new googleStrategy({
        clientID: '1069598695675-6604b1ijtcjn8n9uta05f10lr6o8lnrc.apps.googleusercontent.com',
        clientSecret: 'HV7X8doIHCj3Tal1ttu7xa0V',
        callbackURL: '/api/auth/google/verify'
        //REMBER THAT THE CALLBACK URL MUST BE DEFINED ON THE GOOGLE CLOUD PLATFORM!!!!
    },
        function(token, refreshToken,profile,done){
            //verificatino callback:
            //recieve normalized profile data from provider(e.g. Google)
            //use it for our own purposes
                //find or create a user in our own database
            //call done to tell passport here is the user to log in as'
            // console.log('---------------USER IN GOOGLE', User)
            console.log('---', 'in verification callback', profile, '---');
            var info ={
                //these are the fields on our user model
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos ? profile.photos[0].value : undefined
            }
            Author.findOrCreate({
                where: {googleId: profile.id},
                //if the persons id(which is the same as their gogle id) is not in db, we use 'defaults' to set up thier profile in our app
                defaults: info,
            })
            //all that spread does is flatten an array
            .spread(user=>{
                done(null, user)
            })
            .catch(done)
        })
)




//Google authenticationa nd login
router.get('/', passport.authenticate('google', { scope: 'email' }))

router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

module.exports= router