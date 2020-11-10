const log = require('loglevel');
const {
  PLAYER_X,
  PLAYER_O,
} = require('./enums/playerTypes');

const PLAYS_MAX_NUMBER = 9;

class Game {
  constructor(input, boardService) {
    this.input = input;
    this.currentPlayerSymbol = PLAYER_X;
    this.playsCounter = 0;
    this.boardService = boardService;
  }

  startGame() {
    const board = this.boardService.createBoard();
    this.play(board);
  }

  play(board) {
    this.boardService.printBoard(board);
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

    if (!this.boardService.isValidMove(board, moveComputed)) {
      log.info('That move is not valid, try again.');
      this.play(board);
      return;
    }

    const newBoard = this.boardService.setSquareValue(board, moveComputed, this.currentPlayerSymbol);
    this.#checkWinner(newBoard);
    this.#changePlayer();
    this.play(newBoard);
  }

  #checkWinner(board) {
    const winner = this.boardService.calculateWinner(board);
    if (winner !== ' ') {
      log.info(`Winner is ${winner}`);
      process.exit(0);
    }

    log.debug('Check winner counter: ', this.playsCounter);
    this.playsCounter += 1;
  }

  #changePlayer() {
    if (this.currentPlayerSymbol === PLAYER_X) {
      this.currentPlayerSymbol = PLAYER_O;
      return;
    }

    this.currentPlayerSymbol = PLAYER_X;
  }
}

module.exports = Game;
