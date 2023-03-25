import * as utils from './utils.js';
import Button from './buttonClass.js';

// global containers needed
let gameContainer = document.querySelector('#gameContainer');

// global variables for games
let currentPlayer;
let round;
let aiPlaying;
let remainingTiles = [];
let player1Tiles = [];
let player2Tiles = [];

let blackHoleBoardArray;

// gets current game state and returns game obj from json
async function getGameState(gameID) {
  const response = await fetch(`/getGameState?gameID=${gameID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const json = await response.json();
  return json.game;
}

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

function calculateWinner() {
  const blackHole = remainingTiles[0].div;
  let blackHoleRow; let
    blackHolePosition;
  const player1ScoreTiles = [];
  const player2ScoreTiles = [];
  let player1Score = 0;
  let player2Score = 0;
  let result;

  // find position of black hole in pyramid structure
  for (let i = 0; i < blackHoleBoardArray.length; i++) {
    for (let j = 0; j < blackHoleBoardArray[i].length; j++) {
      if (blackHoleBoardArray[i][j] === blackHole) {
        blackHoleRow = i;
        blackHolePosition = j;
        blackHoleBoardArray[i][j].classList.add('isDisabled');
      }
    }
  }

  // create two arrays of sucked in numbers - one for each player
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // ignores non-adjacent squares
      if (i !== j) {
        // excludes non-real indexes - a lot of weird math behind this one...
        if (
          blackHoleRow + i + blackHolePosition + j < 6
                      && blackHoleRow + i >= 0
                      && blackHolePosition + j >= 0) {
          // check which player's piece was sucked in
          const spaceSuckedIn = blackHoleBoardArray[blackHoleRow + i][blackHolePosition + j];
          // by cycling through all ten possible tiles
          for (let k = 0; k < 10; k++) {
            // push value of space + add it to sum
            if (spaceSuckedIn === player1Tiles[k]) {
              player1ScoreTiles.push(spaceSuckedIn.innerHTML);
              player1Score += parseInt(spaceSuckedIn.innerHTML, 10);
            } else if (spaceSuckedIn === player2Tiles[k]) {
              player2ScoreTiles.push(spaceSuckedIn.innerHTML);
              player2Score += parseInt(spaceSuckedIn.innerHTML, 10);
            }
          }
        }
      }
    }
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
        if (player1ScoreTiles[i] < player2ScoreTiles[i]) {
          result = `${document.body.querySelector('#player1Name').innerHTML} has won by having a ${player1ScoreTiles[i]} vs a ${player2ScoreTiles[i]} sucked in!`;
        } else if (player1ScoreTiles[i] > player2ScoreTiles[i]) {
          result = `${document.body.querySelector('#player2Name').innerHTML} has won by having a ${player2ScoreTiles[i]} vs a ${player1ScoreTiles[i]} sucked in!`;
        }
        // everything else is just a result being stored and printed
      }
      if (!result) {
        result = 'This game is a perfect tie!';
      }
    } else if (player1ScoreTiles.length < player2ScoreTiles.length) {
      result = `${document.body.querySelector('#player1Name').innerHTML} has won by having less pieces sucked in!`;
    } else {
      result = `${document.body.querySelector('#player2Name').innerHTML} has won by having less pieces sucked in!`;
    }
  } else if (player1Score < player2Score) {
    result = `${document.body.querySelector('#player1Name').innerHTML} has won by a score of ${player1Score} to ${player2Score}!`;
  } else {
    result = `${document.body.querySelector('#player2Name').innerHTML} has won by a score of ${player2Score} to ${player1Score}!`;
  }
  document.body.querySelector('#gameStatus').innerHTML = result;
}

// decide what piece was selected, add them to player list, and then swap player / round
const placePiece = async (letter, gameID) => {
  const game = await getGameState(gameID);

  console.log(game);

  // find piece that was clicked
  const spaceToAdjust = document.body.querySelector(`#blackHoleSpace${letter}`);

  // set player color to show who placed it / log it for future scoring
  if (currentPlayer === 1) {
    spaceToAdjust.style.backgroundColor = '#FF0000';
    player1Tiles.push(spaceToAdjust);
    document.body.querySelector(`#player1Piece${round}`).remove();
  } else {
    spaceToAdjust.style.backgroundColor = '#0000FF';
    player2Tiles.push(spaceToAdjust);
    document.body.querySelector(`#player2Piece${round}`).remove();
  }
  // disable future interactions
  spaceToAdjust.classList.add('isDisabled');

  // remove tile from remaining tiles
  remainingTiles.splice(remainingTiles.findIndex((tile) => tile.idName === `blackHoleSpace${letter}`), 1);

  // set up needed initialization variables
  spaceToAdjust.innerHTML = round;

  // flip player control / iterate to next round if needed
  // round can be used to track what piece need to be used
  if (currentPlayer === 1) {
    currentPlayer++;
    // jump to ai "move" if needed
    if (aiPlaying) {
      document.body.querySelector('#gameStatus').innerHTML = 'AI is thinking...';
    } else {
      document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player2Name').innerHTML;
      document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;
    }
  } else if (round === 10) {
    // if player 2 + round 10, game over.
    calculateWinner();
  } else {
    // start next round and player 1's turn
    currentPlayer = 1;
    round++;
    document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player1Name').innerHTML;
    document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;
  }
};

async function gameLoop(game) {
  const currentState = getGameState(game.id);
  // opponent has made a move
  if (currentState.moveCount !== game.moveCount) {
    // update game
  }
  // set a delay, then check again
  await utils.delay(2000);
  gameLoop(game);
}

// async function updateGameState(gameID, updatedGameData) {
//   const formData = `gameID=${gameID}&player=${player.value}&space=${space.value}`;

//   const response = await fetch('/sendMove', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Accept: 'application/json',
//     },
//     body: formData,
//   });
// }

// load general structure for black hole
const blackHoleLoad = async (gameID) => {
  gameContainer = document.querySelector('#gameContainer');

  // reset game
  utils.flipScreens();
  utils.resetGame(gameContainer);
  utils.createHeader('blackHole');

  // get gamestate
  const game = await getGameState(gameID);

  console.log(game);

  // set game variables
  round = Math.floor(game.moveCount / 2) + 1;
  currentPlayer = (game.moveCount % 2 === 0) ? 1 : 2;

  // set defaults to fill in later
  remainingTiles = [];
  player1Tiles = [];
  player2Tiles = [];

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
    // create space
    const blackHoleSpace = new Button(
      `blackHoleSpace${String.fromCharCode(65 + i)}`,
      'blackHoleSpace',
      '88px',
      '88px',
      'gray',
      String.fromCharCode(65 + i),
      () => placePiece(String.fromCharCode(65 + i), gameID),
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

  console.log(round);
  console.log(game);

  // sends to individual option screen
  if (round === 1) {
    utils.optionPopUp(game);
    if (document.querySelector('#player2Name') === 'P2ToJoin') {
      const temp = round;
      round = temp;
    }
  }

  // go to game loop
  gameLoop(game);
};

export default blackHoleLoad;
