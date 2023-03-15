const ejs = require('ejs');
import ejs_body from '../templates/body.ejs';
import ejs_header from '../templates/header.ejs';
import ejs_game from '../templates/game.ejs';
import ejs_board from '../templates/board.ejs';
import ejs_comments from '../templates/comments.ejs';

export default {
    body: ejs.compile(ejs_body, {}),
    header: ejs.compile(ejs_header, {}),
    game: ejs.compile(ejs_game, {}),
    board: ejs.compile(ejs_board, {}),
    comments: ejs.compile(ejs_comments, {}),
};
