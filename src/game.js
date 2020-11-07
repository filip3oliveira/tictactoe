const log = require('loglevel');
const boardService = require('./services/board.service');
const {
  PLAYER_X,
  PLAYER_O,
} = require('./enums/playerTypes');

const PLAYS_MAX_NUMBER = 9;

class Game {
  constructor(input) {
    this.input = input;
    this.currentPlayerSymbol = PLAYER_X;
    this.playsCounter = 0;
  }

  play(board) {
    boardService.printBoard(board);
    if (this.playsCounter >= PLAYS_MAX_NUMBER) {
      log.info(`Game is over`);
      process.exit(0);
    }

    this.input.question(`[${this.currentPlayerSymbol}] Make your move(1 - 9): `, (move) => {
      this.processMove(board, move);
    });
  }

  processMove(board, move) {
    const moveComputed = move - 1;

    if (!boardService.isValidMove(board, moveComputed)) {
      log.info('That move is not valid, try again.');
      this.play(board);
      return;
    }

    const newBoard = boardService.setSquareValue(board, moveComputed, this.currentPlayerSymbol);
    this._checkWinner(newBoard);
    this._changePlayer();
    this.play(newBoard);
  }

  _checkWinner(board) {
    const winner = boardService.calculateWinner(board);
    if (winner !== ' ') {
      log.info(`Winner is ${winner}`);
      process.exit(0);
    }

    log.debug('Check winner counter: ', this.playsCounter);
    this.playsCounter += 1;
  }

  _changePlayer() {
    if (this.currentPlayerSymbol === PLAYER_X) {
      this.currentPlayerSymbol = PLAYER_O;
      return;
    }

    this.currentPlayerSymbol = PLAYER_X;
  }
}

module.exports = Game;
