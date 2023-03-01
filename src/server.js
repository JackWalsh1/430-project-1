// request code
const http = require('http');
const url = require('url');
const query = require('querystring');
const appHandler = require('./appResponses.js');
const gameHandler = require('./gameResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  GET: {
    '/': appHandler.getIndex,
    '/style.css': appHandler.getIndexCSS,
    '/getGame': gameHandler.getGame,
    '/getGameState': gameHandler.getGameState,
    notFound: gameHandler.notFound,
  },
  HEAD: {
    '/getGame': gameHandler.getGameMeta,
    '/getGameState': gameHandler.getGameStateMeta,
    notFound: gameHandler.notFoundMeta,
  },
  POST: {
    '/createGame': gameHandler.createGame,
    '/sendMove': gameHandler.addUser,
    notFound: gameHandler.notFound,
  },
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // if request method does not exist
  if (!routes[request.method]) {
    // notFound head
    return routes.HEAD.notFound(request, response);
  }

  // if path exists
  if (routes[request.method][parsedUrl.pathname]) {
    // special parse body for post
    if (request.method === 'POST') {
      parseBody(request, response);
      return routes[request.method][parsedUrl.pathname];
    }

    // get or head -> go there
    return routes[request.method][parsedUrl.pathname](request, response, params);
  }

  // otherwise return notFound for that
  return routes[request.method].notFound(request, response);
};

// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);