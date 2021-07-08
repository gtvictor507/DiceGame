//****** DOM MANIPULATION *************************** 

var scores, roundScore, activePlayer, gamePlaying;
//calling the init function
init();

var lastDice;


//**** EVENTS AND EVENT HANDLING ROLLING THE DICE *******


//FOR THE ROLL DICE BUTTON

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. Random number

        var dice1 = Math.floor(Math.random() * 6) + 1;

        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';

        document.getElementById('dice-2').style.display = 'block';

        //showing the image
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. update the roundscore IF the rolled number was NOT a 1 or two six in a row

        if (dice1 !== 1 && dice2 !== 1) {
            //add soccer
            roundScore += dice1 + dice2;
            
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {

            //next player
            nextPlayer();

        }



        /*        

                if (dice === 6 && lastDice === 6) {

                    scores[activePlayer] = 0;

                    document.querySelector('#score-' + activePlayer).textContent = '0';

                    nextPlayer();

                } else if (dice !== 1) {
                    //add soccer
                    roundScore += dice;
                    document.querySelector('#current-' + activePlayer).textContent = roundScore;
                } else {

                    //next player
                    nextPlayer();

                }

                lastDice = dice;
         */


    }
});


// IMPLEMENTING THE HOLD FUNCTIONALITY
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // update the User Interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Get the input set by the user
        var winningScore, input;

        input = document.querySelector('.final-score').value;

        // undefined ,0, null, "" are coerced to false
        // others are coerced to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // check if the player has won the game

        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

            //            document.getElementById('dice-1').style.display = 'none';
            //            document.getElementById('dice-2').style.display = 'none';
            hideDice();


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
    //    document.getElementById('dice-1').style.display = 'none';
    //    document.getElementById('dice-2').style.display = 'none';
    hideDice();

}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //using the query selector to change html
    //    document.getElementById('dice-1').style.display = 'none';
    //    document.getElementById('dice-2').style.display = 'none';
    hideDice();

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

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';

    document.getElementById('dice-2').style.display = 'none';
}
