const router = require('express').Router();
const {Author} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy;


passport.use(
    new facebookStrategy({
    clientID: '1967045096926581',
    clientSecret: '92887a719258602fc0e48d9196bddcba',
    callbackURL: "/api/auth/facebook/verify",
    profileFields: ['id', 'displayName','first_name','last_name','middle_name','gender', 'email',
    'picture', 'friends', 'likes','hometown','events','tagged_places','location','birthday','posts']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('---', 'in verification callback', profile, '---');
    var info ={
        //these are the fields on our user model
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos ? profile.photos[0].value : undefined
    }
    // console.log('---FRIENDS-------', profile._json.friends.summary)
    // console.log('-------LIKES DATA-----',profile._json.likes.data)
    console.log('------POSTS-----',profile._json.posts.data)
    Author.findOrCreate({
        where: {facebookId: profile.id},
        //if the persons id(which is the same as their gogle id) is not in db, we use 'defaults' to set up thier profile in our app
        defaults: info,
    })
    //all that spread does is flatten an array
    .spread(user=>{
        done(null, user)
    })
    .catch(done)

  }
));

router.get('/', passport.authenticate('facebook',
 { scope: ['email','user_friends','groups_access_member_info','user_birthday','user_events',
 'user_gender', 'user_likes','user_location','user_tagged_places','user_posts','user_location',
 'user_hometown','user_link','user_location'
] }))

router.get('/verify',
  passport.authenticate('facebook', {
    successRedirect: '/channels/1', // or wherever
    failureRedirect: '/' // or wherever
  })
);

module.exports = router