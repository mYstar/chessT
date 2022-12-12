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

  // remove old piece
  let oldPiece = field.getElementsByClassName("black");
  if(oldPiece.length > 0) {
    oldPiece.item(0).remove();
  }
  oldPiece = field.getElementsByClassName("white");
  if(oldPiece.length > 0) {
    oldPiece.item(0).remove();
  }

  // add new piece if present
  if(piece != undefined && color != undefined) {
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

/**
 * Moves a piece on the HTML board by:
 * 1. moving the piece on the internal board structure.
 * 2. reading the changes from the internal board
 * 3. performing the changes
 * 4. adding event listeners to the moved piece
 *
 * @param board: the html board in the DOM to change
 * @param fromField: the field to move the piece away from
 * @param toField: the field to move the piece to
 */
var movePieceInHTML = function(board, fromField, toField) {
  let fromFieldId = fromField.getAttribute('id');
  let toFieldId = toField.getAttribute('id');
  // -- 1. -- move the piece
  board.movePiece(fromFieldId, toFieldId);

  // -- 2. -- get the changes
  let changes = board.getBoardChanges();

  // -- 3. -- perform changes in html
  for(let changedId in changes) {
    let change = changes[changedId];
    changeFieldInHtml(
      changedId,
      change.piece,
      change.color,
      change.selected, 
      change.highlighted);
  }

  // -- 4. -- add event listeners
  toField.onclick = function() { highlightPieceInHTML(board, toField); };
}

/**
 * Highlights a piece on the HTML board by:
 * 1. selecting the piece on the internal board structure.
 * 2. reading the changes from the internal board
 * 3. performing the changes
 * 4. adding event listeners to the highlighted fields
 *
 * @param board: the html board in the DOM to change
 * @param field: the field on the board to highlight
 */
var highlightPieceInHTML = function(board, field) {
  let fieldId = field.getAttribute('id');

  // -- 1. -- selecting
  board.selectPiece(fieldId);

  // -- 2. -- reading changes
  let changes = board.getBoardChanges();
  for(let changedId in changes) {
    let change = changes[changedId];
    // -- 3. -- change the html board
    changeFieldInHtml(
      changedId,
      change.piece,
      change.color,
      change.selected, 
      change.highlighted);

    // -- 4. -- set onclick handlers for highlights
    if(change.highlighted) {
      let toField = document.getElementById(changedId);
      toField.onclick = function() { movePieceInHTML(board, field, toField); };
    }
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
  for(let field of fields) {
    field.onclick = function() { highlightPieceInHTML(board, field) };
  }
}

let currentMove = undefined;
init();
