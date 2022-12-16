export default class Board {
  // stores the field, where the current selected piece is placed.
  #currentPiece = undefined;
  // contains all the 64 fields the board consists of
  // [[A1], [A2], [A3], ... , [A8]],
  // [[B1], [B2], [B3], ... , [B8]],
  // [[C1], [C2], [C3], ... , [C8]],
  // ...
  #fields;
  // stores the last move for en passant detection
  // as an object {from:field, to:field}
  // initialized to enable whites first move
  #lastMove = {toField: {color:"black"}};

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
   * field from the chessboard structure.
   *
   * @param notation: the field notation to parse
   * @returns: an field or undefined when the notation is incorrect
   */
  #notationToField(notation) {
    if(typeof notation !== "string" || notation.length !== 2) {
      return undefined;
    }
    let colN = notation[0];
    let rowN = notation[1];

    let startCharCode = 'A'.charCodeAt(0);
    let colCharCode = colN.charCodeAt(0);
    let col = colCharCode - startCharCode;
    let row = Number(rowN)-1;
    if(col < 0 || col > 7) {
      return undefined;
    }
    if(row < 0 || row > 7) {
      return undefined;
    }

    return this.#fields[col][row];
  }

  /**
  * Checks if a piece can move to a field.
  *
  * @param col: the column number of the field
  * @param row: the row number of the field
  * @param color: the color of the piece that wants to move there
  *               used in checking for collisions with other pieces
  *
  * @returns: 0 if field is empty,
  *           1 if occupied by enemy piece (of the other color)
  *          -1 when out o bounds or blocked by own piece
  */
  #checkMoveOption(col, row, color) {

    // detect board bounds
    if(col < 0 || row < 0 || col > 7 || row > 7) {
      return -1;
    }

    let field = this.#fields[col][row];
    // detect other pieces, don't highlight own pieces,
    // but highlight other pieces and give a notification,
    // that a blocking piece was hit
    if(field.piece !== null) {
      if(field.color != color) {
        return 1;
      }
      return -1;
    }

    return 0;
  }

  /**
   * Get the move options for a piece on a specific field.
   * 
   * @param field: the field to search for the piece
   * @returns: an array of fields the piece can move to,
*             [] when the piece is unknown or none present 
   */
  #getMoveOptions(field) {

    // get the move options as array of fields
    let moveOptions;
    switch(field.piece) {
      case 'rook':
        moveOptions = this.#getRookMoveOptions(field);
        break;
      case 'knight':
        moveOptions = this.#getKnightMoveOptions(field);
        break;
      case 'bishop':
        moveOptions = this.#getBishopMoveOptions(field);
        break;
      case 'queen':
        moveOptions = this.#getQueenMoveOptions(field);
        break;
      case 'king':
        moveOptions = this.#getKingMoveOptions(field);
        break;
      case 'pawn':
        moveOptions = this.#getPawnMoveOptions(field);
        break;
      default:
        return [];
    }

    return moveOptions;
  }

  /**
  * Moves a piece from one field to the other in the internal board structure.
  * Also removes all highlighing and selection on the board.
  *
  * @param fromField: the field where the piece stands now
  * @param toField: the field where the piece moves to
  *
  * @returns: 0 if the move was successful
  *          -1 when the move is not possible (out of bounds, blocked or not a move option)
  */
  #movePieceToField(fromField, toField) {
    // check if move is possible
    let moveOptions = this.#getMoveOptions(fromField);
    if(moveOptions.find(field => field === toField) === undefined) {
      return -1;
    }
    // check if move order is correct
    if(this.#lastMove.toField.color == fromField.color) {
      return -1;
    }

    // check for en passant
    if(fromField.piece === 'pawn' && this.#getEnPassantMove(fromField) === toField) {
      this.#fields[toField.col][fromField.row].piece = null;
      this.#fields[toField.col][fromField.row].color = null;
    }

    // move piece values
    toField.piece = fromField.piece;
    toField.color = fromField.color;
    fromField.piece = null;
    fromField.color = null;
    fromField.selected = false;

    // remove all selections
    this.#removeHighlights();
    // update last move
    this.#lastMove = {fromField: fromField, toField: toField};

    return 0;
  }

  /**
  * Moves a piece from one field to the other in the internal board structure
  *
  * @param fromFieldNotation: the chess notation (e.g. 'A1') of the field 
  *         where the piece stands now
  * @param toFieldNotation: the chess notation (e.g. 'B2') of the field
  *         where the piece moves to
  *
  * @returns: 0 if the move was successful
  *          -1 when the move is not possible (out of bounds, blocked or not a move option)
  */
  movePiece(fromFieldNotation, toFieldNotation) {
    let fromField = this.#notationToField(fromFieldNotation);
    let toField = this.#notationToField(toFieldNotation);

    if(fromField === undefined || toField === undefined) {
      return -1;
    }

    return this.#movePieceToField(fromField, toField);
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
  * Returns highlighting on the fields where the rook can move.
  *
  * @param knight: an html div from the board, where the knight stands
  *
  * @returns: an array containing the fields, the knight can move to
  */
  #getKnightMoveOptions(knight) {
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

    // check all move options
    let moves = [];
    for(let move of moveOptions) {
      let newRow = knight.row + move.row;
      let newCol = knight.col + move.col;

      // check if own pieces are blocking the move or out of bounds
      if(this.#checkMoveOption(newCol, newRow, knight.color) != -1) {
        moves.push(this.#fields[newCol][newRow]);
      }
    }

    return moves;
  }

  /**
  * Returns the fields where the bishop can move.
  *
  * @param bishop: a field on the board, where the bishop stands
  *
  * @returns: an array containing the move options
  */
  #getBishopMoveOptions(bishop) {
    // go diagonally into all 4 directions
    let moves = [];
    for(let row = bishop.row+1, column = bishop.col+1;; row++, column++){
      let success = this.#checkMoveOption(column, row, bishop.color);
      if(success >= 0) {
        moves.push(this.#fields[column][row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let row = bishop.row-1, column = bishop.col+1;; row--, column++){
      let success = this.#checkMoveOption(column, row, bishop.color);
      if(success >= 0) {
        moves.push(this.#fields[column][row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let row = bishop.row-1, column = bishop.col-1;; row--, column--) {
      let success = this.#checkMoveOption(column, row, bishop.color);
      if(success >= 0) {
        moves.push(this.#fields[column][row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let row = bishop.row+1, column = bishop.col-1;; row++, column--) {
      let success = this.#checkMoveOption(column, row, bishop.color);
      if(success >= 0) {
        moves.push(this.#fields[column][row])
      }
      if(success != 0) {
        break;
      }
    }

    return moves;
  }

  /**
  * Returns the fields where the queen can move.
  *
  * @param queen: a field, where the queen stands
  *
  * @returns: an array containing the move options
  */
  #getQueenMoveOptions(queen) {
    let rookMoves = this.#getRookMoveOptions(queen);
    let bishopMoves = this.#getBishopMoveOptions(queen);

    return rookMoves.concat(bishopMoves);
  }

  /**
  * Calculates if en passant is possible for the pawn.
  *
  * @param pawn: a field on the board, where the pawn stands
  *
  * @returns: The position, where the pawn moves via en passant 
  *           or null when en passant is not possible
  */
  #getEnPassantMove(pawn) {
    if(pawn.color === "white" && pawn.row != 4) {
      return null;
    }
    if(pawn.color === "black" && pawn.row != 3) {
      return null;
    }
    // get adjaent fields
    // the notation functions are used for boundary check
    let rightField = this.#notationToField(this.#matrixIdxToNotation(pawn.col+1, pawn.row));
    let leftField = this.#notationToField(this.#matrixIdxToNotation(pawn.col-1, pawn.row));
    let direction = (pawn.color === "white") ? 1 : -1;
    
    if(rightField !== undefined 
      && rightField.piece === "pawn" 
      && rightField.color !== pawn.color
    ) {
      let fromField = this.#fields[pawn.col+1][pawn.row + 2*direction];
      if(this.#lastMove.fromField === fromField && this.#lastMove.toField === rightField) {
        return this.#fields[pawn.col+1][pawn.row + direction];
      }
    }
    if(leftField !== undefined 
      && leftField.piece === "pawn" 
      && leftField.color !== pawn.color
    ) {
      let fromField = this.#fields[pawn.col-1][pawn.row + 2*direction];
      if(this.#lastMove.fromField === fromField && this.#lastMove.toField === leftField) {
        return this.#fields[pawn.col-1][pawn.row + direction];
      }
    }

    return null;
  }

  /**
  * Returns the fields where the pawn can move.
  *
  * @param pawn: a field on the board, where the pawn stands
  *
  * @returns: an array containing the move options
  */
  #getPawnMoveOptions(pawn) {
    let direction = (pawn.color == "white")? 1 : -1;
    let isStartPos = (pawn.color == "white" && pawn.row === 1 
                 || pawn.color == "black" && pawn.row === 6);

    let moves = [];
    let success = this.#checkMoveOption(pawn.col, pawn.row + direction, pawn.color);
    if(success === 0) {
      moves.push(this.#fields[pawn.col][pawn.row + direction]);
    }
    // check for starting double jump
    if(success == 0 && isStartPos) {
      success = this.#checkMoveOption(pawn.col, pawn.row + 2*direction, pawn.color);
      if(success === 0) {
        moves.push(this.#fields[pawn.col][pawn.row + 2*direction]);
      }
    }
    // check for enemy pieces to capture
    success = this.#checkMoveOption(pawn.col+1, pawn.row + direction, pawn.color);
    if(success === 1) {
      moves.push(this.#fields[pawn.col+1][pawn.row + direction]);
    }
    success = this.#checkMoveOption(pawn.col-1, pawn.row + direction, pawn.color);
    if(success === 1) {
      moves.push(this.#fields[pawn.col-1][pawn.row + direction]);
    }
    // check for en passant
    let enPassantMove = this.#getEnPassantMove(pawn);
    if(enPassantMove !== null) {
      moves.push(enPassantMove);
    }

    return moves;
  }

  /**
  * Returns the fields where the king can move.
  *
  * @param king: an field on the board, where the king stands
  *
  * @returns: an array containing the move options
  */
  #getKingMoveOptions(king) {
    let moves = [];
    for(let horizontalDirection = -1; horizontalDirection<=1; horizontalDirection++) {
      for(let verticalDirection = -1; verticalDirection<=1; verticalDirection++) {
        // don't return the kings own position
        if(horizontalDirection === 0 && verticalDirection === 0) {
          continue;
        }

        let success = this.#checkMoveOption(king.col + horizontalDirection, king.row + verticalDirection, king.color);
        if(success >= 0) {
          moves.push(this.#fields[king.col + horizontalDirection][king.row + verticalDirection])
        }
      }
    }

    return moves;
  }

  /**
  * Returns the fields where the rook can move.
  *
  * @param rook: an field on the board, where the rook stands
  *
  * @returns: an array containing the move options
  */
  #getRookMoveOptions(rook) {
    let moves = [];
    // go horizontally and vertically into all 4 directions
    for(let row = rook.row+1;; row++) {
      let success = this.#checkMoveOption(rook.col, row, rook.color);
      if(success >= 0) {
        moves.push(this.#fields[rook.col][row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let row = rook.row-1;; row--) {
      let success = this.#checkMoveOption(rook.col, row, rook.color);
      if(success >= 0) {
        moves.push(this.#fields[rook.col][row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let column = rook.col+1;; column++) {
      let success = this.#checkMoveOption(column, rook.row, rook.color);
      if(success >= 0) {
        moves.push(this.#fields[column][rook.row])
      }
      if(success != 0) {
        break;
      }
    }
    for(let column = rook.col-1;; column--) {
      let success = this.#checkMoveOption(column, rook.row, rook.color);
      if(success >= 0) {
        moves.push(this.#fields[column][rook.row])
      }
      if(success != 0) {
        break;
      }
    }

    return moves;
  }

  /**
   * This checks if there is a piece on the field, 
   * removes the highlighting of the old piece and highlights 
   * the new one.
   *
   * @param notation: the column-row string (e.g. "A1") where the piece stands
   * @return: 0 if selection was successful, -1 if no piece found or notation wrong
   */
  selectPiece(notation) {
    // --- 1. ---
    this.#removeHighlights();

    let field = this.#notationToField(notation);
    if( field === undefined ) {
      return -1;
    }

    // remove the old marking
    if(this.#currentPiece !== undefined) {
      this.#currentPiece.selected = false;
    }

    // check if there is a piece on the field
    if(field.piece === null) {
      this.#currentPiece = undefined;
      return -1;
    }
    // check if its the players turn
    if(this.#lastMove.toField.color === field.color) {
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
   * 
   * @param board: the board to add the highlighting to.
   * @param field: the field to search for the piece
   * @returns: 0 if highlighting was successful, -1 if no piece found or piece type undefined
   */
  #highlightMoveOptions(field) {

    // get the move options as array of fields
    let moveOptions = this.#getMoveOptions(field);

    // apply the highlight on the move options
    for(let option of moveOptions) {
      this.#fields[option.col][option.row].highlighted = true;
    }
    return 0;
  }

  /**
   * @returns: the changes made to the board since the last call of this function
   *           as a map: { "A1": {piece, color, selected, highlighted} }
   */
  // TODO: make this more intelligent (don't return the whole board every time)
  // then: alter tests to expect exact number of changes
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

