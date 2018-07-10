/*GLOBAL VARIABLES*/
var isWin = false;
var currentPlayer = true;
var board;
var clickCounter = 0;


/*EMPTY BOARD RENDERING*/
function renderBoard() {
    var boardGame = document.getElementById("boardGame");
    var buttonP = document.getElementById("buttonP");

    var cell0 = document.createElement("td");
    cell0.id = "0";
    var cell1 = document.createElement("td");
    cell1.id = "1";
    var cell2 = document.createElement("td");
    cell2.id = "2";
    var cell3 = document.createElement("td");
    cell3.id = "3";
    var cell4 = document.createElement("td");
    cell4.id = "4";
    var cell5 = document.createElement("td");
    cell5.id = "5";
    var cell6 = document.createElement("td");
    cell6.id = "6";
    var cell7 = document.createElement("td");
    cell7.id = "7";
    var cell8 = document.createElement("td");
    cell8.id = "8";
    var playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play again";
    playAgainButton.addEventListener("click", startNewGame);

    var r1 = document.createElement("tr");
    var r2 = document.createElement("tr");
    var r3 = document.createElement("tr");

    r1.appendChild(cell0);
    r1.appendChild(cell1);
    r1.appendChild(cell2);

    r2.appendChild(cell3);
    r2.appendChild(cell4);
    r2.appendChild(cell5);

    r3.appendChild(cell6);
    r3.appendChild(cell7);
    r3.appendChild(cell8);

    boardGame.appendChild(r1);
    boardGame.appendChild(r2);
    boardGame.appendChild(r3);

    boardGame.classList.add("boardGame");

    buttonP.appendChild(playAgainButton);
}


/*FUNCTION PREPARING NEW GAME*/
function startNewGame() {
    isWin = false;
    currentPlayer = true;
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


/*ON-CLICK LOGIC*/
function onClickAction() {
    clickCounter++;
    var stringCellId = this.id;
    var intCellId = parseInt(stringCellId);
    var iIndexOfBoard = Math.floor((intCellId) / 3);
    var jIndexOfBoard = (intCellId) % 3;
    var thisCell = document.getElementById(stringCellId);

    function getCurrentPlayer() {
        if (currentPlayer) {
            return "X";
        }
        return "O";
    }

    var actualPlayerSymbol = getCurrentPlayer();

    function markCell() {
        debugger;
        board[iIndexOfBoard][jIndexOfBoard] = actualPlayerSymbol;
        thisCell.textContent = board[iIndexOfBoard][jIndexOfBoard];
        thisCell.removeEventListener("click", onClickAction);
    }

    function checkCounter(Counter) {
        return Counter === 3;
    }

    function switchPlayer() {
        currentPlayer = !currentPlayer;
    }

    function announceVictory() {
        var actualPlayerSymbol = getCurrentPlayer();
        for (var n = 0; n < 9; n++) {
            var thisCell = document.getElementById(n);
            thisCell.removeEventListener("click", onClickAction);
        }
        alert("Player " + actualPlayerSymbol + " won the game!");

    }

    function checkWin() {
        var actualPlayerSymbol = getCurrentPlayer();
        var rowCounter = 0;
        var colCounter = 0;
        var firstCrossCounter = 0;
        var secondCrossCounter = 0;
        for (var i = 0; i < 3; i++) {
            debugger;
            for (var j = 0; j < 3; j++) {
                if (board[i][j] === actualPlayerSymbol) {
                    rowCounter++;
                    console.log(rowCounter);
                }
                if (board[j][i] === actualPlayerSymbol) {
                    colCounter++;
                    console.log(colCounter);
                }
            }
            if (checkCounter(rowCounter) || checkCounter(colCounter)) {
                isWin = true;
                break;
            }
            if (board[i][i] === actualPlayerSymbol) {
                firstCrossCounter++;
                console.log(firstCrossCounter);
            }
            if (board[2 - i][i] === actualPlayerSymbol) {
                secondCrossCounter++;
                console.log(secondCrossCounter);
            }
            rowCounter = 0;
            colCounter = 0;
        }
        if (checkCounter(firstCrossCounter) || checkCounter(secondCrossCounter)) {
            isWin = true;
        }
        return isWin;
    }

    function checkDraw() {
        if (clickCounter === 9) {
            alert("Draw!");
        }
    }

    markCell();
    if (checkWin()) {
        announceVictory();
    } else {
        checkDraw();
        switchPlayer();
    }
}


/*CALLING STARTING FUNCTIONS*/
renderBoard();
startNewGame();