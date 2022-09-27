'use strict';


const player0El = document.querySelector(".player--0")
const player1El = document.querySelector(".player--1")
const score0El = document.getElementById("score--0")
const score1El = document.getElementById("score--1")
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")

const diceEl = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

score0El.textContent = 0
score1El.textContent = 0
diceEl.classList.add("hidden")

let currentScore = 0
let currentPlayer = 0
let playerScore0 = 0
let playerScore1 = 0
let playing = true

function changeActivePlayer() {    
    currentPlayer ? currentPlayer = 0: currentPlayer = 1    
}

function resetTheGame(){
    diceEl.classList.add("hidden")
    playing = false   
    playerScore0 = 0
    playerScore1 = 0
    document.querySelector(`.player--${currentPlayer}`).classList.remove("player--winner")
    document.querySelector(`.player--${currentPlayer}`).classList.add("player--active")    
    setCurrentScore(0)
    switchPlayers()
    document.querySelector(`.player--${currentPlayer}`).classList.remove("player--winner")
    document.querySelector(`.player--${currentPlayer}`).classList.add("player--active") 
    setCurrentScore(0)
    changeScore()
    if(currentPlayer === 1){
        switchPlayers()
    }
    playing = true
}

function generateRandomDiceRoll() {
    return Math.ceil(Math.random()*6)
}

function setCurrentScore(number){
    currentScore = number
    document.getElementById(`current--${currentPlayer}`).textContent = currentScore
}

function switchPlayers(){
    changeActivePlayer()
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

function changeScore(){
    if(!playing){
            score0El.textContent = 0
            score1El.textContent = 0
        }else{
        if(currentPlayer === 0){
        playerScore0 += currentScore
            score0El.textContent = playerScore0
            if(playerScore0 >= 100){
                playing = false
                diceEl.classList.add("hidden")
                document.querySelector(`.player--${currentPlayer}`).classList.add("player--winner")
                document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active")
                console.log(`Winner player${Number(currentPlayer + 1)}!`)
            }else{            
            setCurrentScore(0)
            switchPlayers()
            }
        }else{
            playerScore1 += currentScore
            score1El.textContent = playerScore1
            if(playerScore1 >= 100){
                playing = false
                diceEl.classList.add("hidden")
                document.querySelector(`.player--${currentPlayer}`).classList.add("player--winner")
                document.querySelector(`.player--${currentPlayer}`).classList.remove("player--active")
                console.log(`Winner player${Number(currentPlayer + 1)}!`)
            }else{            
            setCurrentScore(0)
            switchPlayers()
            }
        }
    }
}

//rolling dice
btnRoll.addEventListener("click", () =>{
    if(playing){
        const dice = generateRandomDiceRoll()
        diceEl.classList.remove("hidden")
        diceEl.src = `dice-${dice}.png`

        if(dice !== 1){
            currentScore += dice        
            setCurrentScore(currentScore)
        }else{
            setCurrentScore(0)
            switchPlayers()
        }
    }   
})

btnHold.addEventListener("click", () =>{
    if(playing){
        changeScore()
    }
})

btnNew.addEventListener("click", () => {
    resetTheGame()
})