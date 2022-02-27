// Please implement exercise logic here
/* #########################
##### GLOBAL VARIABLES ####
######################### */

// keep data about the game in a 2-D array
// let board = [
//   ['', '', ''],
//   ['', '', ''],
//   ['', '', ''],
// ];

// the element that contains the rows and squares
let boardElement;

// the element that contains the entire board
// we can empty it out for convenience
let boardContainer;

// the element that contains the div where messages to the
// players are displayed
let messageContainer;

// current player global starts at X
let currentPlayer = 'X';

/* ##############################
###### HELPER FUNCTIONS #########
############################# */

// make customize input field
const personal = document.createElement('div');
document.body.appendChild(personal);
const desiredSize = document.createElement('input');
desiredSize.setAttribute('type', 'text');
desiredSize.setAttribute('id', 'boardSize');
desiredSize.setAttribute('placeholder', 'Put in your board size');
personal.appendChild(desiredSize);

const submitButton = document.createElement('button');
submitButton.innerText = 'submit';
personal.appendChild(submitButton);
submitButton.onclick = function () {
  let size = Number(document.getElementById('boardSize').value);
  board = make2DBoard(size);
  console.log(`size`, size);
  console.log(`Type of size`, typeof size);
  buildBoard();
  desiredSize.value = ""

};

// make the 2D Array
const make2DBoard = (size) => {
  let aBoard = [];
  for (let i = 0; i < size; i += 1) {
    aBoard.push([]);
    for (let j = 0; j < size; j += 1) {
      aBoard[i].push('');
    }
  }
  return aBoard;
};


const size = Number(document.getElementById('boardSize').value);

let board = make2DBoard(size);

// completely rebuilds the entire board every time there's a click
const buildBoard = () => {
  // start with an empty container
  boardContainer.innerHTML = '';
  boardElement = document.createElement('div');
  boardElement.classList.add('board');

  // move through the board data array and create the
  // current state of the board
  for (let i = 0; i < board.length; i += 1) {
    // separate var for one row / row element
    const row = board[i];
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // set each square
    // j is the column number
    for (let j = 0; j < row.length; j += 1) {
      // one square element
      const square = document.createElement('div');
      square.classList.add('square');

      // set the text of the square according to the array
      square.innerText = board[i][j];

      rowElement.appendChild(square);

      // set the click all over again
      // eslint-disable-next-line
      square.addEventListener('click', () => {
        squareClick(i, j);
      });
    }

    // add a single row to the board
    boardContainer.appendChild(rowElement);
  }
};

// switch the global values from one player to the next
const togglePlayer = () => {
  if (currentPlayer === 'X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
};

const checkWin = (board) => {
  // check every position
  // we need to check that board[0][0] is not '' because if all 3 positions are empty, checkWin
  // will return true
  // if (
  //   board[0][0] !== '' &&
  //   board[0][0] === board[0][1] &&
  //   board[0][1] === board[0][2]
  // ) {
  //   return true;
  // }
  // if (
  //   board[1][0] !== '' &&
  //   board[1][0] === board[1][1] &&
  //   board[1][1] === board[1][2]
  // ) {
  //   return true;
  // }
  // if (
  //   board[2][0] !== '' &&
  //   board[2][0] === board[2][1] &&
  //   board[2][1] === board[2][2]
  // ) {
  //   return true;
  // }
  // if (
  //   board[0][0] !== '' &&
  //   board[0][0] === board[1][0] &&
  //   board[1][0] === board[2][0]
  // ) {
  //   return true;
  // }
  // if (
  //   board[0][1] !== '' &&
  //   board[0][1] === board[1][1] &&
  //   board[1][1] === board[2][1]
  // ) {
  //   return true;
  // }
  // if (
  //   board[0][2] !== '' &&
  //   board[0][2] === board[1][2] &&
  //   board[1][2] === board[2][2]
  // ) {
  //   return true;
  // }
  // if (
  //   board[0][0] !== '' &&
  //   board[0][0] === board[1][1] &&
  //   board[1][1] === board[2][2]
  // ) {
  //   return true;
  // }
  // if (
  //   board[2][0] !== '' &&
  //   board[2][0] === board[1][1] &&
  //   board[1][1] === board[0][2]
  // ) {
  //   return true;
  // }
  // if (i === 0) {
  //   for (let j = 0; j < board.length; j += 1) {
  //     if (board[i][j] === 'X' || board[i][j] === 'O') {
  //       return true;
  //     }
  //   }
  // }
  if (
    checkHorizontalWin(board) ||
    checkVerticalWin(board) ||
    checkDiagonalDown(board) ||
    checkDiagonalUp(board)
  ) {
    return true;
  } else {
    return false;
  }
};

/* ##########################
## WIN CONDITIONSS ##
########################### */

const checkH = (value) => value === currentPlayer;

const checkHorizontalWin = (board) => {
  console.log(`Horizontal`);
  for (let i = 0; i < board.length; i += 1) {
    if (board[i].every(checkH)) {
      return true;
    }
  }
};

const checkVerticalWin = (board) => {
  console.log(`Vertical`);
  for (let j = 0; j < board.length; j += 1) {
    let counter = 0;
    for (let i = 0; i < board.length; i += 1) {
      if (board[i][j] === currentPlayer) {
        counter += 1;
      }
      if (counter === board.length) {
        return true;
      }
    }
  }
};

const checkDiagonalDown = (board) => {
  console.log(`DiagonalDown`);
  let counter = 0;
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][i] === currentPlayer) {
      counter += 1;
    }
    if (counter === board.length) {
      return true;
    }
  }
};

const checkDiagonalUp = (board) => {
  console.log(`DiagonalUp`);
  // make a copy
  let cloneBoard = board.map((x) => x);
  let counter = 0;

  // matrix transformation for flipping case of DiagonalDown
  cloneBoard = cloneBoard.reverse();
  // case of checkDiagonalDown
  for (let i = 0; i < board.length; i += 1) {
    if (cloneBoard[i][i] === currentPlayer) {
      counter += 1;
    }
    if (counter === board.length) {
      return true;
    }
  }
};

/* ##########################
## PLAYER ACTION CALLBACKS ##
########################### */
const squareClick = (column, row) => {
  if (board[column][row] === '') {
    board[column][row] = currentPlayer;
    buildBoard(board);
    if (checkWin(board) === true) {
      // game over
      // message to tell user who has won
      messageContainer.innerText = `${currentPlayer} wins!`;
      // set message to disappear and reset the game after 3 seconds
      setTimeout(() => {
       
        board =[
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ];
        buildBoard(board);
        messageContainer.innerText =
          'change size of board or click on a square to start';
      }, 3000);
    } else {
      togglePlayer();
    }
  }
};

/* ##########################
#### GAME INITIALISATION ####
########################## */

// create the board container element and put it on the screen
const initGame = () => {
  messageContainer = document.createElement('div');
  messageContainer.classList.add('message');
  document.body.appendChild(messageContainer);

  boardContainer = document.createElement('div');
  document.body.appendChild(boardContainer);

  // build the board - right now it's empty
  buildBoard(board);
};

// #############################
// call the function that initialises the game
initGame();
