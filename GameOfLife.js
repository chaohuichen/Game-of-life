class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  /**
   * Returns a 2D Array
   */

  makeBoard() {
    // Create and return an 2D Array
    // with `this.heigh` as rows and `this.width` as cols.
    // For example, given a height of 4 and a width of 3, it will generate:
    // [
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    //  [0, 0, 0],
    // ]
    let arr = [];
    for (let row = 0; row < this.height; ++row) {
      let temp = [];
      for (let col = 0; col < this.width; ++col) {
        temp.push(0);
      }
      arr.push(temp);
    }
    // let array = new Array(this.height).fill(new Array(this.width).fill(0));
    return arr;
  }

  getCell(row, col) {
    if (row >= 0 && col >= 0 && row < this.height && col < this.width) {
      return this.board[row][col];
    }
    return null;
  }

  setCell(value, row, col) {
    if (row >= 0 && col >= 0 && row < this.height && col < this.width) {
      this.board[row][col] = value;
    }
  }
  toggleCell(row, col) {
    let count = this.livingNeighbors(row, col);

    if (this.getCell(row, col) === 1) {
      if (count < 2) {
        return 0;
      } else if (count > 3) {
        return 0;
      } else {
        return 1;
      }
    } else if (this.getCell(row, col) === 0) {
      if (count === 3) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  checkCell() {
    for (let row = 0; row < this.height; ++row) {
      for (let col = 0; col < this.width; ++col) {
        if (this.getCell(row, col) !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  /**
   * Return the amount of living neighbors around a given coordinate.
   */

  livingNeighbors(row, col) {
    //  Return the count of living neighbors.
    //ex:1,1
    let count = 0;
    //0,0

    this.getCell(row - 1, col - 1) === 1 ? count++ : 0;

    //1,0

    this.getCell(row, col - 1) === 1 ? count++ : 0;

    //0,1

    this.getCell(row - 1, col) === 1 ? count++ : 0;

    //2,0

    this.getCell(row + 1, col - 1) === 1 ? count++ : 0;

    //2,1

    this.getCell(row + 1, col) === 1 ? count++ : 0;

    //2,2

    this.getCell(row + 1, col + 1) === 1 ? count++ : 0;

    //1,2

    this.getCell(row, col + 1) === 1 ? count++ : 0;

    //0,2

    this.getCell(row - 1, col + 1) === 1 ? count++ : 0;

    return count;
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    //  Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //

    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    for (let row = 0; row < this.height; ++row) {
      for (let col = 0; col < this.width; ++col) {
        newBoard[row][col] = this.toggleCell(row, col);
      }
    }

    this.board = newBoard;
  }
}
