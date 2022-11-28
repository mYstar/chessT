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

/**
 * Translates changes made to a chessboard onto changes in the HTML DOM.
 * 
 * @param fieldId: the ID of the field in chess notation (e.g. "A1")
 * @param piece: a string describing the piece to place (e.g. "rook"),
 *               undefined leaves the piece as is
 * @param color: a string describing the color of the piece to place (e.g. "black"),
 *               undefined leaves the piece as is
 * @param selected: a boolean flagging if the piece is currently selected by the user
 * @param highlighted: a boolean flagging if the piece is currently highlighted as move option
 * @returns: 0 if the change was successful, -1 on error
 */
let changeFieldInHtml = function(
  fieldId, 
  piece=undefined,
  color=undefined,
  selected=false,
  highlighted=false) {
  
  let field = document.getElementById(fieldId);
  if(field == null) {
    console.warn("field: " + fieldId + " can not be found in the DOM.");
    return -1;
  }

  // perform changes on the piece
  if(piece != undefined && color != undefined) {
    // get old piece
    let oldPiece = field.getElementsByClassName("black");
    if(oldPiece.length > 0) {
      oldPiece.item(0).remove();
    }
    oldPiece = field.getElementsByClassName("white");
    if(oldPiece.length > 0) {
      oldPiece.item(0).remove();
    }

    field.innerHTML += '<img class="'
    + piece 
    + ' '
    + color
    + '" src="./img/'
    + piece 
    + '_'
    + color
    +'.svg" alt="'
    + piece 
    + ' '
    + color
    + '" />';
  }

  // perform selection
  let oldSelection = field.getElementsByClassName("sel-piece");
  if(selected === true && oldSelection.length === 0) {
    field.innerHTML += '<svg class="sel-piece">'
      +'    <rect x="0%" y="0%" />'
      +'    <rect x="0%" y="65%" />'
      +'    <rect x="65%" y="0%" />'
      +'    <rect x="65%" y="65%" />'
      +'</svg>';
  }
  if(selected === false && oldSelection.length > 0) {
    oldSelection.item(0).remove();
  }

  // perform highlighting
  let oldHighlight = field.getElementsByClassName('move-option');
  if(highlighted === true && oldHighlight.length === 0) {

    field.innerHTML += '<svg class="move-option">'
      + '<circle cx="50%" cy="50%" r="50%"/>'
      + '</svg>';
  }
  if(highlighted === false && oldHighlight.length > 0) {
    oldHighlight.item(0).remove();
  }
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

  // create board and register handlers
  let board = new Board();
  board.setStartingConfiguration();
  let changes = board.getBoardChanges();
  for(let id in changes) {
    let change = changes[id];
    changeFieldInHtml(
      id,
      change.piece,
      change.color,
      change.selected, 
      change.highlighted);
  }

  let fields = document.getElementsByClassName('field');
  // make pieces clickable
  for(let i = 0; i<fields.length; i++) {
    fields.item(i).onclick = function() {
      board.selectPiece(this.getAttribute('id'));
      let changes = board.getBoardChanges()
      for(let id in changes) {
        let change = changes[id];
        changeFieldInHtml(
          id,
          change.piece,
          change.color,
          change.selected, 
          change.highlighted);
      }
    }
  }
}

var currentMove = undefined;
init();
