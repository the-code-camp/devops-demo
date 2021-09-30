'use strict';
const socket = io();

const showFeedback = document.querySelector("#showFeedback");

showFeedback.addEventListener("click", function() {
  socket.send('showFeedback', 'showFeedback');
});

