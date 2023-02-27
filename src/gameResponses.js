// 'database' of all users
const games = {};

// structure of a game obj
/*
game {
    id: random 8-char string
    active: bool
    moveCount: int between 0 - 20
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

const getGame = (request, response, queryParams) => {
  // for each game obj
  // look to see if id is a direct match
  // if so, return it
  // if no such id exists, prompt if you want to make it (aka send to createGame w/ id)
};

const getGameState = (request, response, queryParams) => {
  // run getGame
  // for getGame, grab:
  //  active (able to edit - otherwise, just display end result)
  //  move count (informs player to go)
  //  the state of the board
};

// default - sends back 404
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
};

// HEAD methods

const getGameMeta = (request, response) => {
  respondMeta(request, response, 404);
};

const getGameStateMeta = (request, response) => {
  respondMeta(request, response, 404);
};

const notFoundMeta = (request, response) => {
  respondMeta(request, response, 404);
};

// POST methods

const createGame = (request, response, body) => {
  // create game obj
  // populate it with relevant info
  // send it to games "database"
};

const sendMove = (request, response, body) => {
  // call getGame
  // get button pushed
  // get current state of game
  // change gameState of game to reflect new move
  // send back
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
