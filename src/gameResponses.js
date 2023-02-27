// 'database' of all users
const games = {};

// structure of a game obj
/*
game {
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

// default - sends back 404
const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
}


// HEAD methods

const notFoundMeta = (request, response) => {
    respondMeta(request, response, 404);
  };