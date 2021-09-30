'use strict';
const socket = io();
const connectionCount = document.getElementById('connection-count');
const voteButton = document.querySelector('#button-vote');
const radios = document.querySelectorAll("input[type='radio']");
const personalVote = document.querySelector('.vote');
const voteContainer = document.getElementById('personal-vote');

socket.on('usersConnected', function (count) {
  connectionCount.innerText = 'Connected Users: ' + count;
  let hasVoted = sessionStorage.getItem('hasVoted');
  let feedbackEnabled = sessionStorage.getItem('feedbackEnabled');
  if(feedbackEnabled && feedbackEnabled === 'true') {
    let iframeExists = document.querySelector("#formFrame");
    if(!iframeExists) {
      showFeedbackForm();
    }
  } else if(hasVoted) {
    thanks();
  }
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
  voteContainer.style.display = 'block';
  personalVote.innerText = ownVote;
  thanks();
});

socket.on('showFeedbackForm', function () {
  showFeedbackForm();
});

function thanks() {
  sessionStorage.setItem('hasVoted', true);
  const quizOptions = document.querySelector('#quiz-options');
  quizOptions.innerHTML = '\
      <div class="h-100 p-5 bg-light border rounded-3" style="margin: 15px"> \
        <h2 style="text-align: center">Thank you</h2> \
        <p>Your vote is going to make a difference</p> \
      </div>';
}

function showFeedbackForm() {
  const quizOptions = document.querySelector('#quiz-options');
  const question = document.querySelector('#question');
  const personalVote = document.querySelector('#personal-vote');
  const connectionCount = document.querySelector('#connection-count');
  sessionStorage.setItem('feedbackEnabled', true);

  if(question) {
    question.remove();
  }
  if(personalVote) {
    personalVote.remove();
  }
  if(connectionCount) {
    connectionCount.remove();
  }

  quizOptions.innerHTML = '<iframe\
    src="https://docs.google.com/forms/d/e/1FAIpQLScEUAY-v6MF9EE4V9qRlJt43f-GKB40Hj3UbmzbZXCyNcwehQ/viewform?embedded=true"\
    width="360" height="2000" frameBorder="0" marginHeight="0" marginWidth="0" id="formFrame">Loading…</iframe>';
}