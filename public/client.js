'use strict';
const socket = io();
const connectionCount = document.getElementById('connection-count');
const voteButton = document.querySelector('#button-vote');
const radios = document.querySelectorAll("input[type='radio']");
const personalVote = document.querySelector('.vote');
const voteContainer = document.getElementById('personal-vote');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
});

for (var i = 0; i < radios.length; i++) {
  radios[i].addEventListener('click', function () {
    document.querySelector("#button-vote").disabled = false;
  });
}

voteButton.addEventListener('click', function () {
  var value = document.querySelector('input[name="listGroupCheckableRadios"]:checked').value;
  socket.send('voteCast', value);
});


socket.on('peronalVote', function (ownVote) {
  console.log("own vote:", ownVote);
  voteContainer.style.display = 'block';
  personalVote.innerText = ownVote;
});

function showVote() {
  // for (var i = 0; i < buttons.length; i++) {
    // buttons[i].addEventListener('click', function () {
    //   voteContainer.style.display = 'block';
    // });
  // }
}

showVote();
