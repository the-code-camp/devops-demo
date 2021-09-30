'use strict';

let votes = {};
const http = require('http');
const express = require('express');
const _ = require('lodash');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', function (req, res){
  res.sendFile(__dirname + '/public/admin.html');
});

const port = process.env.PORT || 3000;

const server = http.createServer(app)
                 .listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });

const socketIo = require('socket.io');
const io = socketIo(server);

function countVotes(votes) {
  var voteCount = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
  };
  console.log(votes);
  for (var vote in votes) {
    voteCount[votes[vote]]++;
  }
  return voteCount;
}

var voteCount = {
  A: 0,
  B: 0,
  C: 0,
  D: 0
};

function updateVotes(vote) {
  voteCount[vote]++;
  return voteCount;
}

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('peronalVote', message);
      let voteCount = updateVotes(votes[socket.id]);
      io.emit('voteCount', voteCount);
      io.emit('adminUpdate', _.values(voteCount));
    }
  });

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    socket.emit('voteCount', updateVotes(votes[socket.id]));
    io.sockets.emit('userConnection', io.engine.clientsCount);
  });
});

module.exports = server;
