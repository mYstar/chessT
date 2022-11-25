import Board from "./board.js";

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
  // select the first move
  selectMove(moveRows, 0, "white");

  //create board
  let board = new Board(document);

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
}

var currentMove = undefined;
init();
