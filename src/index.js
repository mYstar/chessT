import '../sass/index.scss';
import ejs_body from '../templates/body.ejs';
import ejs_header from '../templates/header.ejs';
const ejs = require('ejs');

const body = document.createElement('body');
const template_body = ejs.compile(ejs_body, {});
const template_header = ejs.compile(ejs_header, {});

body.innerHTML = template_body();
document.body = body;

const header = document.getElementById('header');
header.innerHTML = template_header({title: 'ChessT'});
