import Board from "../js/board.js";

let checkChanges = function(changes, expectedSelected, expectedHighlight, expectedPieces) {

  let context = "Context: \nexpected selected: "  + expectedSelected
    + "\nexpected highlighted: " + expectedHighlight
    + "\nexpected pieces: " + JSON.stringify(expectedPieces, null, 4)
    + "\nchanges: " + JSON.stringify(changes, null, 4)

  for(const [position, properties] of Object.entries(changes)) {
    if(position == expectedSelected) {
      expect(properties.selected, context).toBeTruthy();
    } else {
      expect(properties.selected, context).toBeFalsy();
    }

    if(expectedHighlight.find(elem => elem == position)) {
      expect(properties.highlighted, context).toBeTruthy();
    } else {
      expect(properties.highlighted, context).toBeFalsy();
    }

    for(let expected of expectedPieces) {
      if(expected.id == position) {
        expect(properties.piece, context).toBe(expected.piece);
        expect(properties.color, context).toBe(expected.color);
      }
    }
  }
}

describe("tests board starting configuration", () => {
  it("checks that no out of bounds field can be selected", () => {
    let board = new Board();
    expect(board.selectPiece('testing')).toBe(-1);
    expect(board.selectPiece('A0')).toBe(-1);
    expect(board.selectPiece('A9')).toBe(-1);
    expect(board.selectPiece('I1')).toBe(-1);
  });

  it("checks that piece detection works", () => {
    let board = new Board();
    expect(board.selectPiece('A1')).toBe(-1);
    expect(board.selectPiece('B1')).toBe(-1);
    expect(board.selectPiece('C1')).toBe(-1);
    expect(board.selectPiece('D1')).toBe(-1);
    expect(board.selectPiece('E1')).toBe(-1);
    expect(board.selectPiece('F1')).toBe(-1);
    expect(board.selectPiece('G1')).toBe(-1);
    expect(board.selectPiece('H1')).toBe(-1);

    expect(board.selectPiece('A2')).toBe(-1);
    expect(board.selectPiece('B2')).toBe(-1);
    expect(board.selectPiece('C2')).toBe(-1);
    expect(board.selectPiece('D2')).toBe(-1);
    expect(board.selectPiece('E2')).toBe(-1);
    expect(board.selectPiece('F2')).toBe(-1);
    expect(board.selectPiece('G2')).toBe(-1);
    expect(board.selectPiece('H2')).toBe(-1);

    expect(board.selectPiece('A3')).toBe(-1);
    expect(board.selectPiece('B3')).toBe(-1);
    expect(board.selectPiece('C3')).toBe(-1);
    expect(board.selectPiece('D3')).toBe(-1);
    expect(board.selectPiece('E3')).toBe(-1);
    expect(board.selectPiece('F3')).toBe(-1);
    expect(board.selectPiece('G3')).toBe(-1);
    expect(board.selectPiece('H3')).toBe(-1);

    expect(board.selectPiece('A4')).toBe(-1);
    expect(board.selectPiece('B4')).toBe(-1);
    expect(board.selectPiece('C4')).toBe(-1);
    expect(board.selectPiece('D4')).toBe(-1);
    expect(board.selectPiece('E4')).toBe(-1);
    expect(board.selectPiece('F4')).toBe(-1);
    expect(board.selectPiece('G4')).toBe(-1);
    expect(board.selectPiece('H4')).toBe(-1);

    expect(board.selectPiece('A5')).toBe(-1);
    expect(board.selectPiece('B5')).toBe(-1);
    expect(board.selectPiece('C5')).toBe(-1);
    expect(board.selectPiece('D5')).toBe(-1);
    expect(board.selectPiece('E5')).toBe(-1);
    expect(board.selectPiece('F5')).toBe(-1);
    expect(board.selectPiece('G5')).toBe(-1);
    expect(board.selectPiece('H5')).toBe(-1);
    
    expect(board.selectPiece('A6')).toBe(-1);
    expect(board.selectPiece('B6')).toBe(-1);
    expect(board.selectPiece('C6')).toBe(-1);
    expect(board.selectPiece('D6')).toBe(-1);
    expect(board.selectPiece('E6')).toBe(-1);
    expect(board.selectPiece('F6')).toBe(-1);
    expect(board.selectPiece('G6')).toBe(-1);
    expect(board.selectPiece('H6')).toBe(-1);
    
    expect(board.selectPiece('A7')).toBe(-1);
    expect(board.selectPiece('B7')).toBe(-1);
    expect(board.selectPiece('C7')).toBe(-1);
    expect(board.selectPiece('D7')).toBe(-1);
    expect(board.selectPiece('E7')).toBe(-1);
    expect(board.selectPiece('F7')).toBe(-1);
    expect(board.selectPiece('G7')).toBe(-1);
    expect(board.selectPiece('H7')).toBe(-1);

    expect(board.selectPiece('A8')).toBe(-1);
    expect(board.selectPiece('B8')).toBe(-1);
    expect(board.selectPiece('C8')).toBe(-1);
    expect(board.selectPiece('D8')).toBe(-1);
    expect(board.selectPiece('E8')).toBe(-1);
    expect(board.selectPiece('F8')).toBe(-1);
    expect(board.selectPiece('G8')).toBe(-1);
    expect(board.selectPiece('H8')).toBe(-1);
  });

  it("checks if all pieces are in place", () => {
    let board = new Board();
    board.setStartingConfiguration();

    let changes = board.getBoardChanges(); 

    let expectedSelected = null;
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: "A1", piece: "rook", color: "white"},
      {id: "B1", piece: "knight", color: "white"},
      {id: "C1", piece: "bishop", color: "white"},
      {id: "D1", piece: "queen", color: "white"},
      {id: "E1", piece: "king", color: "white"},
      {id: "F1", piece: "bishop", color: "white"},
      {id: "G1", piece: "knight", color: "white"},
      {id: "H1", piece: "rook", color: "white"},

      {id: "A2", piece: "pawn", color: "white"},
      {id: "B2", piece: "pawn", color: "white"},
      {id: "C2", piece: "pawn", color: "white"},
      {id: "D2", piece: "pawn", color: "white"},
      {id: "E2", piece: "pawn", color: "white"},
      {id: "F2", piece: "pawn", color: "white"},
      {id: "G2", piece: "pawn", color: "white"},
      {id: "H2", piece: "pawn", color: "white"},

      {id: "A3", piece: null, color: null},
      {id: "B3", piece: null, color: null},
      {id: "C3", piece: null, color: null},
      {id: "D3", piece: null, color: null},
      {id: "E3", piece: null, color: null},
      {id: "F3", piece: null, color: null},
      {id: "G3", piece: null, color: null},
      {id: "H3", piece: null, color: null},

      {id: "A4", piece: null, color: null},
      {id: "B4", piece: null, color: null},
      {id: "C4", piece: null, color: null},
      {id: "D4", piece: null, color: null},
      {id: "E4", piece: null, color: null},
      {id: "F4", piece: null, color: null},
      {id: "G4", piece: null, color: null},
      {id: "H4", piece: null, color: null},

      {id: "A5", piece: null, color: null},
      {id: "B5", piece: null, color: null},
      {id: "C5", piece: null, color: null},
      {id: "D5", piece: null, color: null},
      {id: "E5", piece: null, color: null},
      {id: "F5", piece: null, color: null},
      {id: "G5", piece: null, color: null},
      {id: "H5", piece: null, color: null},

      {id: "A6", piece: null, color: null},
      {id: "B6", piece: null, color: null},
      {id: "C6", piece: null, color: null},
      {id: "D6", piece: null, color: null},
      {id: "E6", piece: null, color: null},
      {id: "F6", piece: null, color: null},
      {id: "G6", piece: null, color: null},
      {id: "H6", piece: null, color: null},

      {id: "A7", piece: "pawn", color: "black"},
      {id: "B7", piece: "pawn", color: "black"},
      {id: "C7", piece: "pawn", color: "black"},
      {id: "D7", piece: "pawn", color: "black"},
      {id: "E7", piece: "pawn", color: "black"},
      {id: "F7", piece: "pawn", color: "black"},
      {id: "G7", piece: "pawn", color: "black"},
      {id: "H7", piece: "pawn", color: "black"},

      {id: "A8", piece: "rook", color: "black"},
      {id: "B8", piece: "knight", color: "black"},
      {id: "C8", piece: "bishop", color: "black"},
      {id: "D8", piece: "queen", color: "black"},
      {id: "E8", piece: "king", color: "black"},
      {id: "F8", piece: "bishop", color: "black"},
      {id: "G8", piece: "knight", color: "black"},
      {id: "H8", piece: "rook", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });
});

describe("move rules", () => {
  it("rejects impossible moves", () => {
    let board = new Board();
    board.setStartingConfiguration();

    let ret = board.movePiece("from", "A3");
    expect(ret).toBe(-1);
    ret = board.movePiece("A2", "towards");
    expect(ret).toBe(-1);
    ret = board.movePiece("A2", "B3");
    expect(ret).toBe(-1);
    // Rook cannot move from start
    ret = board.movePiece("A1", "A3");
    expect(ret).toBe(-1);
    // no piece to move on the field
    ret = board.movePiece("A4", "A5");
    expect(ret).toBe(-1);
  });

  it("no player can move twice in a row", () => {
    let board = new Board();
    board.setStartingConfiguration();

    // first move is ok
    let ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);
    // white can not move any more
    ret = board.movePiece("E3", "E4");
    expect(ret).toBe(-1);
    // also with 2nd try
    ret = board.movePiece("E3", "E4");
    expect(ret).toBe(-1);

    // blacks move
    ret = board.movePiece("E7", "E6");
    expect(ret).toBe(0);
    // black can not move any more
    ret = board.movePiece("E6", "E5");
    expect(ret).toBe(-1);
    // also with 2nd try
    ret = board.movePiece("E6", "E5");
    expect(ret).toBe(-1);
  });

  it("black cannot move first", () => {
    let board = new Board();
    board.setStartingConfiguration();

    let ret = board.movePiece("E7", "E6");
    expect(ret).toBe(-1);
  });

  it("only active player can be highlighted", () => {
    let board = new Board();
    board.setStartingConfiguration();

    // black cannot be selected first
    let ret = board.selectPiece("A8");
    expect(ret).toBe(-1);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(0);
    checkChanges(changes, null, [], []);

    // white cannot be selected on blacks turn
    board.movePiece("A2", "A3");
    ret = board.selectPiece("B2");
    expect(ret).toBe(-1);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(0);
    checkChanges(changes, null, [], []);
  });
});

describe("capture rules", () => {
  it("all pieces (except pawns) can capture in their move directions", () => {
    let board = new Board();
    board.setStartingConfiguration();

    // Nc3
    let ret = board.movePiece("B1", "C3");
    expect(ret).toBe(0);
    // .., d5;
    ret = board.movePiece("D7", "D5");
    expect(ret).toBe(0);
    // .., d5;
    // Nxd5
    ret = board.movePiece("C3", "D5");
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(5);

    let expectedPieces = [ 
      {id: "D5", piece: "knight", color: "white"},
      {id: "B1", piece: null, color: null},
      {id: "C3", piece: null, color: null},
      {id: "D7", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // ..,Qxd5
    ret = board.movePiece("D8", "D5");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "D5", piece: "queen", color: "black"},
      {id: "D8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // a4
    ret = board.movePiece("A2", "A4");
    expect(ret).toBe(0);
    // ..,Qa2
    ret = board.movePiece("D5", "A2");
    expect(ret).toBe(0);
    // Rxa2
    ret = board.movePiece("A1", "A2");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "A2", piece: "rook", color: "white"},
      {id: "A4", piece: "pawn", color: "white"},
      {id: "A1", piece: null, color: null},
      {id: "D5", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // ..,Bg4
    ret = board.movePiece("C8", "G4");
    expect(ret).toBe(0);
    // h3
    ret = board.movePiece("H2", "H3");
    expect(ret).toBe(0);
    // ..,Bxe2
    ret = board.movePiece("G4", "E2");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "E2", piece: "bishop", color: "black"},
      {id: "H3", piece: "pawn", color: "white"},
      {id: "G4", piece: null, color: null},
      {id: "C8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Kxe2
    ret = board.movePiece("E1", "E2");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "E2", piece: "king", color: "white"},
      {id: "E1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
  });

  it("pawn diagonal capture rules", () => {
    let board = new Board();
    board.setStartingConfiguration();

    // e4
    let ret = board.movePiece("E2", "E4");
    expect(ret).toBe(0);
    // ..,d5
    ret = board.movePiece("D7", "D5");
    expect(ret).toBe(0);
    // xd5
    ret = board.movePiece("E4", "D5");
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(5);

    let expectedPieces = [ 
      {id: "D5", piece: "pawn", color: "white"},
      {id: "E2", piece: null, color: null},
      {id: "D7", piece: null, color: null},
      {id: "E4", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
    // ..,e6
    ret = board.movePiece("E7", "E6");
    expect(ret).toBe(0);
    // xe6
    ret = board.movePiece("D5", "E6");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "E6", piece: "pawn", color: "white"},
      {id: "E7", piece: null, color: null},
      {id: "D5", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
    // ..,xe6
    ret = board.movePiece("F7", "E6");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "E6", piece: "pawn", color: "black"},
      {id: "F7", piece: null, color: null},
      {id: "D5", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
  });
  it("en passant", () => {
    let board = new Board();
    board.setStartingConfiguration();

    // e4
    let ret = board.movePiece("A2", "A4");
    expect(ret).toBe(0);
    // ..,d5
    ret = board.movePiece("H7", "H5");
    expect(ret).toBe(0);
    // e5
    ret = board.movePiece("A4", "A5");
    expect(ret).toBe(0);
    // ..,f5
    ret = board.movePiece("B7", "B5");
    expect(ret).toBe(0);
    // xf6
    ret = board.movePiece("A5", "B6");
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 

    let expectedPieces = [ 
      {id: "B6", piece: "pawn", color: "white"},
      {id: "B7", piece: null, color: null},
      {id: "B5", piece: null, color: null},
      {id: "A5", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
    // ..,h4
    ret = board.movePiece("H5", "H4");
    expect(ret).toBe(0);
    // g4
    ret = board.movePiece("G2", "G4");
    expect(ret).toBe(0);
    // ..,xg3
    ret = board.movePiece("H4", "G3");
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "G3", piece: "pawn", color: "black"},
      {id: "G4", piece: null, color: null},
      {id: "H4", piece: null, color: null},
      {id: "G2", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
    
    // d4
    ret = board.movePiece("D2", "D4");
    expect(ret).toBe(0);

    // ..,e6
    ret = board.movePiece("E7", "E6");
    expect(ret).toBe(0);
    
    // d5
    ret = board.movePiece("D4", "D5");
    expect(ret).toBe(0);

    // ..,e5
    ret = board.movePiece("E6", "E5");
    expect(ret).toBe(0);
    
    // xe6 not possible because of last move not being double
    ret = board.movePiece("D5", "E6");
    expect(ret).toBe(-1);
    
    // Qd2 random move
    ret = board.movePiece("D1", "D2");
    expect(ret).toBe(0);

    // ..,c5 get in position for en passant
    ret = board.movePiece("C7", "C5");
    expect(ret).toBe(0);
    
    // Qd3 random in between move
    ret = board.movePiece("D2", "D3");
    expect(ret).toBe(0);

    // ..,Ke7 random in between move
    ret = board.movePiece("E8", "E7");
    expect(ret).toBe(0);
    
    // xc6 not possible because of last move not being double
    ret = board.movePiece("D5", "C6");
    expect(ret).toBe(-1);
  });
});

describe("tests pawn behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct double move option on starting position", () => {
    // check all the white pawns
    for(let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
      let start = col + '2';
      let sel1 = col + '3';
      let sel2 = col + '4';

      let ret = board.selectPiece(start)
      expect(ret).toBe(0);

      let changes = board.getBoardChanges(); 
      expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

      let expectedSelected = start;
      let expectedHighlight = [sel1, sel2];
      let expectedPieces = [ 
        {id: start, piece: "pawn", color: "white"},
        {id: sel1, piece: null, color: null},
        {id: sel2, piece: null, color: null},
      ];
      checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
    }

    // check all the black pawns
    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");
    for(let col of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) {
      let start = col + '7';
      let sel1 = col + '6';
      let sel2 = col + '5';

      let ret = board.selectPiece(start)
      expect(ret).toBe(0);

      let changes = board.getBoardChanges(); 
      expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

      let expectedSelected = start;
      let expectedHighlight = [sel1, sel2];
      let expectedPieces = [ 
        {id: start, piece: "pawn", color: "black"},
        {id: sel1, piece: null, color: null},
        {id: sel2, piece: null, color: null},
      ];
      checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
    }
  });

  it("can be moved from the starting position", () => {
    let ret = board.movePiece("A2", "A3");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedSelected = null;
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: "A3", piece: "pawn", color: "white"},
      {id: "A2", piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // double move
    ret = board.movePiece("E7", "E5");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedSelected = null;
    expectedHighlight = [];
    expectedPieces = [ 
      {id: "E5", piece: "pawn", color: "black"},
      {id: "E7", piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    //move opposite to black
    ret = board.movePiece("E2", "E4");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedSelected = null;
    expectedHighlight = [];
    expectedPieces = [ 
      {id: "E4", piece: "pawn", color: "white"},
      {id: "E2", piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
    
    // blacks e-pawn cannot move
    ret = board.movePiece("E5", "E4");
    expect(ret).toBe(-1);

    // random black move
    ret = board.movePiece("H7", "H6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedSelected = null;
    expectedHighlight = [];
    expectedPieces = [ 
      {id: "H6", piece: "pawn", color: "black"},
      {id: "H7", piece: null, color: null},
    ];

    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // whites a pawn can move again
    ret = board.movePiece("A3", "A4");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedSelected = null;
    expectedHighlight = [];
    expectedPieces = [ 
      {id: "A4", piece: "pawn", color: "white"},
      {id: "A3", piece: null, color: null},
    ];

    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
    
    // ..,h5 random move to enable white
    ret = board.movePiece("H6", "H5");
    expect(ret).toBe(0);
    
    // a5 block the double move for black
    ret = board.movePiece("A4", "A5");
    expect(ret).toBe(0);

    // ..,a5 black cannot double move
    ret = board.movePiece("A7", "A5");
    expect(ret).toBe(-1);
  });
});

describe("tests knight behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct starting move options", () => {
    // knight on b1
    let ret = board.selectPiece('B1')
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

    let expectedSelected = "B1";
    let expectedHighlight = ["A3", "C3"];
    let expectedPieces = [ 
      {id: expectedSelected, piece: "knight", color: "white"},
      {id: expectedHighlight[0], piece: null, color: null},
      {id: expectedHighlight[1], piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // knight on g1
    ret = board.selectPiece('G1')
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

    expectedSelected = "G1";
    expectedHighlight = ["F3", "H3"];
    expectedPieces = [ 
      {id: expectedSelected, piece: "knight", color: "white"},
      {id: expectedHighlight[0], piece: null, color: null},
      {id: expectedHighlight[1], piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");
    // knight on g8
    ret = board.selectPiece('G8')
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

    expectedSelected = "G8";
    expectedHighlight = ["F6", "H6"];
    expectedPieces = [ 
      {id: expectedSelected, piece: "knight", color: "black"},
      {id: expectedHighlight[0], piece: null, color: null},
      {id: expectedHighlight[1], piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // knight on b8
    ret = board.selectPiece('B8')
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

    expectedSelected = "B8";
    expectedHighlight = ["A6", "C6"];
    expectedPieces = [ 
      {id: expectedSelected, piece: "knight", color: "black"},
      {id: expectedHighlight[0], piece: null, color: null},
      {id: expectedHighlight[1], piece: null, color: null},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });
  it("can move around", () => {
    // Nc3
    let ret = board.movePiece("B1", "C3");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedPieces = [ 
      {id: "C3", piece: "knight", color: "white"},
      {id: "B1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Nf6
    ret = board.movePiece("G8", "F6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "F6", piece: "knight", color: "black"},
      {id: "G8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Na4
    ret = board.movePiece("C3", "A4");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "A4", piece: "knight", color: "white"},
      {id: "C3", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Nc6
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "C6", piece: "knight", color: "black"},
      {id: "B8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Nb2, impossible because of pawn
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(-1);
    // Ng3, impossible because of movement options
    ret = board.movePiece("G1", "G3");
    expect(ret).toBe(-1);
  });
});

describe("tests rook behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct starting move options", () => {
    let ret = board.selectPiece('A1')
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    let expectedSelected = "A1";
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: expectedSelected, piece: "rook", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    ret = board.selectPiece('H1')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "H1";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "rook", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");

    ret = board.selectPiece('A8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "A8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "rook", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    ret = board.selectPiece('H8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "H8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "rook", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });

  it("moves around", () => {
    // bring pawn out of the way
    board.movePiece("A2", "A4");
    board.movePiece("H7", "H5");
    // Ra3
    let ret = board.movePiece("A1", "A3");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedPieces = [ 
      {id: "A3", piece: "rook", color: "white"},
      {id: "A1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Rh6
    ret = board.movePiece("H8", "H6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "H6", piece: "rook", color: "black"},
      {id: "H8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Rc3
    ret = board.movePiece("A3", "C3");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "C3", piece: "rook", color: "white"},
      {id: "A3", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Rc6
    ret = board.movePiece("H6", "C6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "C6", piece: "rook", color: "black"},
      {id: "H6", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // impossible moves
    // Rd4, diagonal move
    ret = board.movePiece("C3", "D4");
    expect(ret).toBe(-1);
    // Rc7, move over a enemy piece
    ret = board.movePiece("C3", "C7");
    expect(ret).toBe(-1);
    // RC2, blocked by own piece
    ret = board.movePiece("C3", "C2");
    expect(ret).toBe(-1);
  });
});

describe("tests bishop behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct starting move options", () => {
    let ret = board.selectPiece('C1')
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    let expectedSelected = "C1";
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: expectedSelected, piece: "bishop", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    ret = board.selectPiece('F1')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "F1";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "bishop", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");

    ret = board.selectPiece('C8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "C8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "bishop", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    ret = board.selectPiece('F8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "F8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "bishop", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });

  it("moves around", () => {
    // bring pawns out of the way
    board.movePiece("E2", "E4");
    board.movePiece("E7", "E5");
    // Bc4
    let ret = board.movePiece("F1", "C4");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedPieces = [ 
      {id: "C4", piece: "bishop", color: "white"},
      {id: "F1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Bd6
    ret = board.movePiece("F8", "D6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "D6", piece: "bishop", color: "black"},
      {id: "F8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Be6
    ret = board.movePiece("C4", "E6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "E6", piece: "bishop", color: "white"},
      {id: "C4", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Be7
    ret = board.movePiece("D6", "E7");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "E7", piece: "bishop", color: "black"},
      {id: "D6", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // impossible moves
    // Bf6, non-diagonal move
    ret = board.movePiece("E6", "F6");
    expect(ret).toBe(-1);
    // Bg8, move over a enemy piece
    ret = board.movePiece("E6", "G8");
    expect(ret).toBe(-1);
    // Ba2, blocked by own piece
    ret = board.movePiece("E6", "A2");
    expect(ret).toBe(-1);
  });
});

describe("tests queen behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct starting move options", () => {
    let ret = board.selectPiece('D1')
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    let expectedSelected = "D1";
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: expectedSelected, piece: "queen", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");

    ret = board.selectPiece('D8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "D8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "queen", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });

  it("moves around", () => {
    // bring pawns out of the way
    board.movePiece("E2", "E4");
    board.movePiece("E7", "E5");
    // Qe2
    let ret = board.movePiece("D1", "E2");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedPieces = [ 
      {id: "E2", piece: "queen", color: "white"},
      {id: "D1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Qg5
    ret = board.movePiece("D8", "G5");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "G5", piece: "queen", color: "black"},
      {id: "D8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Qe3
    ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "E3", piece: "queen", color: "white"},
      {id: "E2", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Qg3
    ret = board.movePiece("G5", "G3");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "G3", piece: "queen", color: "black"},
      {id: "G5", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // impossible moves
    // Qg4, not a move option
    ret = board.movePiece("E3", "G4");
    expect(ret).toBe(-1);
    // Qh3, move over an enemy piece
    ret = board.movePiece("E3", "H3");
    expect(ret).toBe(-1);
    // Qc1, blocked by own piece
    ret = board.movePiece("E3", "C1");
    expect(ret).toBe(-1);
  });
});


describe("tests king behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct starting move options", () => {
    let ret = board.selectPiece('E1')
    expect(ret).toBe(0);
    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    let expectedSelected = "E1";
    let expectedHighlight = [];
    let expectedPieces = [ 
      {id: expectedSelected, piece: "king", color: "white"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);

    // move a piece, to enable blacks move
    board.movePiece("A2", "A3");

    ret = board.selectPiece('E8')
    expect(ret).toBe(0);
    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(1);
    expectedSelected = "E8";
    expectedHighlight = [];
    expectedPieces = [ 
      {id: expectedSelected, piece: "king", color: "black"},
    ];
    checkChanges(changes, expectedSelected, expectedHighlight, expectedPieces);
  });

  it("moves around", () => {
    // bring pawns out of the way
    board.movePiece("E2", "E4");
    board.movePiece("D7", "D5");
    // Ke2
    let ret = board.movePiece("E1", "E2");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    let expectedPieces = [ 
      {id: "E2", piece: "king", color: "white"},
      {id: "E1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Kd7
    ret = board.movePiece("E8", "D7");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "D7", piece: "king", color: "black"},
      {id: "E8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // Kd3
    ret = board.movePiece("E2", "D3");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "D3", piece: "king", color: "white"},
      {id: "E2", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // .., Kd6
    ret = board.movePiece("D7", "D6");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(2);

    expectedPieces = [ 
      {id: "D6", piece: "king", color: "black"},
      {id: "D7", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // impossible moves
    // Kf3, not a move option
    ret = board.movePiece("D3", "F3");
    expect(ret).toBe(-1);
    // Ke4, blocked by own piece
    ret = board.movePiece("D3", "E4");
    expect(ret).toBe(-1);
  });

  it("can castle both sides", () => {
    // try to castle
    let ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);
    // Nf3
    ret = board.movePiece("G1", "F3");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
    // ..,Nc6
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);
    // e3
    ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
    // ..,d6
    ret = board.movePiece("D7", "D6");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);
    // Bd3
    ret = board.movePiece("F1", "D3");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
    // ..,Be6
    ret = board.movePiece("C8", "E6");
    expect(ret).toBe(0);

    // O-O
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 

    let expectedPieces = [ 
      {id: "G1", piece: "king", color: "white"},
      {id: "F1", piece: "rook", color: "white"},
      {id: "E1", piece: null, color: null},
      {id: "H1", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);

    // try to castle
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
    // .., Qd7
    ret = board.movePiece("D8", "D7");
    expect(ret).toBe(0);

    // Re1
    ret = board.movePiece("F1", "E1");
    expect(ret).toBe(0);

    // .., O-O-O
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(0);

    changes = board.getBoardChanges(); 

    expectedPieces = [ 
      {id: "C8", piece: "king", color: "black"},
      {id: "D8", piece: "rook", color: "black"},
      {id: "A8", piece: null, color: null},
      {id: "E8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
  });

  it("cannot castle when king moved", () => {
    // Nf3
    let ret = board.movePiece("G1", "F3");
    expect(ret).toBe(0);

    // ..,Nc6
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(0);

    // e3
    ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);

    // ..,d6
    ret = board.movePiece("D7", "D6");
    expect(ret).toBe(0);

    // Bd3
    ret = board.movePiece("F1", "D3");
    expect(ret).toBe(0);

    // ..,Be6
    ret = board.movePiece("C8", "E6");
    expect(ret).toBe(0);
    
    // Ke2 moving the king
    ret = board.movePiece("E1", "E2");
    expect(ret).toBe(0);

    // ..,Qd7
    ret = board.movePiece("D8", "D7");
    expect(ret).toBe(0);
    
    // Ke1 moving king back
    ret = board.movePiece("E2", "E1");
    expect(ret).toBe(0);

    // ..,Kd8 moving king
    ret = board.movePiece("E8", "D8");
    expect(ret).toBe(0);
    
    // O-O try castling
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);

    // h3 random move to enable black
    ret = board.movePiece("H2", "H3");
    expect(ret).toBe(0);

    // ..,K28 moving king back
    ret = board.movePiece("D8", "E8");
    expect(ret).toBe(0);
    
    // h4 random move to enable black
    ret = board.movePiece("H3", "H4");
    expect(ret).toBe(0);

    // .., O-O-O try castling
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
  });

  it("cannot castle when king or pawn attack castling squares", () => {
    // e3
    let ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);

    // ..,d6
    ret = board.movePiece("D7", "D6");
    expect(ret).toBe(0);

    // Ba6
    ret = board.movePiece("F1", "A6");
    expect(ret).toBe(0);

    // ..,Kd7
    ret = board.movePiece("E8", "D7");
    expect(ret).toBe(0);

    // Ne2
    ret = board.movePiece("G1", "E2");
    expect(ret).toBe(0);

    // ..,g5
    ret = board.movePiece("G7", "G5");
    expect(ret).toBe(0);
    
    // h4
    ret = board.movePiece("H2", "H4");
    expect(ret).toBe(0);

    // ..,xh4
    ret = board.movePiece("G5", "H4");
    expect(ret).toBe(0);
    
    // g4
    ret = board.movePiece("G2", "G4");
    expect(ret).toBe(0);

    // ..,Ke6
    ret = board.movePiece("D7", "E6");
    expect(ret).toBe(0);
    
    // g5
    ret = board.movePiece("G4", "G5");
    expect(ret).toBe(0);

    // ..,Ke5
    ret = board.movePiece("E6", "E5");
    expect(ret).toBe(0);
    
    // g6
    ret = board.movePiece("G5", "G6");
    expect(ret).toBe(0);

    // ..,Ke4
    ret = board.movePiece("E5", "E4");
    expect(ret).toBe(0);
    
    // g7
    ret = board.movePiece("G6", "G7");
    expect(ret).toBe(0);

    // ..,Kf3
    ret = board.movePiece("E4", "F3");
    expect(ret).toBe(0);
    
    // a3
    ret = board.movePiece("A2", "A3");
    expect(ret).toBe(0);

    // ..,Kg2
    ret = board.movePiece("F3", "G2");
    expect(ret).toBe(0);
    
    // O-O castling should be prevented by king
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);

    // a4
    ret = board.movePiece("A3", "A4");
    expect(ret).toBe(0);

    // ..,Kf3
    ret = board.movePiece("G2", "F3");
    expect(ret).toBe(0);
    
    // a5
    ret = board.movePiece("A4", "A5");
    expect(ret).toBe(0);

    // ..,h3
    ret = board.movePiece("H4", "H3");
    expect(ret).toBe(0);
    
    // b3
    ret = board.movePiece("B2", "B3");
    expect(ret).toBe(0);

    // ..,h2
    ret = board.movePiece("H3", "H2");
    expect(ret).toBe(0);
    
    // O-O castling should be prevented by pawn
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);
  });

  it("cannot castle when rook moved", () => {
    // Nf3
    let ret = board.movePiece("G1", "F3");
    expect(ret).toBe(0);

    // ..,Nc6
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(0);

    // e3
    ret = board.movePiece("E2", "E3");
    expect(ret).toBe(0);

    // ..,d6
    ret = board.movePiece("D7", "D6");
    expect(ret).toBe(0);

    // Bd3
    ret = board.movePiece("F1", "D3");
    expect(ret).toBe(0);

    // ..,Be6
    ret = board.movePiece("C8", "E6");
    expect(ret).toBe(0);
    
    // h3
    ret = board.movePiece("H2", "H3");
    expect(ret).toBe(0);

    // ..,Qd7
    ret = board.movePiece("D8", "D7");
    expect(ret).toBe(0);

    // Rh2 moving rook
    ret = board.movePiece("H1", "H2");
    expect(ret).toBe(0);

    // ..,a5
      ret = board.movePiece("A7", "A5");
    expect(ret).toBe(0);

    // Rh1 moving rook back
    ret = board.movePiece("H2", "H1");
    expect(ret).toBe(0);

    // ..,Ra6
    ret = board.movePiece("A8", "A6");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E1", "G1");
    expect(ret).toBe(-1);
    
    // h4 random move to give black a turn
    ret = board.movePiece("H3", "H4");
    expect(ret).toBe(0);

    // ..,Ra8 move rook back
    ret = board.movePiece("A6", "A8");
    expect(ret).toBe(0);

    // h5 random move to give black a turn
    ret = board.movePiece("H4", "H5");
    expect(ret).toBe(0);

    // try to castle
    ret = board.movePiece("E8", "C8");
    expect(ret).toBe(-1);
  });

  it("cannot castle when attacked or castling fields attacked", () => {
    // e4
    let ret = board.movePiece("E2", "E4");
    expect(ret).toBe(0);

    // ..,e5
    ret = board.movePiece("E7", "E5");
    expect(ret).toBe(0);

    // d4
    ret = board.movePiece("D2", "D4");
    expect(ret).toBe(0);

    // ..,d5
    ret = board.movePiece("D7", "D5");
    expect(ret).toBe(0);

    // b3
    ret = board.movePiece("B2", "B3");
    expect(ret).toBe(0);

    // ..,g6
    ret = board.movePiece("G7", "G6");
    expect(ret).toBe(0);

    // Na3
    ret = board.movePiece("B1", "A3");
    expect(ret).toBe(0);

    // ..,Nh6
    ret = board.movePiece("G8", "H6");
    expect(ret).toBe(0);

    // Qd3
    ret = board.movePiece("D1", "D3");
    expect(ret).toBe(0);

    // ..,Be7
    ret = board.movePiece("F8", "E7");
    expect(ret).toBe(0);

    // Bxh6
    ret = board.movePiece("C1", "H6");
    expect(ret).toBe(0);

    // .., O-O not possible, F8 is attacked
    ret = board.movePiece("E8", "G8");
    expect(ret).toBe(-1);

    // ..,Bg4
    ret = board.movePiece("C8", "G4");
    expect(ret).toBe(0);

    // O-O-O not possible, D1 is attacked
    ret = board.movePiece("E1", "C1");
    expect(ret).toBe(-1);

    // Nf3 blocking the attack
    ret = board.movePiece("G1", "F3");
    expect(ret).toBe(0);

    // ..,Bxa3
    ret = board.movePiece("E7", "A3");
    expect(ret).toBe(0);

    // O-O-O not possible, C1 is attacked
    ret = board.movePiece("E1", "C1");
    expect(ret).toBe(-1);

    // Be3 freeing the attack on the F8 square
    ret = board.movePiece("H6", "E3");
    expect(ret).toBe(0);

    // ..,f6
    ret = board.movePiece("F7", "F6");
    expect(ret).toBe(0);

    // Qb5+ black king in check
    ret = board.movePiece("D3", "B5");
    expect(ret).toBe(0);

    // .., O-O not possible, king is attacked
    ret = board.movePiece("E8", "G8");
    expect(ret).toBe(-1);

    // ..,Nc6 blocking the check
    ret = board.movePiece("B8", "C6");
    expect(ret).toBe(0);

    // Qd5 attacking G8
    ret = board.movePiece("B5", "D5");
    expect(ret).toBe(0);

    // .., O-O not possible, G8 is attacked
    ret = board.movePiece("E8", "G8");
    expect(ret).toBe(-1);

    // ..,Bb4+ white king in check
    ret = board.movePiece("A3", "B4");
    expect(ret).toBe(0);

    // O-O-O not possible, king is attacked
    ret = board.movePiece("E1", "C1");
    expect(ret).toBe(-1);

    // Bd2 blocking the check
    ret = board.movePiece("E3", "D2");
    expect(ret).toBe(0);

    // Qxd5 removing attacker on F8
    ret = board.movePiece("D8", "D5");
    expect(ret).toBe(0);

    // O-O-O white can finally castle
    ret = board.movePiece("E1", "C1");
    expect(ret).toBe(0);

    // .., O-O black can finally castle
    ret = board.movePiece("E8", "G8");
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 

    let expectedPieces = [ 
      {id: "C1", piece: "king", color: "white"},
      {id: "D1", piece: "rook", color: "white"},
      {id: "E1", piece: null, color: null},
      {id: "A1", piece: null, color: null},
      {id: "G8", piece: "king", color: "black"},
      {id: "F8", piece: "rook", color: "black"},
      {id: "E8", piece: null, color: null},
      {id: "H8", piece: null, color: null},
    ];
    checkChanges(changes, null, [], expectedPieces);
  });
});
