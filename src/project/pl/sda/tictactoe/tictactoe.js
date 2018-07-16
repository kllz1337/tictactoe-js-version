var isWin = false;
var isXCurrentPlayer = true;
var board;
var clickCounter = 0;

function enablePlayAgainButtonFunction() {
    var playAgainButton = document.getElementById("playAgainButton");
    playAgainButton.addEventListener("click", startNewGame);
}

function startNewGame() {
    isWin = false;
    isXCurrentPlayer = true;
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    for (var n = 0; n < 9; n++) {
        var thisCell = document.getElementById(n);
        thisCell.addEventListener("click", onClickAction);
        thisCell.textContent = "";
    }
    clickCounter = 0;
}

function onClickAction() {
    clickCounter++;
    var stringCellId = this.id;
    var intCellId = parseInt(stringCellId);
    var iIndexOfBoard = Math.floor((intCellId) / 3);
    var jIndexOfBoard = (intCellId) % 3;
    var thisCell = document.getElementById(stringCellId);

    function getCurrentPlayer() {
        if (isXCurrentPlayer) {
            return "X";
        }
        return "O";
    }

    var actualPlayerSymbol = getCurrentPlayer();

    function markCell() {
        board[iIndexOfBoard][jIndexOfBoard] = actualPlayerSymbol;
        thisCell.textContent = board[iIndexOfBoard][jIndexOfBoard];
        thisCell.removeEventListener("click", onClickAction);
    }

    function announceVictory() {
        for (var n = 0; n < 9; n++) {
            var thisCell = document.getElementById(n);
            thisCell.removeEventListener("click", onClickAction);
        }
        alert("Player " + actualPlayerSymbol + " won the game!");
    }

    function checkWin() {
        var rowCounter = 0;
        var columnCounter = 0;
        var firstDiagonalCounter = 0;
        var secondDiagonalCounter = 0;

        function checkCounters(counter1, counter2) {
            return counter1 === 3 || counter2 === 3;
        }

        function increaseRowAndColumnCounters() {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === actualPlayerSymbol) {
                    rowCounter++;
                }
                if (board[j][i] === actualPlayerSymbol) {
                    columnCounter++;
                }
            }
        }

        function increaseDiagonalsCounters() {
            if (board[i][i] === actualPlayerSymbol) {
                firstDiagonalCounter++;
            }
            if (board[2 - i][i] === actualPlayerSymbol) {
                secondDiagonalCounter++;
            }
        }

        function resetRowAndColumnCounters() {
            rowCounter = 0;
            columnCounter = 0;
        }

        for (var i = 0; i < 3; i++) {
            increaseRowAndColumnCounters();
            if (checkCounters(rowCounter, columnCounter)) {
                isWin = true;
                break;
            }
            increaseDiagonalsCounters();
            resetRowAndColumnCounters();
        }
        if (checkCounters(firstDiagonalCounter, secondDiagonalCounter)) {
            isWin = true;
        }
        return isWin;
    }

    function checkDraw() {
        if (clickCounter === 9) {
            alert("Draw!");
        }
    }

    function switchPlayer() {
        isXCurrentPlayer = !isXCurrentPlayer;
    }

    markCell();
    if (checkWin()) {
        announceVictory();
    } else {
        checkDraw();
        switchPlayer();
    }
}

enablePlayAgainButtonFunction();
startNewGame();