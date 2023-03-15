import '../sass/index.scss';
import templates from './templates';

const body = document.createElement('body');
body.innerHTML = templates.body();
document.body = body;

const header = document.getElementById('header');
header.innerHTML = templates.header({title: 'ChessT'});

const game = document.getElementById('game');
game.innerHTML = templates.game();

const board = document.getElementById('board');
board.innerHTML = templates.board();

const comments = document.getElementById('comments');
comments.innerHTML = templates.comments();