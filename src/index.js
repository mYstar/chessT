import '../sass/index.scss';
import templates from './templates';

const body = document.createElement('body');
body.innerHTML = templates.body();
document.body = body;

const header = document.getElementById('header');
header.innerHTML = templates.header({title: 'ChessT'});

const game_data = {
    player_1: 'Kasparov, G. (2812)',
    player_2: 'Topalov, V. (2700)',
    moves: [
        {white: 'e4', white_comment: '', black: 'd6', black_comment: ''},
        {white: 'd4', white_comment: 'there is something to say here', black: 'Nf6', black_comment: ''},
        {white: 'Nc3', white_comment: '', black: 'g6', black_comment: ''},
        {white: 'Be3', white_comment: '', black: 'Bg7', black_comment: ''},
        {white: 'Qd2', white_comment: 'something else to say', black: 'c6', black_comment: 'following white_comment'},
        {white: 'f3', white_comment: '3 in a row', black: 'b5', black_comment: ''},
        {white: 'Nge2', white_comment: '', black: 'Nbd7', black_comment: ''},
        {white: 'Bh6', white_comment: '', black: 'Bxh6', black_comment: ''},
        {white: 'Qxh6', white_comment: '', black: 'Bb7', black_comment: 'last white_comment on this'},
        {white: 'a3', white_comment: '', black: 'e5', black_comment: ''},
        {white: 'O-O-O', white_comment: '', black: 'Qe7', black_comment: ''},
        {white: 'Kb1', white_comment: '', black: 'a6', black_comment: 'enough'},
    ],
};
const game = document.getElementById('game');
game.innerHTML = templates.game(game_data);

const board = document.getElementById('board');
board.innerHTML = templates.board();

const comments = document.getElementById('comments');
comments.innerHTML = templates.comments();