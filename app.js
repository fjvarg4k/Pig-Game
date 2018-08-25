/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dies as many times as they wish. Each result gets added to their ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, gamePlaying, previousRollOne, previousRollTwo, askScore;

init();

// document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';
// var x = document.querySelector('#score-0').textContent;


document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOMOne = document.querySelector('.dice');
    diceDOMOne.style.display = 'block';
    diceDOMOne.src = 'dice-' + diceOne + '.png';

    var diceDOMTwo = document.querySelector('.dice2');
    diceDOMTwo.style.display = 'block';
    diceDOMTwo.src = 'dice-' + diceTwo + '.png';

    // 3. Update the round score if the rolled number was not a 1
    //    or if the previous roll and the current roll were both 6
    if (diceOne !== 1 && diceTwo !== 1) {
      if ((previousRollOne === 6 && diceOne === 6) || (previousRollOne === 6 && diceTwo === 6) || (previousRollTwo === 6 && diceOne === 6) || (previousRollTwo === 6 && diceTwo === 6)) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      } else {
        previousRollOne = diceOne;
        previousRollTwo = diceTwo;
        // Add score
        roundScore += (diceOne + diceTwo);
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      }
    } else {
      // Next player
      nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= askScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
})


function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  previousRollOne = 0;
  previousRollTwo = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  previousRollOne = 0;
  previousRollTwo = 0;
  askScore = parseInt(prompt("Please enter the winning score that you would like to play to: "))

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
