const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];
//number of rows
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
//create row variable
    const row =[];
// work out columns
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
// add spacing for board
      row.push (' ');
    }
//push the board to the row array
    board.push (row);
  }
  return board;
};

//console.log(generatePlayerBoard(2, 3));

//Generate Bomb board
const generateBombBoard =(numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];
//number of rows
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
//create row variable
    const row =[];
// work out columns
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
// add spacing for board
      row.push (null);
    }
//push the board to the row array
    board.push (row);
  }
//randomly generate bombs
  let numberOfBombsPlaced = 0;
//work out where to place the bombs and what to put
    while (numberOfBombsPlaced < numberOfBombs) {
    const randomRowIndex = Math.floor(Math.random () * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random () * numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== 'B'){
      board[randomRowIndex][randomColumnIndex] = 'B';
      numberOfBombsPlaced++;
    }
  }

  return board;
};
//5. Find out the neighbour bombs and work out numbers
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1,-1],
    [-1,0],
    [-1,1],
    [0,-1],
    [0,1],
    [1,-1],
    [1,0],
    [1,1]
  ];
//10. Work out the current rows in board
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;
//14. callback method
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns){
      if(bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
};
//End neighborOffsets.forEach()
//24. Start on the flip time functions
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

let playerBoard = generatePlayerBoard(2, 2, 2);
let bombBoard = generateBombBoard(2, 2, 2);
console.log ('Player Board: ');
printBoard(playerBoard);
console.log ('Bomb Board: ');
printBoard(bombBoard);
//choose where to flip the tile
flipTile(playerBoard, bombBoard, 0, 0)
console.log('Updated Player Board: ');
printBoard(playerBoard);
