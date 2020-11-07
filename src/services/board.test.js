const boardService = require('./board.service');

describe('Test Board', () => {
  let board;

  beforeEach(() => {
    board = boardService.createBoard();
  });

  test('createBoard shoud create a board with 9 squares by default', () => {
    const result = boardService.createBoard();

    expect(result.length).toBe(9);
    expect(result).toStrictEqual([' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']);
  });

  test('setSquareValue should place the sign, according to the player\'s move ', () => {
    const result = boardService.setSquareValue(board, 3, 'X');

    expect(result[3]).toBe('X');
  });

  test('isValidMove should return false when the move is out of the board', () => {
    const result = boardService.isValidMove(board, 11);

    expect(result).toBe(false);
  });

  test('isValidMove should return false when repeated move', () => {
    const testBoard = boardService.setSquareValue(board, 3, 'X');
    const result = boardService.isValidMove(testBoard, 3);

    expect(result).toBe(false);
  });

  test('calculateWinner should return " " if no winner found', () => {
    const result = boardService.calculateWinner(board);

    expect(result).toBe(' ');
  });

  test('calculateWinner should return the winner when conditions matched', () => {
    const gamePlay1 = boardService.setSquareValue(board, 0, 'X');
    const gamePlay2 = boardService.setSquareValue(gamePlay1, 1, 'X');
    const gamePlay3 = boardService.setSquareValue(gamePlay2, 2, 'X');
    const result = boardService.calculateWinner(gamePlay3);

    expect(result).toBe('X');
  });
});
