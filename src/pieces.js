import pawnBlack from "../img/pawn_black.svg";
import pawnWhite from "../img/pawn_white.svg";
import rookBlack from "../img/rook_black.svg";
import rookWhite from "../img/rook_white.svg";
import knightBlack from "../img/knight_black.svg";
import knightWhite from "../img/knight_white.svg";
import bishopBlack from "../img/bishop_black.svg";
import bishopWhite from "../img/bishop_white.svg";
import kingBlack from "../img/king_black.svg";
import kingWhite from "../img/king_white.svg";
import queenBlack from "../img/queen_black.svg";
import queenWhite from "../img/queen_white.svg";

let pieces = {
    black: {
        pawn: pawnBlack,
        rook: rookBlack,
        knight: knightBlack,
        bishop: bishopBlack,
        king: kingBlack,
        queen: queenBlack,
    },
    white: {
        pawn: pawnWhite,
        rook: rookWhite,
        knight: knightWhite,
        bishop: bishopWhite,
        king: kingWhite,
        queen: queenWhite,
    },
}

export {pieces};