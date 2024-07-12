document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.gridBox');
    const playerXScoreElement = document.getElementById('playerX');
    const playerOScoreElement = document.getElementById('playerO');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.getElementById('closeBtn');

    let playerXScore = 0;
    let playerOScore = 0;
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    cells.forEach(gridBox => gridBox.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        restartGame();
    });

    function handleCellClick(e) {
        const gridBox = e.target;
        if (gridBox.textContent || !gameActive) return;

        gridBox.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            gameActive = false;
            updateScore();
            setTimeout(() => showModal(`Player ${currentPlayer} Wins!`), 100);
        } else if (isDraw()) {
            gameActive = false;
            setTimeout(() => showModal('Its a Tie! Great Game!'), 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function checkWin(player) {
        return winningCombinations.some(combination =>
            combination.every(index => cells[index].textContent === player)
        );
    }

    function isDraw() {
        return [...cells].every(gridBox => gridBox.textContent);
    }

    function updateScore() {
        if (currentPlayer === 'X') {
            playerXScore++;
            playerXScoreElement.textContent = `Player X: ${playerXScore}`;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = `Player O: ${playerOScore}`;
        }
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    function restartGame() {
        cells.forEach(gridBox => gridBox.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
    }
});




