import * as board from "./board.js";

/**
 * This function removes the highlighting of the old move
 * and highlights the new move in the #game section.
 *
 * @param moveList: an array of moves, each containing all the 3 <div>s in the
 *   row to select.
 * @param moveNumber: the number of the move to be selected from the list
 * @param playerColor: a string giving the selected players color 
 *   ("white" || "black")
 */
var selectMove = function(moveList, moveNumber, playerColor) {
  if(currentMove !== undefined) {
    currentMove[0].classList.remove("sel-row");
    currentMove[1].classList.remove("sel-row");
    currentMove[2].classList.remove("sel-row");

    document.getElementById('sel-move').remove();
  }

  let newMove = moveList[moveNumber];

  newMove[0].classList.add("sel-row");
  newMove[1].classList.add("sel-row");
  newMove[2].classList.add("sel-row");

  var slot = document.createElement("img");
  slot.id = "sel-move";
  slot.src = "./img/sel-move.svg";
  slot.alt = "seleced move";

  if(playerColor === "white") {
    newMove[1].appendChild(slot);
  } else {
    newMove[2].appendChild(slot);
  }

  currentMove = newMove;
}

/**
 * Takes a number and calculates the corresponding column marking on a chess board.
 *
 * @param number: the number to process (0..7)
 * @returns: a char ("A", ..., "H"), or undefined when number is out of range
 */
var numberToCol = function(number) {
  if(number < 0 || number >= 8) {
    return undefined;
  }

  var startCharCode = 'A'.charCodeAt(0);

  return String.fromCharCode(startCharCode + number);
}

var init = function() {

  // --- create datastructures ---
  // create an array containing the game
  var moveNumbers = document.getElementsByClassName("move-number");
  var moveRows = [];
  for (let item of moveNumbers) {
    moveRows.push([
      item,
      item.nextElementSibling,
      item.nextElementSibling.nextElementSibling
    ])
  }
  // create an array containing the board
  // [[A1], [A2], [A3], ... , [A8]],
  // [[B1], [B2], [B3], ... , [B8]],
  // [[C1], [C2], [C3], ... , [C8]],
  // ...
  var fields = []
  for(let nCol=0; nCol<8; nCol++) {
    let column = [];

    for(let nRow=0; nRow<8; nRow++) {
      let fieldName = numberToCol(nCol) + (nRow+1).toString();
      let field = document.getElementById(fieldName);
      
      column.push(field);
    }

    fields.push(column);
  }

  // select the first move
  selectMove(moveRows, 0, "white");

  // --- onclick handlers ---
  // make game moves clickable
  for (let i = 0; i < moveRows.length; i++) {
    let move = moveRows[i];
    
    move[1].onclick = function() {
      selectMove(moveRows, i, "white");
    }

    move[2].onclick = function() {
      selectMove(moveRows, i, "black");
    }
  }
  // make pieces clickable
  for(let nCol=0; nCol<8; nCol++) {
    for(let nRow=0; nRow<8; nRow++) {
      fields[nCol][nRow].onclick = function() {
        board.selectPiece(this);
        board.drawMoveOptions(fields, this);
      }
    }
  }
}

var currentMove = undefined;
init();
