const log = require('loglevel');
const readline = require('readline');
const boardService = require('./src/services/board.service');
const Game = require('./src/game');

log.setDefaultLevel('info');

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const startGame = () => {
  const game = new Game(input, boardService);

  game.startGame();
};

startGame();
