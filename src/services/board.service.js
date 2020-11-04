const log = require('loglevel');

class BoardService {
  static createBoard(size = 9) {
    const cleanBoard = [];

    for (let index = 0; index < size; index++) {
      cleanBoard.push(' ');
    }

    return cleanBoard;
  }

  static setSquareValue(board, move, currentPlayerSymbol) {
    const boardCopy = [...board];
    boardCopy[move] = currentPlayerSymbol;

    return boardCopy;
  }

  static isValidMove(board, move) {
    return move < board.length && board[move] === ' ';
  }

  static calculateWinner(board) {
    if (board[0] === board[1] && board[0] === board[2]) {
      return board[0];
    } if (board[3] === board[4] && board[3] === board[5]) {
      return board[3];
    } if (board[6] === board[7] && board[6] === board[8]) {
      return board[6];
    } if (board[0] === board[3] && board[0] === board[6]) {
      return board[0];
    } if (board[1] === board[4] && board[1] === board[7]) {
      return board[1];
    } if (board[2] === board[5] && board[2] === board[8]) {
      return board[2];
    } if (board[0] === board[4] && board[0] === board[8]) {
      return board[0];
    } if (board[2] === board[4] && board[2] === board[6]) {
      return board[2];
    }

    return ' ';
  }

  static printBoard(board) {
    let line = '';
    for (let i = 1; i < 10; i++) {
      line += `${board[i - 1]} | `;

      if (i % 3 === 0) {
        log.info(line);
        log.info('____________');
        line = '';
      }
    }
  }
}

module.exports = BoardService;
