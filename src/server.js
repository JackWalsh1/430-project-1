// request code
const http = require('http');
const url = require('url');
const query = require('querystring');
const appHandler = require('./appResponses.js');
const gameHandler = require('./gameResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const routes = {
  GET: {
    '/': appHandler.getGamePage,
    '/getAPITest': appHandler.getAPITest,
    '/getGamePage': appHandler.getGamePage,
    '/getDocumentation': appHandler.getDocumentation,
    '/bundle.js': appHandler.getBundle,
    '/scriptTagCode.js': appHandler.getBundle,
    '/style.css': appHandler.getCSS,
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
    '/sendMove': gameHandler.sendMove,
    notFound: gameHandler.notFound,
  },
};

const parseBody = (request, response, handler) => {
  const body = [];

  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const params = query.parse(parsedUrl.query);

  // if request method does not exist
  if (!routes[request.method]) {
    // notFound head
    return routes.HEAD.notFound(request, response);
  }

  console.log('onrequest');
  // if path exists
  if (routes[request.method][parsedUrl.pathname]) {
    // special parse body for post
    if (request.method === 'POST') {
      parseBody(request, response, routes[request.method][parsedUrl.pathname]);
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
