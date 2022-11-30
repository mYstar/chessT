import Board from "../js/board.js";

describe("tests pawn behaviour", () => {
  let board;

  beforeEach(() => {
    board = new Board();
    board.setStartingConfiguration();
  })

  it("shows correct double move option on starting position", () => {
    let ret = board.selectPiece("A2")
    expect(ret).toBe(0);

    let changes = board.getBoardChanges(); 
    expect(Object.keys(changes).length).toBeGreaterThanOrEqual(3);

    expect(changes.A2.selected).toBeTruthy();
    expect(changes.A3.highlighted).toBeTruthy();
    expect(changes.A4.highlighted).toBeTruthy();

  });

});
