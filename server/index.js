'use strict';
const express = require('express');
const volleyball = require('volleyball');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const PORT = process.env.PORT || 3100;
const server = app.listen(PORT, ()=>console.log(`You Will soon be chatting with people from aroudn the world on Port , ${PORT}`))
const io=require('socket.io')(server)

// handle sockets
require('./socket')(io);

module.exports = app;

db.sync().then(() => console.log('Database is synced'));

app.use(volleyball);

app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));



// module.exports = app;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'))

// 404 middleware
app.use((req, res, next) =>
path.extname(req.path).length > 0 ?
  res.status(404).send('Not found') :
  next()
);

// send index.html
app.use('*', (req, res, next) =>
res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
res.status(err.status || 500).send(err.message || 'Internal server error.')
);

// app.listen(PORT, ()=>console.log('You Will soon be chatting with people from aroudn the world on Port ', 3000))