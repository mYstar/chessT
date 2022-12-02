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
    expect(board.selectPiece('testing')).toBe(undefined);
    expect(board.selectPiece('A0')).toBe(undefined);
    expect(board.selectPiece('A9')).toBe(undefined);
    expect(board.selectPiece('I1')).toBe(undefined);
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
});
