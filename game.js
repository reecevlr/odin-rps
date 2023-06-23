// Init Variables
let computerWins = 0;
let playerWins = 0;
let playerSelection;

const buttons = document.querySelectorAll('button');
const compScore = document.querySelector('#compScore');
const playerScore = document.querySelector('#playerScore');
const announcer = document.querySelector('.announcer');

// Winner Announcement
const popup = document.querySelector('#popup-winner');
const heading = document.querySelector('#popup-header');

// Listeners
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

buttons.forEach(btn => {
    btn.addEventListener('click', playRound)
});

// Functions
function handleClick(e) {
    playerSelection = e.target.textContent.toLowerCase();
}

function getComputerSelection() {
    let computerSelection = Math.floor(Math.random() * 3);
    // console.log(computerSelection);

    switch (computerSelection) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

function playRound() {
    let computerSelection = getComputerSelection();

    console.log(playerSelection);
    console.log(computerSelection);

    if (playerSelection === computerSelection) {
        return game('draw');
    }

    // Player win conditions
    if (playerSelection === 'rock' && computerSelection === 'scissors' || 
        playerSelection === 'paper' && computerSelection === 'rock' || 
        playerSelection === 'scissors' && computerSelection === 'paper'
    ) {
        playerWins++;
        return game('player');
    }

    // Computer win conditions
    if (computerSelection === 'rock' && playerSelection === 'scissors' || 
        computerSelection === 'paper' && playerSelection === 'rock' || 
        computerSelection === 'scissors' && playerSelection === 'paper'
    ) {
        computerWins++;
        return game('computer');
    }
}

function game(roundWinner) {
    let gameWinner; 
    // Verify <5 wins
    if (playerWins === 5 || computerWins === 5) {
        // Disable buttons
        buttons.forEach(btn => {
            btn.disabled = true;
        });

        if (playerWins === 5) {
            gameWinner = 'Humanity';
        }
        else {
            gameWinner = 'Machine';
        }

        // Reveal popup
        popup.style.display = 'block';
        announcer.style.display = 'none';
        heading.textContent = `And the winner is... ${gameWinner}`;
    }
    
    // Display winner
    if (roundWinner === 'player') {
        playerScore.textContent = playerWins;
        announcer.textContent = 'Humanity takes a stand... +1';
        // console.log(`Player wins! With a total of ${playerWins} points!`);
    }
    else if (roundWinner === 'computer') {
        compScore.textContent = computerWins;
        announcer.textContent = 'The Machine strikes back... +1';
        // console.log(`Computer wins! With a total of ${computerWins} points!`);
    }
    else {
        announcer.textContent = 'A power draw! +0';
    }
}

/* References
    1. Solution from: https://stackoverflow.com/questions/71974632/get-value-from-the-button-element-that-i-click
*/