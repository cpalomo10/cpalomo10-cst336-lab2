// VARIABLES
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{ word: "snake", hint: "It's a reptile" },
             { word: "monkey", hint: "It's a mammal" },
             { word: "beetle", hint: "It's an insect" }];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// LISTENERS
window.onload = startGame();

// FUNCTIONS
function startGame() {
    pickWord();
    initBoard();
    updateBoard();
}

//fill board with underscores
function initBoard() {
    for (var letter in selectedWord) {
        board.push("_");
    }
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function updateBoard() {
    for(var letter of board) {
        document.getElementById("word").innerHTML += letter + " ";
    }
}

$("#letterBtn").click(function() {
    var boxVal = $("#letterBox").val();
    console.log("You pressed hte button and it had the value: " + boxVal);
})

function createLetters() {
    for(var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

$(".letter").click(function() {
    checkLetter($(this).attr("id"));
}

function picWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].toUpperCase();
}

function checkLetter(letter) {
    var positions = new Array();
                   
    for (var i = 0; i < selectedWord.length; i++) {
        if (letter = selectedWord[i]) {
            positions.push(i);
        }
    }
     
    if (positions.length > 0) {
        updateWord(positions, letter);
                   
        if (!board.includes('_')) {
            endGame(true);
        }
                   
    } else {
        remainingGuesses -= 1;
        updateMan();
    }
                   
    if (remainingGuesses <= 0) {
        endGame(false);
    }
}
                   
function updateWord(positions, letter) {
    for (var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}
                   
function updateBoard() {
    $("#word").empty();
                   
    for (var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
                   
    $("#word").append("<br />");
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}
                   
function endGame(win) {
    $("#letters").hide();
                   
    if (win) {
        $('#won').show();
    } else {
        $('#lost').show();
    }
}
                   
$(".replayBtn").on("click", function() {
    location.reload();
})
                   
        
