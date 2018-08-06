const Sequelize = require('sequelize');
const db = require('../db');

const images = [
  'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
  'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
//singe image is returning, you must make any changes to field above before attempting a force sync
module.exports = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    // unique: true
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: Sequelize.STRING,
  facebookId: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
    },  
  }
});