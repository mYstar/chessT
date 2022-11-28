export default class Board {
  // stores the field, where the current selected piece is placed.
  #currentPiece = undefined;
  // contains all the 64 fields the board consists of
  // [[A1], [A2], [A3], ... , [A8]],
  // [[B1], [B2], [B3], ... , [B8]],
  // [[C1], [C2], [C3], ... , [C8]],
  // ...
  #fields;

  /* initializes the fields to an array containing the empty board.
   */
  constructor() {
    this.#fields = []
    for(let nCol=0; nCol<8; nCol++) {
      let column = [];

      for(let nRow=0; nRow<8; nRow++) {
        let fieldName = this.#matrixIdxToNotation(nCol, nRow);
        let field = 
        {
          id: fieldName,
          piece: null,
          color: null,
          col: nCol,
          row: nRow,
          selected: false,
          highlighted: false,
        };
        
        column.push(field);
      }

      this.#fields.push(column);
    }
  }

  /** 
   * sets the pieces to a starting Configuration for a game of chess
   */
  setStartingConfiguration() {
    let baseRow = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
    // white pieces
    for(let col = 0; col < 8; col++) {
      let fieldName = this.#matrixIdxToNotation(col, 0);
      this.#fields[col][0] = {
          id: fieldName,
          piece: baseRow[col],
          color: "white",
          col: col,
          row: 0,
          selected: false,
          highlighted: false,
      }
      fieldName = this.#matrixIdxToNotation(col, 1);
      this.#fields[col][1] = {
          id: fieldName,
          piece: "pawn",
          color: "white",
          col: col,
          row: 1,
          selected: false,
          highlighted: false,
      }
    }

    // black pieces
    for(let col = 0; col < 8; col++) {
      let fieldName = this.#matrixIdxToNotation(col, 7);
      this.#fields[col][7] = {
          id: fieldName,
          piece: baseRow[col],
          color: "black",
          col: col,
          row: 7,
          selected: false,
          highlighted: false,
      }
      fieldName = this.#matrixIdxToNotation(col, 6);
      this.#fields[col][6] = {
          id: fieldName,
          piece: "pawn",
          color: "black",
          col: col,
          row: 6,
          selected: false,
          highlighted: false,
      }
    }
  }

  /**
   * Takes a number and calculates the corresponding notation marking on a chess board.
   *
   * @param col: the column index to translate (0..7)
   * @param row: the row index to translate (0..7)
   * @returns: a string ("A1", ..., "H8"), or undefined when number is out of range
   */
  #matrixIdxToNotation(col, row) {
    if(col < 0 || col >= 8 || row < 0 || row >= 8) {
      return undefined;
    }

    var startCharCode = 'A'.charCodeAt(0);

    return String.fromCharCode(startCharCode + col) + (row+1).toString();
  }

  /**
   * Takes a chessboard field notation (e.g. "A1") and translates it into a
   * row and column index for the fields matrix.
   *
   * @param notation: the field notation to parse
   * @returns: an object {col: colN, row: rowN} containing the indexes
   */
  #matrixNotationToIdx(notation) {
    if(notation.length !== 2) {
      return undefined;
    }
    let colN = notation[0];
    let rowN = notation[1];

    let startCharCode = 'A'.charCodeAt(0);
    let colCharCode = colN.charCodeAt(0);

    return {col:colCharCode - startCharCode, row: Number(rowN)-1};
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

    this.#fields[col][row].highlighted = true;

    return 0;
  }

  /**
  * Removes all .move-option highlights from the whole board.
  *
  * @param board: the board to alter
  *
  * @returns: 0 on success
  */
  #removeHighlights() {

    for(let col = 0; col < 8; col++) {
      for(let row = 0; row < 8; row++) {
        this.#fields[col][row].highlighted = false;
      }
    }

    return 0;
  }

  /**
  * Draws a highlighting on the fields where the rook can move.
  *
  * @param board: the array board structure to draw the highlighting in
  * @param knight: an html div from the board, where the knight stands
  *
  * @returns: 0 on success, -1 on error
  */
  #drawKnightMoveOptions(knight) {
    if(knight.piece != 'knight') {
      return -1;
    }

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
      let newRow = knight.row + move.row;
      let newCol = knight.col + move.col;

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
  * @returns: 0 on success, -1 on error
  */
  #drawBishopMoveOptions(bishop) {
    if(bishop.piece != 'bishop') {
      return -1;
    }

    // go diagonally into all 4 directions
    for(let r = bishop.row+1, c = bishop.col+1;; r++, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = bishop.row-1, c = bishop.col+1;; r--, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = bishop.row-1, c = bishop.col-1;; r--, c--){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = bishop.row+1, c = bishop.col-1;; r++, c--){
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
  * @returns: 0 on success, -1 on error
  */
  #drawQueenMoveOptions(queen) {
    if(queen.piece != 'queen') {
      return -1;
    }

    // go horizontally and vertically into all 4 directions
    for(let r = queen.row+1;; r++) {
      let success = this.#highlightMoveOption(queen.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = queen.row-1;; r--) {
      let success = this.#highlightMoveOption(queen.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let c = queen.col+1;; c++) {
      let success = this.#highlightMoveOption(c, queen.row);
      if(success !== 0) {
        break;
      }
    }
    for(let c = queen.col-1;; c--) {
      let success = this.#highlightMoveOption(c, queen.row);
      if(success !== 0) {
        break;
      }
    }
    // go diagonally into all 4 directions
    for(let r = queen.row+1, c = queen.col+1;; r++, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = queen.row-1, c = queen.col+1;; r--, c++){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = queen.row-1, c = queen.col-1;; r--, c--){
      let success = this.#highlightMoveOption(c, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = queen.row+1, c = queen.col-1;; r++, c--){
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
  * @returns: 0 on success, -1 on error
  */
  #drawPawnMoveOptions(pawn) {
    if(pawn.piece != 'pawn') {
      return -1
    }

    let direction = (pawn.color == "white")? 1 : -1;
    let isStartPos = (pawn.color == "white" && pawn.row === 1 
                 || pawn.color == "black" && pawn.row === 6);

    this.#highlightMoveOption(pawn.col, pawn.row + direction);
    if(isStartPos) {
      this.#highlightMoveOption(pawn.col, pawn.row + 2*direction);
    }

    return 0;
  }

  /**
  * Draws a highlighting on the fields where the king can move.
  *
  * @param board: the array board structure to draw the highlighting in
  * @param king: an html div from the board, where the king stands
  *
  * @returns: 0 on success, -1 on error
  */
  #drawKingMoveOptions(king) {
    if(king.piece != 'king') {
      return -1;
    }

    for(let c = -1; c<=1; c++) {
      for(let r = -1; r<=1; r++) {
        // don't highlight the kings own position
        if(c === 0 && r === 0) {
          continue;
        }

        this.#highlightMoveOption(king.col + c, king.row + r);
      }
    }

    return 0;
  }
  /**
  * Draws a highlighting on the fields where the rook can move.
  *
  * @param board: the array board structure to draw the highlighting in
  * @param rook: an html div from the board, where the rook stands
  *
  * @returns: 0 on success, -1 on error
  */
  #drawRookMoveOptions(rook) {
    if(rook.piece != 'rook') {
      return -1;
    }

    // go into all 4 directions from the rooks position and place highlights
    for(let r = rook.row+1;; r++) {
      let success = this.#highlightMoveOption(rook.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let r = rook.row-1;; r--) {
      let success = this.#highlightMoveOption(rook.col, r);
      if(success !== 0) {
        break;
      }
    }
    for(let c = rook.col+1;; c++) {
      let success = this.#highlightMoveOption(c, rook.row);
      if(success !== 0) {
        break;
      }
    }
    for(let c = rook.col-1;; c--) {
      let success = this.#highlightMoveOption(c, rook.row);
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
   * @param notation: the column-row string (e.g. "A1") where the piece stands
   * @return: 0 if selection was successful, -1 if no piece found
   */
  selectPiece(notation) {
    // --- 1. ---
    this.#removeHighlights();

    let indexes = this.#matrixNotationToIdx(notation);
    let field = this.#fields[indexes.col][indexes.row]

    // remove the old marking
    if(this.#currentPiece !== undefined) {
      this.#currentPiece.selected = false;
    }

    // check if there is a piece on the field
    if(field.piece === null) {
      this.#currentPiece = undefined;
      return -1;
    }

    // update current piece reference
    this.#currentPiece = field;
    field.selected = true;

    // highlight the move options for the piece
    let success = this.#highlightMoveOptions(field);

    return success;
  }

  /**
   * Highlight the move options for a piece on a specific field.
   * 1. Detects the piece.
   *    2a. if there is no piece, don't highlight anything.
   * 2. Adds highlight <svg> elements specific to the piece.
   * 
   * @param board: the board to add the highlighting to.
   * @param field: the field to search for the piece
   * @returns: 0 if highlighting was successful, -1 if no piece found or piece type undefined
   */
  #highlightMoveOptions(field) {

    // --- 1. ---
    // see if there is a piece on the field
    if(field.piece === null) {
      return -1;
    }

    let success = -1;
    // --- 2. ---
    switch(field.piece) {
      case 'rook':
        success = this.#drawRookMoveOptions(field);
        break;
      case 'knight':
        success = this.#drawKnightMoveOptions(field);
        break;
      case 'bishop':
        success = this.#drawBishopMoveOptions(field);
        break;
      case 'queen':
        success = this.#drawQueenMoveOptions(field);
        break;
      case 'king':
        success = this.#drawKingMoveOptions(field);
        break;
      case 'pawn':
        success = this.#drawPawnMoveOptions(field);
        break;
    }
    return success;
 }

  /**
   * @returns: the changes made to the board since the last call of this function
   *           as a map: { "A1": {piece, color, selected, highlighted} }
   */
  // TODO: make this more intelligent (don't return the whole board every time)
  getBoardChanges() {
    let changes = {};
    for(let col=0; col<8; col++) {
      for(let row=0; row<8; row++) {
        let field = this.#fields[col][row];
        changes[field.id] = {
          piece: field.piece, 
          color: field.color,
          selected: field.selected,
          highlighted: field.highlighted,
        }
      }
    }
    return changes;
  }
}

