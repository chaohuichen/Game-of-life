const width = 25;
const height = 20; // width and height dimensions of the board

/**
 * Create a Game of Life instance
 */

const gol = new GameOfLife(width, height);

/**
 * create a table and append to the DOM
 */

// Actual table cells
const tds = [];

// <table> element
const table = document.createElement('tbody');
// build a table row <tr>
for (let h = 0; h < height; h++) {
  const tr = document.createElement('tr');
  // build a table column <td>
  for (let w = 0; w < width; w++) {
    const td = document.createElement('td');
    // We'll put the coordinates on the cell
    // Element itself (using dataset),
    // letting us fetch it in a click listener later.
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById('board').append(table);

/**
 * Draws every cell from the gol instance into an actual, visible DOM element
 */

const paint = () => {
  // TODO:
  //   1. For each <td> in the table:
  //     a. If its corresponding cell in gol instance is alive,
  //        give the <td> the `alive` CSS class.
  //     b. Otherwise, remove the `alive` class.
  //

  for (let i = 0; i < tds.length; ++i) {
    if (gol.getCell(tds[i].dataset.row, tds[i].dataset.col) === 1) {
      tds[i].classList.add('alive');
    } else {
      tds[i].classList.remove('alive');
    }
  }
};

/**
 * Event Listeners
 */

document.getElementById('board').addEventListener('click', (event) => {
  // Toggle clicked cell (event.target) and paint
  let val = gol.getCell(event.target.dataset.row, event.target.dataset.col);
  if (val === 0) {
    gol.setCell(1, event.target.dataset.row, event.target.dataset.col);
  } else if (val === 1) {
    gol.setCell(0, event.target.dataset.row, event.target.dataset.col);
  }
  paint();
});

document.getElementById('step_btn').addEventListener('click', (event) => {
  //  Do one gol tick and paint
  gol.tick();
  paint();
});
var playId;
document.getElementById('play_btn').addEventListener('click', (event) => {
  playId = setInterval(() => {
    gol.tick();
    paint();
    if (gol.checkCell()) {
      clearInterval(playId);
    }
  }, 200);

  setTimeout(() => {
    clearInterval(playId);
  }, 100000);
});

document.getElementById('stop_btn').addEventListener('click', (event) => {
  //stop the game by clearing the interval
  clearInterval(playId);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

document.getElementById('random_btn').addEventListener('click', (event) => {
  //  Randomize the board and paint

  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      gol.setCell(getRandomInt(2), row, col);
    }
  }
  paint();
});

document.getElementById('clear_btn').addEventListener('click', (event) => {
  //  Clear the board and paint
  clearInterval(playId);
  gol.board = gol.makeBoard();
  paint();
});
