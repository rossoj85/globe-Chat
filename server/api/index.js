const router = require('express').Router();
module.exports = router;

//look at require('api') in index if you are not sure where these are catching;
router.use('/messages', require('./messages'));
router.use('/channels', require('./channels'));
router.use('/authors', require('./authors'));
router.use('/auth',require('./auth'));
router.use((req, res, next) => {
  res.status(404).send('Not found');
});