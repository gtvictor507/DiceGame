/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
***********selecting from the DOM **************
document.querySelector('#current-' + activePlayer).textContent = dice;


second way of writing to a dom without using the text content method

document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '<em>';

reading a value from the dom
var x = document.querySelector('#score-0').textContent;
console.log(x);

*/

//****** DOM MANIPULATION *************************** 

var scores, roundScore, activePlayer, gamePlaying;
//calling the init function
init();


//**** EVENTS AND EVENT HANDLING ROLLING THE DICE *******


//FOR THE ROLL DICE BUTTON

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //showing the image
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. update the roundscore IF the rolled number was NOT a 1
        if (dice !== 1) {
            //add soccer
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {

            //next player
            nextPlayer();

        }
    }
});


// IMPLEMENTING THE HOLD FUNCTIONALITY
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the User Interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // check if the player has won the game

        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'YOU WIN!!!';
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {
            // next player
            nextPlayer();
        }
    }

});


// working with the new game button
document.querySelector('.btn-new').addEventListener('click', init);




//functions

function nextPlayer() {
    // next player using the ternary operator (short form for if)

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggling, adding, removing classes using classlist

    document.querySelector('.player-0-panel').classList.toggle('active');

    document.querySelector('.player-1-panel').classList.toggle('active');

    // removing the dice
    document.querySelector('.dice').style.display = 'none';

}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //using the query selector to change html
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';

    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';

    document.getElementById('current-1').textContent = '0';

    // bringing back the intial values on the pannels

    document.getElementById('name-0').textContent = 'PLAYER 1';

    document.getElementById('name-1').textContent = 'PLAYER 2';

    document.querySelector('.player-0-panel').classList.remove('winner');

    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');

    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
