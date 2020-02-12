const Sequelize = require('sequelize');
const db = require('../db');

const images = [
  'https://designerdoginfo.files.wordpress.com/https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ9_argj1bFuRNyVvbNqsXerZoA65sPBzoAu5O30ZBQKT2MwIYP/01/puggle-puppy-4.jpg?w=584',
  'http://images.shape.mdpcdn.com/https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.famousbirthdays.com%2Fthumbnails%2Feinstein-albert-large.jpg&f=1&nofb=1/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.independent.co.uk%2Fs3fs-public%2Fthumbnails%2Fimage%2F2010%2F01%2F25%2F15%2F304683.bin&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ff0.pngfuel.com%2Fpng%2F358%2F726%2Fpurple-and-yellow-heart-illustration-alien-extraterrestrial-life-graphy-alien-png-clip-art-thumbnail.png&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Ff%2Ff9%2FSikh_wearing_turban.jpg%2F220px-Sikh_wearing_turban.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fstariraymagazine.com%2Fwp-content%2Fuploads%2F2018%2F08%2FSarah-G-Miss-Granny-195x185.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fbruceleecollection.com%2Fshopsite_sc%2Fstore%2Fhtml%2Fmedia%2FETDtied4x6.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flastfm-img2.akamaized.net%2Fi%2Fu%2Favatar170s%2Fea2e65e2465a4a00bbb9f8ab35978292.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.images.express.co.uk%2Fimg%2Fdynamic%2F36%2F590x%2Fsecondary%2FSamuel-L-Jackson-actor-858942.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs3.amazonaws.com%2Fhiphopdx-production%2F2016%2F08%2FAction-Bronson-El-Gran-Combo-150x150.jpg&f=1&nofb=1',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.internationallovescout.com%2Fwp-content%2Fuploads%2F2018%2F06%2Fcute-and-sweet-ivory-coast-girl.jpg&f=1&nofb=1'
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
    // allowNull: false,
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