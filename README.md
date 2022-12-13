# ChessT

This is a little side project of mine, sharpening my webdev skills. 
It shows a responsive web page (Desktop and Tablet size for now), with a chessboard and a game in chess notation displayed.
Currently there is only some visual functionality, showing move options for the chess pieces, move the selected piece by clicking the move option, clicking through the game, responding on window resize.
As of now the following technologies are used:

- HTML
- Sass -> CSS
- vanilla JavaScript (no framework)
- gulp for build automation
- jest for unit tests

## Setup

1. `git clone https://github.com/mYstar/chessT.git` gets the source code
2. `npm install` installs all dependencies
3. `npm run gulp` creates the css from sass
4. `npm install -g live-server` installs a local HTTP server to serve the website
5. `live-server` starts the server
6. display the website in your browser (`http://127.0.0.1:8080` for live-server with standard settings)

## Testing

- `npm test` runs all tests once
- `npm run test-watch` reruns tests, when files change
- `npm run test-coverage` shows the test coverage
