const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('.reset-button');
const exitButton = document.querySelector('.exit-button'); // Add reference to the exit button

const winSound = new Audio('mixkit-ethereal-fairy-win-sound-2019.wav'); // Add the path to your sound file

let currentPlayer = 'X';
let isSinglePlayerMode = false;

// Check the URL for the mode parameter
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get('mode');
isSinglePlayerMode = (mode === 'single');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                displayMessage(`${currentPlayer} wins!`, 3000);
                winSound.play();
                setTimeout(resetBoard, 3000);
            } else if (checkDraw()) {
                displayMessage('It\'s a draw!', 3000);
                setTimeout(resetBoard, 3000);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (isSinglePlayerMode && currentPlayer === 'O') {
                    setTimeout(makeComputerMove, 300);
                }
            }
        }
    });
});

resetButton.addEventListener('click', resetBoard);
exitButton.addEventListener('click', () => {
    window.location.href = 'index.html'; // Navigate to the home page
});

function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
}

function checkWin(player) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombos.some(combo => combo.every(index => cells[index].classList.contains(player)));
}

function checkDraw() {
    return [...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'));
}

function makeComputerMove() {
    const emptyCells = [...cells].filter(cell => !cell.classList.contains('X') && !cell.classList.contains('O'));
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomIndex].click();
}

function displayMessage(message, duration) {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, duration);
}
