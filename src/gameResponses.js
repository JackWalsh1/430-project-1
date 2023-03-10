// 'database' of all users
const games = {};
const gameIDs = [];

// generic statusCodes / messages that cna be overwritten
let statusCode;
let message;
let errorJSON;
let id;
let responseJSON;

// structure of a game obj
/*
game {
    id: random 4-letter string (ala Jackbox)
    active: bool
    moveCount: int between 0 - 20
    playerNames: [player1Name, player2Name]
    gameState: {
        (list of pos A -> pos U, filled with R# or B# depending on owner if exists)
    }
}
*/

// response objects
const respond = (request, response, status, content) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(content));
  response.end();
};

const respondMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

// GET methods

// gets if gameID exists
// safer method that doesn't try and grab a game object without thorough checks
const getGame = (request, response, queryParams) => {
  id = '';
  // set statusCode to impossible - is going to be changed
  statusCode = 0;

  if (!queryParams.gameID) {
    message = 'Missing gameID query parameter';
    id = 'invalidParams';
    statusCode = 400;
  } else {
    queryParams.gameID = queryParams.gameID.toUpperCase();
    for (const game of gameIDs) {
      if (queryParams.gameID === game) {
        console.log('found game');
        message = 'Game with ID found.';
        statusCode = 200;
        break;
      }
    }

    // if all games scanned and not found
    if (statusCode == 0) {
      message = 'GameID is not one already stored in system. Try using that to create a game!';
      id = 'gameDoesNotExist';
      statusCode = 404;
    }
  }

  responseJSON = {
    message,
  };

  if (id) {
    responseJSON.id = id;
  }

  respond(request, response, statusCode, responseJSON);
};

// gets game, if it exists
// grabs entire game for processing
const getGameState = (request, response, queryParams) => {
  if (!queryParams.gameID) {
    responseJSON = {
      message: 'Missing gameID query parameter',
      id: 'invalidParams',
    };
    statusCode = 400;
    // find if game requested exists
  } else if (findGame(queryParams.gameID.toUpperCase())) {
    responseJSON = {
      message: 'Game found - returned under game in JSON',
      game: games[queryParams.gameID.toUpperCase()],
    };
    statusCode = 200;
  } else {
    // if game doesn't exist, throw out 404
    responseJSON = {
      message: 'GameID does not exist',
      id: 'gameDoesNotExist',
    };
    statusCode = 404;
  }
  respond(request, response, statusCode, responseJSON);
};

// default - sends back 404
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  respond(request, response, 404, responseJSON);
};

// HEAD methods

const getGameMeta = (request, response, queryParams) => {
  id = '';

  // set statusCode to impossible - is going to be changed
  statusCode = 0;

  console.log('getGame');
  if (!queryParams.gameID) {
    statusCode = 400;
  } else {
    for (const game of gameIDs) {
      if (queryParams.gameID === game) {
        console.log('found game');
        statusCode = 200;
        break;
      }
    }
    // if all games scanned and not found
    if (statusCode == 0) {
      statusCode = 404;
    }
  }
  respondMeta(request, response, 404);
};

const getGameStateMeta = (request, response) => {
  if (!queryParams.gameID) {
    statusCode = 400;
    // find if game requested exists
  } else if (findGame(queryParams.gameID)) {
    statusCode = 200;
  } else {
    // if game doesn't exist, throw out 404
    statusCode = 404;
  }
  respondMeta(request, response, statusCode);
};

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

// POST methods

// creates a game either using a preexisting 4-letter ID if sent in / valid
// or a randomly generated new one that is valid
const createGame = (request, response, body) => {
  /// basic info of game - ID will be changed
  const gameJSON = {
    id: '0000',
    active: true,
    moveCount: 0,
    playerNames: ["????????", "????????"],
    gameState: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  };
  errorJSON = {};

  body.gameID = body.gameID.toUpperCase();

  // if valid
  if (body.gameID) {
    // check if length 4 / entirely letters
    if (body.gameID.length != 4 && !/[^A-Z]+$/.test(body.gameID)) {
      errorJSON.message = 'GameID is invalid - must be 4 letters.';
      errorJSON.id = 'invalidParams';
      statusCode = 400;
    } else if (findGame(body.gameID)) {
      errorJSON.message = 'Game already exists.';
      errorJSON.id = 'gameAlreadyExists';
      statusCode = 409; // conflicts with current state since it would dup an ID
    } else {
      // inputted id is valid -> send it
      gameJSON.id = body.gameID;
    }
  } else {
    // create new valid game id
    gameJSON.id = createNewGameID();
  }

  // if error thrown
  if (Object.keys(errorJSON).length !== 0) {
    respond(request, response, statusCode, errorJSON);
  } else {
    // if game created
    games[gameJSON.id] = gameJSON;
    gameIDs.push(gameJSON.id);

    responseJSON = {
      message: `Game created successfully with ID ${gameJSON.id}`,
      gameID: gameJSON.id,
    };
    respond(request, response, 201, responseJSON);
  }
};

// checks if a move is legal, then completes it if it is
const sendMove = (request, response, body) => {
  // get game
  // get button pushed
  // get current state of game
  // change gameState of game to reflect new move
  // send back

  body.gameID = body.gameID.toUpperCase();

  // find if game requested exists
  if (findGame(body.gameID)) {
    // find if additional params are valid
    // player is either Red or Blue AND
    // space is between A / Z inclusive
    if ((body.player === 'Red' || body.player === 'Blue')
    && body.space.charCodeAt(0) >= 'A'.charCodeAt(0)
    && body.space.charCodeAt(0) <= 'Z'.charCodeAt(0)) {
      const game = games[body.gameID];
      const { player } = body;
      // check if game is still editable
      if (game.active) {
        // check if player CAN currently place a tile
        if ((player === 'Red' && game.moveCount % 2 == 0)
        || (player === 'Blue' && game.moveCount % 2 == 1)) {
          // (0, 1 -> 1; 2, 3 -> 2;  4, 5 -> 3;... 18, 19 -> 10; 20 -> FINISH)
          const pieceValue = Math.floor(game.moveCount / 2) + 1;
          /*
          gameState[char - 65] gets ascii value, since they're all organized in order
          player[0] is R or B - marking player
          piece value is piece value
          */
          game.gameState[body.space.charCodeAt(0) - 65] = player[0] + pieceValue;
        } else {
          // player can't place a tile
          responseJSON = {
            message: "It is the other player's turn.",
            id: 'otherPlayersTurn',
          };
          statusCode = 204;
        }
      } else {
        // game is already over
        responseJSON = {
          message: 'Game is already complete.',
          id: 'completeGame',
        };
        statusCode = 204;
      }
    } else {
      /*
      checks if the reason the space was rejected is because it's actually
      already filled - either R/B and a number 1-10
      */
      if (body.space.length > 1 && body.space.length < 4
        && (body.space[0] === 'B' || body.space[0] === 'R')
        && parseInt(body.space.slice(1)) > 0 && parseInt(body.space.slice(1)) < 11) {
        responseJSON = {
          message: 'Space has already been claimed.',
          id: 'spaceAlreadyClaimed',
        };
        statusCode = 204;
      } else {
        responseJSON = {
          message: 'At least one of player / space parameters are invalid.',
          id: 'invalidParams',
        };
        statusCode = 400;
      }
    }
  } else {
    // if game doesn't exist, throw out 404
    responseJSON = {
      message: 'GameID is not one already stored in system.',
      id: 'gameDoesNotExist',
    };
    statusCode = 404;
  }

  // valid game
  if (errorJSON !== {}) {
    respond(request, response, statusCode, errorJSON);
  } else {
    respond(request, response, statusCode, gameJSON);
  }
};

// helper function - finds game by looking through all possible ids
const findGame = (gameID) => {
  let gameExists = false;
  for (const existingID of gameIDs) {
    if (gameID === existingID) {
      gameExists = true;
    }
  }

  return gameExists;
};

// helper function - creates unique ID / scans
const createNewGameID = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let newGameID;
  let notUnique = true;

  // while id is not unique
  while (notUnique) {
    newGameID = '';
    for (let i = 0; i < 4; i++) {
      // generate 4-digit code
      newGameID += characters[Math.floor(Math.random() * characters.length)];
    }
    // see if unique ID to break out of loop
    notUnique = !findGame(newGameID);
  }
  // if unique, return it
  return newGameID;
};

module.exports = {
  getGame,
  getGameMeta,
  getGameState,
  getGameStateMeta,
  notFound,
  notFoundMeta,
  createGame,
  sendMove,
};
