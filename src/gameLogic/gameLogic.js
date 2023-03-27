import * as utils from './utils.js';
import Button from './buttonClass.js';

// global containers needed
let gameContainer = document.querySelector('#gameContainer');

// global variables for games
let round;
let remainingTiles = [];
let blackHoleBoardArray;

function createPlayerColumn(player, currentRound) {
  const redPlayer = {
    playerNum: 1,
    color: '#FF0000',
  };

  const bluePlayer = {
    playerNum: 2,
    color: '#0000FF',
  };

  const piecesRequested = player === 'red' ? redPlayer : bluePlayer;

  // create player pieces / container
  const playerColumn = document.createElement('div');
  playerColumn.setAttribute('id', `player${piecesRequested.playerNum}Pieces`);
  playerColumn.setAttribute('class', 'playerColumn');

  const playerName = document.createElement('p');
  playerName.setAttribute('id', `player${piecesRequested.playerNum}Name`);
  playerName.setAttribute('class', 'playerName');
  playerName.innerHTML = 'Player';
  playerColumn.appendChild(playerName);

  // only create as many pieces as physically available
  for (let i = currentRound; i < 11; i++) {
    // create space
    const numTile = new Button(
      `player${piecesRequested.playerNum}Piece${i}`,
      `playerPiece player${piecesRequested.playerNum}Piece`,
      '65px',
      '65px',
      piecesRequested.color,
      i,
      '',
    );

    playerColumn.appendChild(numTile.createButton());
  }
  return playerColumn;
}

function calculateWinner(game) {
  let blackHole;
  const playerScoreTiles = [[], []];
  let player1Score = 0;
  let player2Score = 0;
  let result;

  for (let i = 0; i < game.gameState.length; i++) {
    if (game.gameState[i].length === 1) {
      blackHole = game.gameState[i];
      break;
    }
  }

  const suckedInTilesDict = {
    A: [1, 6],
    B: [0, 2, 6, 7],
    C: [1, 3, 7, 8],
    D: [2, 4, 8, 9],
    E: [3, 5, 9, 10],
    F: [4, 10],
    G: [0, 1, 7, 11],
    H: [1, 2, 6, 8, 11, 12],
    I: [2, 3, 7, 9, 12, 13],
    J: [3, 4, 8, 10, 13, 14],
    K: [4, 5, 9, 14],
    L: [6, 7, 12, 15],
    M: [7, 8, 11, 13, 15, 16],
    N: [8, 9, 12, 14, 16, 17],
    O: [9, 10, 13, 17],
    P: [11, 12, 16, 18],
    Q: [12, 13, 15, 17, 18, 19],
    R: [13, 14, 16, 19],
    S: [15, 16, 19, 20],
    T: [16, 17, 18, 20],
    U: [18, 19],
  };

  const suckedInTiles = suckedInTilesDict[blackHole];

  for (let i = 0; i < suckedInTiles.length; i++) {
    const tileToCheck = game.gameState[suckedInTiles[i]];
    playerScoreTiles[tileToCheck[0] === 'R' ? 0 : 1].push(tileToCheck.substring(1));
  }

  const player1ScoreTiles = playerScoreTiles[0];
  const player2ScoreTiles = playerScoreTiles[1];

  for (let i = 0; i < player1ScoreTiles.length; i++) {
    player1Score += parseInt(player1ScoreTiles[i], 10);
  }

  for (let i = 0; i < player2ScoreTiles.length; i++) {
    player2Score += parseInt(player2ScoreTiles[i], 10);
  }

  // check win conditions
  // if the score is higher
  if (player1Score === player2Score) {
    // tiebreaker 1: if less tiles sucked in
    if (player1ScoreTiles.length === player2ScoreTiles.length) {
      // tiebreaker 2: sort tiles and check which piece is the lowest
      // if they're exactly equal - tie
      player1ScoreTiles.sort((a, b) => b - a);
      player2ScoreTiles.sort((a, b) => b - a);
      for (let i = 0; i < player1ScoreTiles.length; i++) {
        if (player1ScoreTiles[i] !== player2ScoreTiles[i]) {
          const p1Win = player1ScoreTiles[i] < player2ScoreTiles[i];
          result = `${document.body.querySelector(`#player${p1Win ? 1 : 2}Name`).innerHTML} has won
           by having a ${p1Win ? player1ScoreTiles[i] : player2ScoreTiles[i]} vs a
            ${p1Win ? player2ScoreTiles[i] : player1ScoreTiles[i]} sucked in!`;
        }
        // everything else is just a result being stored and printed
      }
      if (!result) {
        result = 'This game is a perfect tie!';
      }
    } else {
      const p1Win = player1ScoreTiles.length < player2ScoreTiles.length;
      result = `${document.body.querySelector(`#player${p1Win ? 1 : 2}Name`).innerHTML} has won by having less pieces sucked in!`;
    }
  } else {
    const p1Win = player1Score < player2Score;
    result = `${document.body.querySelector(`#player${p1Win ? 1 : 2}Name`).innerHTML} has won by a score of ${player1Score} to ${player2Score}!`;
  }

  document.body.querySelector('#gameStatus').innerHTML = result;
}

// decide what piece was selected, add them to player list, and then swap player / round
const updateGameState = (currentState, activePlayer) => {
  // check for needed updates for all spaces
  for (let i = 0; i < 21; i++) {
    const spaceToAdjust = document.querySelector(`#blackHoleSpace${String.fromCharCode(65 + i)}`);
    // check if game piece needs to be colored in
    if (spaceToAdjust.style.backgroundColor === 'gray'
     && currentState.gameState[i] !== `${String.fromCharCode(65 + i).toUpperCase()}`) {
      const color = currentState.gameState[i].substring(0, 1);
      const number = currentState.gameState[i].substring(1);
      round = Math.floor(currentState.moveCount / 2) + 1;

      // update button
      spaceToAdjust.style.backgroundColor = color === 'R' ? '#FF0000' : '#0000FF';
      spaceToAdjust.innerHTML = number;
      spaceToAdjust.classList.add('isDisabled');

      document.body.querySelector(`#player${color === 'R' ? 1 : 2}Piece${number}`).remove();
      remainingTiles.splice(remainingTiles.findIndex((tile) => tile.idName === `blackHoleSpace${String.fromCharCode(65 + i)}`), 1);
    }
  }

  if (currentState.moveCount === 20) {
    calculateWinner(currentState);
  } else if (currentState.moveCount === 19 && activePlayer === 'Red') {
    // don't allow any additional actions from Red
    document.querySelector('#blackHoleBoard').classList.add('isDisabled');
  } else {
    const nextMove = currentState.moveCount % 2 === 0 ? 'Red' : 'Blue';
    let statusMessage = '';
    if (nextMove === activePlayer) {
      // say "it's your turn"
      statusMessage = `${currentState.playerNames[currentState.moveCount % 2]}, place your ${round} piece.`;
    } else {
      // get other player's name and say it's their turn
      let playerToGo = currentState.playerNames[nextMove === 'Red' ? 0 : 1];
      if (playerToGo === '????????') {
        playerToGo = 'second player to join and';
      } else {
        playerToGo += ' to';
      }
      statusMessage = `Waiting on ${playerToGo} place their ${round} piece.`;
    }
    document.body.querySelector('#gameStatus').innerHTML = statusMessage;
  }
  return currentState;
};

// decide what piece was selected, add them to player list, and then swap player / round
// auto-fires updateGameState
const placePiece = async (letter, gameID, activePlayer) => {
  const formData = `gameID=${gameID}&player=${activePlayer}&space=${letter}`;

  const response = await fetch('/sendMove', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: formData,
  });

  // piece updated
  if (response.status === 201) {
    const currentState = await utils.getGameState(gameID);
    updateGameState(currentState, activePlayer);
  } else { // player has tried to make illegal move
    const gameStatusHTML = document.body.querySelector('#gameStatus').innerHTML;
    const tempStorage = gameStatusHTML.slice(gameStatusHTML.indexOf('W'));
    document.body.querySelector('#gameStatus').innerHTML = `It is not your turn. Please wait for the other player to go.<br>${tempStorage}`;
  }
};

async function gameLoop(game, activePlayer) {
  const currentState = await utils.getGameState(game.id);
  let updatedState = '';
  // opponent has made a move
  if (currentState.moveCount !== game.moveCount) {
    updatedState = await updateGameState(currentState, activePlayer);
    if (updatedState.moveCount === 20) {
      calculateWinner(updatedState);
    }
  }

  // says "no more actions allowed- game is over"
  if (!document.querySelector('#blackHoleBoard').classList.contains('isDisabled')
  && (updatedState.active === false || currentState.active === false)) {
    document.querySelector('#blackHoleBoard').classList.add('isDisabled');
  }

  // set a delay, then check again
  await utils.delay(500);
  // send game if no change - else, send updatedState to replace game
  gameLoop(updatedState !== '' ? updatedState : game, activePlayer);
}

// load general structure for black hole
const blackHoleLoad = async (gameID, activePlayer) => {
  gameContainer = document.querySelector('#gameContainer');

  // reset game
  utils.flipScreens();
  utils.resetGame(gameContainer);
  utils.createHeader('blackHole');

  // get gamestate
  const game = await utils.getGameState(gameID);

  // set game variables
  round = Math.floor(game.moveCount / 2) + 1;

  // set defaults to fill in later
  remainingTiles = [];

  // create player columns / append them
  const player1Column = createPlayerColumn('red', round);
  const player2Column = createPlayerColumn('blue', round);
  gameContainer.append(player1Column, player2Column);

  // create game board div
  const blackHoleBoard = document.createElement('div');
  blackHoleBoard.setAttribute('id', 'blackHoleBoard');

  const blackHoleRows = [];

  for (let i = 0; i < 6; i++) {
    const blackHoleRow = document.createElement('div');
    blackHoleRow.setAttribute('class', 'blackHoleRow');
    blackHoleRows.push(blackHoleRow);
  }

  // reset black hole storage array
  blackHoleBoardArray = [
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  let rowToInsert = 0;
  // when value of i hits these marks, insert into next row
  const rowJumps = [6, 11, 15, 18, 20];
  // for each space
  for (let i = 0; i < 21; i++) {
    const currentSpace = game.gameState[i];
    let color = 'gray';
    let number = String.fromCharCode(65 + i);

    // if value already there
    if (currentSpace.length > 1) {
      color = currentSpace.substring(0, 1) === 'R' ? '#FF0000' : '#0000FF';
      number = currentSpace.substring(1);
    }

    // create space
    const blackHoleSpace = new Button(
      `blackHoleSpace${String.fromCharCode(65 + i)}`,
      'blackHoleSpace',
      '88px',
      '88px',
      color,
      number,
      () => placePiece(String.fromCharCode(65 + i), gameID, activePlayer),
    );

    blackHoleSpace.createButton();

    // check if previous row full and i need to jump
    rowToInsert += rowJumps.indexOf(i) !== -1 ? 1 : 0;
    blackHoleBoardArray[rowToInsert].push(blackHoleSpace.div);
    blackHoleRows[rowToInsert].appendChild(blackHoleSpace.div);

    // push to track remaining tiles
    remainingTiles.push(blackHoleSpace);
  }

  // append all elements to blackholeBoard + add it to container
  blackHoleRows.forEach((row) => blackHoleBoard.append(row));
  gameContainer.append(blackHoleBoard);

  for (let i = 0; i < 21; i++) {
    const boardSpace = document.querySelector(`#blackHoleSpace${String.fromCharCode(65 + i)}`);
    if (boardSpace.style.backgroundColor !== 'gray') {
      boardSpace.classList.add('isDisabled');
    }
  }

  // just show result
  if (!game.active) {
    calculateWinner(game);
  }
  // if needed, prompt for player name -
  // else, just jump to set settings
  if (game.moveCount < 2
    && game.playerNames[(activePlayer === 'Red' ? 0 : 1)] === '????????') {
    utils.optionPopUp(game, activePlayer);
  } else {
    utils.setSettings(game, false, activePlayer);
  }

  // go to game loop
  gameLoop(game, activePlayer);
};

export default blackHoleLoad;
