// stores the field, where the current selected piece is placed.
var currentPiece = undefined;

/**
* Detects the piece type and the color of the piece on the given field
*
*
* @param field: a field on the board to be searched.
* @returns: an object {type: 'type', color: 'color'} for the piece found 
*           type can be: rook, knight, bishop, queen, king or pawn
*           color can be: black, white
*           OR null, if there is no piece on the field
*/
function pieceInfo(field) {  
  let piece = field.getElementsByTagName("img").item(0);

  if(piece === null) {
    return null;
  }

  let classes = piece.classList;
  let pieceType = classes.item(0);
  let pieceColor = classes.item(1);

  if(pieceType === null || pieceType.search(/rook|knight|bishop|queen|king|pawn/) === -1)
    return null;

  if(pieceColor === null || pieceColor.search(/black|white/) === -1)
    return null;

  return {type: pieceType, color: pieceColor};
}

/**
* parses the class of the given field and returns the 
* array indexes on the board.
*
* @param field: the field div to parse
* @returns: an object {row: <idx>, col: <idx>} with the corresponding indexes
*           OR undefied if there was an error
*/
function getPosition(field) {
  let positionStr = field.id;

  if(positionStr === null || positionStr.length !== 2) {
    return undefined;
  }

  let col = positionStr.charCodeAt(0) - "A".charCodeAt(0);
  let row = parseInt(positionStr.charAt(1)) - 1;

  return {row: row, col: col};
}

/**
* Inserts the highlight svg into the field at row, col.
*
* @param board: the board to alter
* @param col: the column number of the field to hightlight
* @param row: the row number of the field to highlight
*
* @returns: 0 if insert was successful, -1 when out o bounds
*/
function highlightMoveOption(board, col, row) {

  if(col < 0 || row < 0 || col > 7 || row > 7) {
    return -1;
  }

  let field = board[col][row];
  // set new highlight
  field.innerHTML += '<svg class="move-option">'
    + '<circle cx="50%" cy="50%" r="50%"/>'
    + '</svg>';

  return 0;
}

/**
* Removes all .move-option highlights from the whole board.
*
* @param board: the board to alter
*
* @returns: the altered board
*/
function removeHighlights(board) {

  for(let col = 0; col < 8; col++) {
    for(let row = 0; row < 8; row++) {
      let field = board[col][row];
      let highlight = field.getElementsByClassName("move-option");

      if(highlight.length !== 0) {
        highlight.item(0).remove();
      }
    }
  }

  return board;
}

/**
* Draws a highlighting on the fields where the rook can move.
*
* @param board: the array board structure to draw the highlighting in
* @param knight: an html div from the board, where the knight stands
*
* @returns: 0 on success, null on error
*/
function drawKnightMoveOptions(board, knight) {
  if(pieceInfo(knight).type != 'knight') {
    return null
  }

  let position = getPosition(knight);
  const moveOptions = [
    {row: 2, col: 1},
    {row: 1, col: 2},
    {row: -2, col: 1},
    {row: -1, col: 2},
    {row: -2, col: -1},
    {row: -1, col: -2},
    {row: 2, col: -1},
    {row: 1, col: -2}
  ];

  for(let move of moveOptions) {
    let newRow = position.row + move.row;
    let newCol = position.col + move.col;

    highlightMoveOption(board, newCol, newRow);
  }

  return 0;
}

/**
* Draws a highlighting on the fields where the bishop can move.
*
* @param board: the array board structure to draw the highlighting in
* @param bishop: an html div from the board, where the bishop stands
*
* @returns: 0 on success, null on error
*/
function drawBishopMoveOptions(board, bishop) {
  if(pieceInfo(bishop).type != 'bishop') {
    return null
  }

  let position = getPosition(bishop);

  // go diagonally into all 4 directions
  for(let r = position.row+1, c = position.col+1;; r++, c++){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1, c = position.col+1;; r--, c++){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1, c = position.col-1;; r--, c--){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row+1, c = position.col-1;; r++, c--){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }

  return 0;
}

/**
* Draws a highlighting on the fields where the queen can move.
*
* @param board: the array board structure to draw the highlighting in
* @param queen: an html div from the board, where the queen stands
*
* @returns: 0 on success, null on error
*/
function drawQueenMoveOptions(board, queen) {
  if(pieceInfo(queen).type != 'queen') {
    return null
  }

  let position = getPosition(queen);

  // go horizontally and vertically into all 4 directions
  for(let r = position.row+1;; r++) {
    let success = highlightMoveOption(board, position.col, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1;; r--) {
    let success = highlightMoveOption(board, position.col, r);
    if(success !== 0) {
      break;
    }
  }
  for(let c = position.col+1;; c++) {
    let success = highlightMoveOption(board, c, position.row);
    if(success !== 0) {
      break;
    }
  }
  for(let c = position.col-1;; c--) {
    let success = highlightMoveOption(board, c, position.row);
    if(success !== 0) {
      break;
    }
  }
  // go diagonally into all 4 directions
  for(let r = position.row+1, c = position.col+1;; r++, c++){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1, c = position.col+1;; r--, c++){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1, c = position.col-1;; r--, c--){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row+1, c = position.col-1;; r++, c--){
    let success = highlightMoveOption(board, c, r);
    if(success !== 0) {
      break;
    }
  }

  return 0;
}

/**
* Draws a highlighting on the fields where the pawn can move.
*
* @param board: the array board structure to draw the highlighting in
* @param pawn: an html div from the board, where the pawn stands
*
* @returns: 0 on success, null on error
*/
function drawPawnMoveOptions(board, pawn) {
  let pInfo = pieceInfo(pawn);
  if(pInfo.type != 'pawn') {
    return null
  }

  let position = getPosition(pawn);

  let direction = (pInfo.color == "white")? 1 : -1;
  let isStartPos = (pInfo.color == "white" && position.row === 1 
               || pInfo.color == "black" && position.row === 6);

  highlightMoveOption(board, position.col, position.row + direction);
  if(isStartPos) {
    highlightMoveOption(board, position.col, position.row + 2*direction);
  }

  return 0;
}

/**
* Draws a highlighting on the fields where the king can move.
*
* @param board: the array board structure to draw the highlighting in
* @param king: an html div from the board, where the king stands
*
* @returns: 0 on success, null on error
*/
function drawKingMoveOptions(board, king) {
  if(pieceInfo(king).type != 'king') {
    return null
  }

  let position = getPosition(king);

  for(let c = -1; c<=1; c++) {
    for(let r = -1; r<=1; r++) {
      // don't highlight the kings own position
      if(c === 0 && r === 0) {
        continue;
      }

      highlightMoveOption(board, position.col + c, position.row + r);
    }
  }
}
/**
* Draws a highlighting on the fields where the rook can move.
*
* @param board: the array board structure to draw the highlighting in
* @param rook: an html div from the board, where the rook stands
*
* @returns: 0 on success, null on error
*/
function drawRookMoveOptions(board, rook) {
  if(pieceInfo(rook).type != 'rook') {
    return null
  }

  let position = getPosition(rook);

  // go into all 4 directions from the rooks position and place highlights
  for(let r = position.row+1;; r++) {
    let success = highlightMoveOption(board, position.col, r);
    if(success !== 0) {
      break;
    }
  }
  for(let r = position.row-1;; r--) {
    let success = highlightMoveOption(board, position.col, r);
    if(success !== 0) {
      break;
    }
  }
  for(let c = position.col+1;; c++) {
    let success = highlightMoveOption(board, c, position.row);
    if(success !== 0) {
      break;
    }
  }
  for(let c = position.col-1;; c--) {
    let success = highlightMoveOption(board, c, position.row);
    if(success !== 0) {
      break;
    }
  }

  return 0;
}

/**
 * This function checks if there is a piece on the field, 
 * removes the highlighting of the old piece and highlights 
 * the new one.
 *
 * @param field: the piece to be highlighted.
 */
export function selectPiece(field) {
  // remove the old marking
  if(currentPiece !== undefined) {
    currentPiece.children.namedItem("sel-piece").remove();
  }

  // check if there is a piece on the field
  if(field.getElementsByTagName("img").length === 0) {
    currentPiece = undefined;
    return undefined;
  }

  // update current piece reference
  currentPiece = field;

  // set new marking
  field.innerHTML += '<svg id="sel-piece">'
    +'    <rect x="0%" y="0%" />'
    +'    <rect x="0%" y="65%" />'
    +'    <rect x="65%" y="0%" />'
    +'    <rect x="65%" y="65%" />'
    +'</svg>';
}

/**
 * Draw the move options for a piece on a specific field.
 * 1. Removes previous highlighting.
 * 2. Detects the piece.
 *    2a. if there is no piece, don't highlight anything.
 * 3. Adds highlight <svg> elements specific to the piece.
 * 
 * @param board: the board to add the highlighting to.
 * @param field: the field to search for the piece
 * @returns: the altered board.
 */
export function drawMoveOptions(board, field) {
  // --- 1. ---
  removeHighlights(board);

  // --- 2. ---
  let pInfo = pieceInfo(field);

  if(pInfo === null) {
    return board;
  }

  // --- 3. ---
  switch(pInfo.type) {
    case 'rook':
      drawRookMoveOptions(board, field);
      break;
    case 'knight':
      drawKnightMoveOptions(board, field);
      break;
    case 'bishop':
      drawBishopMoveOptions(board, field);
      break;
    case 'queen':
      drawQueenMoveOptions(board, field);
      break;
    case 'king':
      drawKingMoveOptions(board, field);
      break;
    case 'pawn':
      drawPawnMoveOptions(board, field);
      break;
  }
  return board;
}
