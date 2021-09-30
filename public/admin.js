'use strict';
const socket = io();
const aTotal = document.querySelector('.a-total');
const bTotal = document.querySelector('.b-total');
const cTotal = document.querySelector('.c-total');
const dTotal = document.querySelector('.d-total');


socket.on('adminUpdate', function (message) {
  updateChart(message)
});

socket.on('voteCount', function (votes) {
  aTotal.innerText = 'Total A Votes:' + ' ' + votes.A;
  bTotal.innerText = 'Total B Votes:' + ' ' + votes.B;
  cTotal.innerText = 'Total C Votes:' + ' ' + votes.C;
  dTotal.innerText = 'Total D Votes:' + ' ' + votes.D;
});


const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [{
      label: '# of Votes',
      data: [0, 0, 0, 0],
      backgroundColor: [
        '#D46A6A',
        '#89c5c5',
        '#877CB0',
        '#D4C76A'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
        display: false
    }
  }
});

function updateChart(data) {
  chart.data.datasets[0].data = data;
  chart.update();
}

