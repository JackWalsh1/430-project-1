const fs = require('fs');

const apiTest = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const game = fs.readFileSync(`${__dirname}/../hosted/game.html`);
const documentation = fs.readFileSync(`${__dirname}/../hosted/documentation.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);

const getAPITest = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(apiTest);
  response.end();
};

const getGamePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(game);
  response.end();
};

const getDocumentation = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(documentation);
  response.end();
};

const getCSS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

// Serve the bundle.js file
const getBundle = (request, response) => {
  console.log("grabbing bundle");
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(bundle);
  response.end();
};

module.exports = {
  getAPITest,
  getGamePage,
  getDocumentation,
  getCSS,
  getBundle
};
