const readline = require('readline');
const Game = require('./game');
const boardService = require('./services/board.service');

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

describe('Test Game', () => {
  beforeEach(() => {
    jest.spyOn(boardService, 'printBoard').mockImplementation(null);
  });

  afterAll(() => {
    input.close();
  });

  test('processMove shoud trigger process exit if there is a winner', () => {
    jest.spyOn(boardService, 'calculateWinner').mockReturnValueOnce('X');
    jest.spyOn(boardService, 'isValidMove').mockReturnValueOnce(true);
    jest.spyOn(process, 'exit').mockImplementation(null);
    
    const game = new Game(input, boardService);
    game.processMove([], 4);

    expect(process.exit).toBeCalledTimes(1);
  });

  test('processMove should restart the question process if no winner found', () => {
    jest.spyOn(boardService, 'calculateWinner').mockReturnValueOnce(1);
    jest.spyOn(boardService, 'isValidMove').mockReturnValueOnce(false);
    jest.spyOn(input, 'question').mockImplementation(null);

    const game = new Game(input, boardService);
    game.processMove([], 3);

    expect(input.question).toBeCalledTimes(1);
  });
});
