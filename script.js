'use strict';
//selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//initial conditions
const init=function(){
    scores=[0,0];
    currentScore=0;
    activePlayer=0;
    playing=true;

    score0El.textContent=0;
    score1El.textContent=0;
    current0El.textContent=0;
    current1El.textContent=0;

    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();


//changing  image function
const changeImage = function(dice){    
    document.querySelector('img').src=`dice-${dice}.png`;
}

//switching player
const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    
    currentScore=0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');    
}

// rolling dice functionality
document.querySelector('.btn--roll').
addEventListener('click',function(){
    //if playing is  true
    if(playing){
        // generate random no. between 1 to 6.
        let dice=Math.trunc(Math.random()*6)+1;
        // console.log(dice);
        
        changeImage(dice);
        //checking whether dice has 1 or not as a output.
        if(dice!==1){
            // increasing the current score.
            currentScore+=dice;
            document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        }else{
            switchPlayer();
        }
    }    
});

// hold button functionality
document.querySelector('.btn--hold').addEventListener('click',function(){

    if(playing){
        // updating the score for respective active player
        scores[activePlayer]+=currentScore;

        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];
        // checking the winning condition
        if(scores[activePlayer]>=100){
            playing=false;
            diceEl.classList.add('hidden');
            
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

            
        }else{
            switchPlayer();
        }
    }
});


// new game funtionality
document.querySelector('.btn--new').addEventListener('click',init);


