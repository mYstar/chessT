export default class Board {
  // stores the field, where the current selected piece is placed.
  #currentPiece = undefined;
  // contains all the 64 fields the board consists of
  // [[A1], [A2], [A3], ... , [A8]],
  // [[B1], [B2], [B3], ... , [B8]],
  // [[C1], [C2], [C3], ... , [C8]],
  // ...
  #fields;

  constructor(htmlDoc) {
    // create an array containing the board
    this.#fields = []
    for(let nCol=0; nCol<8; nCol++) {
      let column = [];

      for(let nRow=0; nRow<8; nRow++) {
        let fieldName = this.#numberToCol(nCol) + (nRow+1).toString();
        let field = htmlDoc.getElementById(fieldName);
        
        column.push(field);
      }

      this.#fields.push(column);
    }

    // make pieces clickable
    let currBoard = this;
    for(let ncol=0; ncol<8; ncol++) {
      for(let nrow=0; nrow<8; nrow++) {
        this.#fields[ncol][nrow].onclick = function() {
          currBoard.selectPiece(this);
          currBoard.drawMoveOptions(this);
        }
      }
    }
  }

  /**
   * Takes a number and calculates the corresponding column marking on a chess board.
   *
   * @param number: the number to process (0..7)
   * @returns: a char ("A", ..., "H"), or undefined when number is out of range
   */
  #numberToCol(number) {
    if(number < 0 || number >= 8) {
      return undefined;
    }

    var startCharCode = 'A'.charCodeAt(0);

    return String.fromCharCode(startCharCode + number);
  }

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
  #pieceInfo(field) {  
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
  #getPosition(field) {
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
  #highlightMoveOption(col, row) {

    if(col < 0 || row < 0 || col > 7 || row > 7) {
      return -1;
    }

    let field = this.#fields[col][row];
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
  #removeHighlights() {

    for(let col = 0; col < 8; col++) {
      for(let row = 0; row < 8; row++) {
        let field = this.#fields[col][row];
        let highlight = field.getElementsByClassName("move-option");

        if(highlight.length !== 0) {
          highlight.item(0).remove();
        }
      }
    }

    return this;
  }

  /**
  * Draws a highlighting on the fields where the rook can move.
  *
  * @param board: the array board structure to draw the highlighting in
  * @param knight: an html div from the board, where the knight stands
  *
  * @returns: 0 on success, null on error
  */
  #drawKnightMoveOptions(knight) {
    if(this.#pieceInfo(knight).type != 'knight') {
      return null
    }

    let position = this.#getPosition(knight);
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

      this.#highlightMoveOption(newCol, newRow);
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
  #drawBishopMoveOptions(bishop) {
    if(this.#pieceInfo(bishop).type != 'bishop') {
      return null
    }

    let position = this.#getPosition(bishop);

    // go diagonally into all 4 directions
    for(let r = position.row+1, c = position.col+1;; r++, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1, c = position.col+1;; r--, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1, c = position.col-1;; r--, c--){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row+1, c = position.col-1;; r++, c--){
      let success = this.#highlightMoveOption(c, r);
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
  #drawQueenMoveOptions(queen) {
    if(this.#pieceInfo(queen).type != 'queen') {
      return null
    }

    let position = this.#getPosition(queen);

    // go horizontally and vertically into all 4 directions
    for(let r = position.row+1;; r++) {
      let success = this.#highlightMoveOption(position.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1;; r--) {
      let success = this.#highlightMoveOption(position.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let c = position.col+1;; c++) {
      let success = this.#highlightMoveOption(c, position.row);
      if(success !== 0) {
        break;
      }
    }
    for(let c = position.col-1;; c--) {
      let success = this.#highlightMoveOption(c, position.row);
      if(success !== 0) {
        break;
      }
    }
    // go diagonally into all 4 directions
    for(let r = position.row+1, c = position.col+1;; r++, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1, c = position.col+1;; r--, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1, c = position.col-1;; r--, c--){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row+1, c = position.col-1;; r++, c--){
      let success = this.#highlightMoveOption(c, r);
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
  #drawPawnMoveOptions(pawn) {
    let pInfo = this.#pieceInfo(pawn);
    if(pInfo.type != 'pawn') {
      return null
    }

    let position = this.#getPosition(pawn);

    let direction = (pInfo.color == "white")? 1 : -1;
    let isStartPos = (pInfo.color == "white" && position.row === 1 
                 || pInfo.color == "black" && position.row === 6);

    this.#highlightMoveOption(position.col, position.row + direction);
    if(isStartPos) {
      this.#highlightMoveOption(position.col, position.row + 2*direction);
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
  #drawKingMoveOptions(king) {
    if(this.#pieceInfo(king).type != 'king') {
      return null
    }

    let position = this.#getPosition(king);

    for(let c = -1; c<=1; c++) {
      for(let r = -1; r<=1; r++) {
        // don't highlight the kings own position
        if(c === 0 && r === 0) {
          continue;
        }

        this.#highlightMoveOption(position.col + c, position.row + r);
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
  #drawRookMoveOptions(rook) {
    if(this.#pieceInfo(rook).type != 'rook') {
      return null
    }

    let position = this.#getPosition(rook);

    // go into all 4 directions from the rooks position and place highlights
    for(let r = position.row+1;; r++) {
      let success = this.#highlightMoveOption(position.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = position.row-1;; r--) {
      let success = this.#highlightMoveOption(position.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let c = position.col+1;; c++) {
      let success = this.#highlightMoveOption(c, position.row);
      if(success !== 0) {
        break;
      }
    }
    for(let c = position.col-1;; c--) {
      let success = this.#highlightMoveOption(c, position.row);
      if(success !== 0) {
        break;
      }
    }

    return 0;
  }

  /**
   * This checks if there is a piece on the field, 
   * removes the highlighting of the old piece and highlights 
   * the new one.
   *
   * @param field: the piece to be highlighted.
   */
  selectPiece(field) {
    // remove the old marking
    if(this.#currentPiece !== undefined) {
      this.#currentPiece.children.namedItem("sel-piece").remove();
    }

    // check if there is a piece on the field
    if(field.getElementsByTagName("img").length === 0) {
      this.#currentPiece = undefined;
      return undefined;
    }

    // update current piece reference
    this.#currentPiece = field;

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
  drawMoveOptions(field) {
    // --- 1. ---
    this.#removeHighlights();

    // --- 2. ---
    let pInfo = this.#pieceInfo(field);

    if(pInfo === null) {
      return this;
    }

    // --- 3. ---
    switch(pInfo.type) {
      case 'rook':
        drawRookMoveOptions(field);
        break;
      case 'knight':
        this.#drawKnightMoveOptions(field);
        break;
      case 'bishop':
        this.#drawBishopMoveOptions(field);
        break;
      case 'queen':
        this.#drawQueenMoveOptions(field);
        break;
      case 'king':
        this.#drawKingMoveOptions(field);
        break;
      case 'pawn':
        this.#drawPawnMoveOptions(field);
        break;
    }
    return this;
  }
}

