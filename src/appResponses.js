const fs = require('fs');

const apiTest = fs.readFileSync(`${__dirname}/../client/client.html`);
const game = fs.readFileSync(`${__dirname}/../client/game.html`);
const documentation = fs.readFileSync(`${__dirname}/../client/documentation.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

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

module.exports = {
  getAPITest,
  getGamePage,
  getDocumentation,
  getCSS,
};
