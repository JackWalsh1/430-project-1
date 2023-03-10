import * as utils from "./utils.js";
import {Button} from "./buttonClass.js";

// global containers needed
let textNode;
let gameContainer = document.querySelector("#gameContainer");

// global variables for games
let currentPlayer;
let round;
let aiPlaying;
let remainingTiles = [];
let player1Tiles = [];
let player2Tiles = [];

let blackHoleBoardArray;

// load general structure for black hole
export const blackHoleLoad = async (gameID) => {
  gameContainer = document.querySelector("#gameContainer");

  // reset game
  utils.flipScreens();
  utils.resetGame(gameContainer);
  utils.createHeader('blackHole');

  // get gamestate
  const response = await fetch(`/getGameState?gameID=${gameID}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });

  const responseJSON = await response.json();
  const game = responseJSON.game;

  // set game variables
  round = Math.floor(game.moveCount / 2) + 1;
  currentPlayer = (game.moveCount % 2 === 0) ? 1 : 2;

  // set defaults to fill in later
  remainingTiles = [];
  player1Tiles = [];
  player2Tiles = [];

  // create player 1 pieces / container
  const player1Pieces = document.createElement('div');
  player1Pieces.setAttribute('id', 'player1Pieces');
  player1Pieces.setAttribute('class', 'playerPieces');

  const player1Name = document.createElement('p');
  player1Name.setAttribute('id', 'player1Name');
  player1Name.setAttribute('class', 'playerName');
  player1Name.innerHTML = 'Player';
  player1Pieces.appendChild(player1Name);

  // only create as many pieces as physically available
  for (let i = round; i < 11; i++) {
    // create space
    const playerPiece = new Button(
      `player1Piece${i}`,
      'playerPiece player1Piece',
      '65px',
      '65px',
      '#FF0000',
      i,
      '',
    );

    player1Pieces.appendChild(playerPiece.createButton());
  }

  // create player 2 pieces / container
  const player2Pieces = document.createElement('div');
  player2Pieces.setAttribute('id', 'player2Pieces');
  player2Pieces.setAttribute('class', 'playerPieces');

  const player2Name = document.createElement('p');
  player2Name.setAttribute('id', 'player2Name');
  player2Name.setAttribute('class', 'playerName');
  player2Name.innerHTML = 'Player';
  player2Pieces.appendChild(player2Name);

  for (let i = 1; i < 11; i++) {
    // create space
    const playerPiece = new Button(
      `player2Piece${i}`,
      'playerPiece player2Piece',
      '65px',
      '65px',
      '#0000FF',
      i,
      '',
    );

    player2Pieces.appendChild(playerPiece.createButton());
  }

  // append containers
  gameContainer.append(player1Pieces, player2Pieces);

  // create game board div
  const blackHoleBoard = document.createElement('div');
  blackHoleBoard.setAttribute('id', 'blackHoleBoard');

  // create rows of game board
  const blackHoleRow1 = document.createElement('div');
  blackHoleRow1.setAttribute('class', 'blackHoleRow');
  const blackHoleRow2 = document.createElement('div');
  blackHoleRow2.setAttribute('class', 'blackHoleRow');
  const blackHoleRow3 = document.createElement('div');
  blackHoleRow3.setAttribute('class', 'blackHoleRow');
  const blackHoleRow4 = document.createElement('div');
  blackHoleRow4.setAttribute('class', 'blackHoleRow');
  const blackHoleRow5 = document.createElement('div');
  blackHoleRow5.setAttribute('class', 'blackHoleRow');
  const blackHoleRow6 = document.createElement('div');
  blackHoleRow6.setAttribute('class', 'blackHoleRow');

  // reset black hole storage array
  blackHoleBoardArray = [
    [],
    [],
    [],
    [],
    [],
    [],
  ];

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
      (evt) => placePiece(String.fromCharCode(65 + i)),
    );

    blackHoleSpace.createButton();

    // sort into pyramid structure
    if (blackHoleBoardArray[0].length < 6) {
      blackHoleBoardArray[0].push(blackHoleSpace.div);
      blackHoleRow1.appendChild(blackHoleSpace.div);
    } else if (blackHoleBoardArray[1].length < 5) {
      blackHoleBoardArray[1].push(blackHoleSpace.div);
      blackHoleRow2.appendChild(blackHoleSpace.div);
    } else if (blackHoleBoardArray[2].length < 4) {
      blackHoleBoardArray[2].push(blackHoleSpace.div);
      blackHoleRow3.appendChild(blackHoleSpace.div);
    } else if (blackHoleBoardArray[3].length < 3) {
      blackHoleBoardArray[3].push(blackHoleSpace.div);
      blackHoleRow4.appendChild(blackHoleSpace.div);
    } else if (blackHoleBoardArray[4].length < 2) {
      blackHoleBoardArray[4].push(blackHoleSpace.div);
      blackHoleRow5.appendChild(blackHoleSpace.div);
    } else {
      blackHoleBoardArray[5].push(blackHoleSpace.div);
      blackHoleRow6.appendChild(blackHoleSpace.div);
    }

    // push to track remaining tiles
    remainingTiles.push(blackHoleSpace);
  }

  // append all elements to blackholeBoard + add it to container
  blackHoleBoard.append(blackHoleRow1, blackHoleRow2, blackHoleRow3, blackHoleRow4, blackHoleRow5, blackHoleRow6);
  gameContainer.append(blackHoleBoard);

  // create game status / append it
  const gameStatus = document.createElement('div');
  gameStatus.setAttribute('id', 'gameStatus');
  textNode = document.createTextNode('Starting up...');
  gameStatus.append(textNode);
  gameContainer.append(gameStatus);

  console.log(round);

  // sends to individual option screen
  if (round == 1) {
    utils.optionPopUp(game);
  }

  // go to game loop
  gameLoop();
};

function createTiles(player, round) {
  return;
}

async function gameLoop() {
  const res = await fetch('/query server');
  if (res !== game)
  // set variables
  await delay(2000);
  gameLoop();
}

// decide what piece was selected, add them to player list, and then swap player / round
const placePiece = (letter) => {
  // find piece that was clicked
  const spaceToAdjust = document.body.querySelector(`#blackHoleSpace${letter}`);

  // set player color to show who placed it / log it for future scoring
  if (currentPlayer == 1) {
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
  remainingTiles.splice(remainingTiles.findIndex((tile) => tile.idName == `blackHoleSpace${letter}`), 1);

  // set up needed initialization variables
  spaceToAdjust.innerHTML = round;

  // flip player control / iterate to next round if needed
  // round can be used to track what piece need to be used
  if (currentPlayer == 1) {
    currentPlayer++;
    // jump to ai "move" if needed
    if (aiPlaying) {
      document.body.querySelector('#gameStatus').innerHTML = 'AI is thinking...';
      aiBlackHoleMove();
    } else {
      document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player2Name').innerHTML;
      document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;
    }
  } else if (round == 10) {
    // if player 2 + round 10, game over.
    calculateWinner();
  } else {
    // start next round and player 1's turn
    currentPlayer = 1;
    round++;
    document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player1Name').innerHTML;
    document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;
  }
}

// grabs a random value from the remaining value, delays to simulate thinking,
// and then chooses that piece
async function aiBlackHoleMove() {
  document.body.querySelector('#blackHoleBoard').classList.add('isDisabled');
  let randomTile = Math.round(Math.random() * remainingTiles.length);
  if (randomTile == remainingTiles.length) { randomTile = 0; }
  randomTile = remainingTiles[randomTile];
  randomTile = randomTile.idName.charAt(randomTile.idName.length - 1);
  const delayres = await delay(1000);
  document.body.querySelector('#blackHoleBoard').classList.remove('isDisabled');
  placePiece(randomTile.toUpperCase());
}

// calculate winner of Black Hole
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
      if (blackHoleBoardArray[i][j] == blackHole) {
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
      if (i != j) {
        // excludes non-real indexes - a lot of weird math behind this one...
        if (
          blackHoleRow + i + blackHolePosition + j < 6
                      && blackHoleRow + i >= 0
                      && blackHolePosition + j >= 0) {
          // check which player's piece was sucked in
          const spaceSuckedIn = blackHoleBoardArray[blackHoleRow + i][blackHolePosition + j];
          // by cycling through all ten possible tiles
          for (let i = 0; i < 10; i++) {
            // push value of space + add it to sum
            if (spaceSuckedIn === player1Tiles[i]) {
              player1ScoreTiles.push(spaceSuckedIn.innerHTML);
              player1Score += parseInt(spaceSuckedIn.innerHTML);
            } else if (spaceSuckedIn === player2Tiles[i]) {
              player2ScoreTiles.push(spaceSuckedIn.innerHTML);
              player2Score += parseInt(spaceSuckedIn.innerHTML);
            }
          }
        }
      }
    }
  }

  // check win conditions
  // if the score is higher
  if (player1Score == player2Score) {
    // tiebreaker 1: if less tiles sucked in
    if (player1ScoreTiles.length == player2ScoreTiles.length) {
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