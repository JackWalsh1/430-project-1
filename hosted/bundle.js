/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/scriptTagCode.js":
/*!*********************************!*\
  !*** ./client/scriptTagCode.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_gameLogic_gameLogic_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/gameLogic/gameLogic.js */ \"./src/gameLogic/gameLogic.js\");\n\r\n\r\nconst handleResponse = async (response, parseResponse) => {\r\n\tif (response.status === 200 || response.status === 201) {\r\n\t\tlet responseJSON = await response.json();\r\n\t\tconsole.log(responseJSON);\r\n\t\treturn (0,_src_gameLogic_gameLogic_js__WEBPACK_IMPORTED_MODULE_0__.blackHoleLoad)(responseJSON.gameID);\r\n\t}\r\n\t// get json back\r\n\tlet h1;\r\n\tlet p;\r\n\r\n\t// get content and then create h1 / p if needed - otherwise, just get them\r\n\tconst content = document.querySelector('#result');\r\n\th1 = document.querySelector('#h1');\r\n\tp = document.querySelector('#p');\r\n\r\n\tconst statusCodes = {\r\n\t200: `<b>Success</b>`,\r\n\t201: `<b>Created</b>`,\r\n\t204: `<b>Updated (No Content)</b>`,\r\n\t400: `<b>Bad Request</b>`,\r\n\t404: `<b>Not Found</b>`,\r\n\t409: `<b>Data Conflict</b>`\r\n\t};\r\n\r\n\th1.innerHTML = statusCodes[response.status];\r\n\tif (parseResponse && response.status !== 204) {\r\n\tconst parsedResponse = await response.json();\r\n\r\n\t// if the message is good (aka is the users obj)\r\n\t// then display that\r\n\t// otherwise, display the error\r\n\tp.innerHTML = response.status === 200 \r\n\t? JSON.stringify(parsedResponse.message)\r\n\t: `Message: ${JSON.stringify(parsedResponse.message)}`;\r\n\t} else {\r\n\tp.innerHTML = \"\";\r\n\t}\r\n\r\n\t//Add the elements to the screen.\r\n\tcontent.appendChild(h1);\r\n\tcontent.appendChild(p);    \r\n};\r\n\r\nconst joinGame = async (joinGameForm) => {\r\n\t// build response for get OR head using url / method consts\r\n\tlet gameID = joinGameForm.querySelector(\"#gameIDField\").value;\r\n\t//let url = `/getGame?gameID=${gameID}`;\r\n\tconsole.log(gameID);\r\n\tlet response = await fetch (\"/getGame?gameID=\" + gameID, {\r\n\t\tmethod: \"GET\",\r\n\t\theaders: {\r\n\t\t'Accept': 'application/json'\r\n\t\t},\r\n\t});\r\n\r\n\t// handle the response\r\n\thandleResponse(response, true);\r\n};\r\n\r\nconst createGame = async (createGameForm) => {\r\n\tlet response = await fetch(\"/createGame\", {\r\n\t\tmethod: \"POST\",\r\n\t\theaders: {\r\n\t\t'Content-Type': 'application/x-www-form-urlencoded',\r\n\t\t'Accept': 'application/json',\r\n\t\t},\r\n\t\tbody: `gameID=${createGameForm.querySelector('#gameIDField').value}`,\r\n\t});\r\n\r\n\t// always print a response for post\r\n\thandleResponse(response, true);\r\n};\r\n\r\nconst init = () => {\r\n\tconst joinGameForm = document.querySelector('#joinGameForm');\r\n\tconst createGameForm = document.querySelector('#createGameForm');\r\n\r\n\t// create functions to override initial form functions\r\n\tconst joinGameFormAction = (e) => {\r\n\te.preventDefault();\r\n\tjoinGame(joinGameForm);\r\n\treturn false;\r\n\t};\r\n\r\n\tconst createGameFormAction = (e) => {\r\n\te.preventDefault();\r\n\tcreateGame(createGameForm);\r\n\treturn false;\r\n\t};\r\n\r\n\t// attach evt listeners to forms\r\n\tjoinGameForm.addEventListener('submit', joinGameFormAction);\r\n\tcreateGameForm.addEventListener('submit', createGameFormAction);\r\n\r\n\tconst h1 = document.querySelector(\"#h1\");\r\n\r\n\th1.innerHTML = \"script tag worked!\";\r\n};\r\nwindow.onload = init;\n\n//# sourceURL=webpack://430-project-1/./client/scriptTagCode.js?");

/***/ }),

/***/ "./src/gameLogic/buttonClass.js":
/*!**************************************!*\
  !*** ./src/gameLogic/buttonClass.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Button\": () => (/* binding */ Button)\n/* harmony export */ });\n// creates button\n// functionName = function that button calls when pressed\nclass Button {\n  constructor(idName, className, width, height, backgroundColor, text, functionName) {\n    this.idName = idName;\n    this.className = className;\n    this.width = width;\n    this.height = height;\n    this.backgroundColor = backgroundColor;\n    this.text = text;\n    this.functionName = functionName;\n    this.div = '';\n  }\n\n  // creates button\n  createButton() {\n    // if not already made\n    if (!this.div) {\n      // set up container\n      const button = document.createElement('div');\n\n      // input elements\n      if (this.idName) {\n        button.setAttribute('id', this.idName);\n      }\n      if (this.className) {\n        button.setAttribute('class', this.className);\n      }\n      if (this.functionName) {\n        button.setAttribute('onclick', this.functionName);\n      }\n\n      // set dimensions / color\n      button.style.width = this.width;\n      button.style.height = this.height;\n      button.style.backgroundColor = this.backgroundColor;\n\n      // create text\n      const textnode = document.createTextNode(this.text);\n      button.appendChild(textnode);\n\n      // log button\n      this.div = button;\n    }\n\n    // return button - also works as getter\n    return this.div;\n  }\n}\n\n\n//# sourceURL=webpack://430-project-1/./src/gameLogic/buttonClass.js?");

/***/ }),

/***/ "./src/gameLogic/gameLogic.js":
/*!************************************!*\
  !*** ./src/gameLogic/gameLogic.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"blackHoleLoad\": () => (/* binding */ blackHoleLoad)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/gameLogic/utils.js\");\n/* harmony import */ var _buttonClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buttonClass.js */ \"./src/gameLogic/buttonClass.js\");\n\n\n\n// global containers needed\nlet textNode;\nconst gameContainer = document.querySelector(\"#gameContainer\");\n\n// global variables for games\nlet currentPlayer;\nlet round;\nlet aiPlaying;\nlet remainingTiles = [];\nlet player1Tiles = [];\nlet player2Tiles = [];\n\nlet blackHoleBoardArray;\n\n// load general structure for black hole\nconst blackHoleLoad = async (gameID) => {\n  // reset game\n  _utils_js__WEBPACK_IMPORTED_MODULE_0__.flipScreens();\n  _utils_js__WEBPACK_IMPORTED_MODULE_0__.resetGame();\n  _utils_js__WEBPACK_IMPORTED_MODULE_0__.createHeader('blackHole');\n\n  // get gamestate\n  const response = await fetch(`/getGameState?gameID=${gameID}`, {\n    method: 'GET',\n    headers: {\n      Accept: 'application/json',\n    },\n  });\n\n  const responseJSON = await response.json();\n  const game = responseJSON.game;\n\n  // set game variables\n  round = Math.floor(game.moveCount / 2) + 1;\n  currentPlayer = (game.moveCount % 2 === 0) ? 1 : 2;\n\n  // set defaults to fill in later\n  remainingTiles = [];\n  player1Tiles = [];\n  player2Tiles = [];\n\n  // create player 1 pieces / container\n  const player1Pieces = document.createElement('div');\n  player1Pieces.setAttribute('id', 'player1Pieces');\n  player1Pieces.setAttribute('class', 'playerPieces');\n\n  const player1Name = document.createElement('p');\n  player1Name.setAttribute('id', 'player1Name');\n  player1Name.setAttribute('class', 'playerName');\n  player1Name.innerHTML = 'Player';\n  player1Pieces.appendChild(player1Name);\n\n  // only create as many pieces as physically available\n  for (let i = round; i < 11; i++) {\n    // create space\n    const playerPiece = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_1__.Button(\n      `player1Piece${i}`,\n      'playerPiece player1Piece',\n      '65px',\n      '65px',\n      '#FF0000',\n      i,\n      '',\n    );\n\n    player1Pieces.appendChild(playerPiece.createButton());\n  }\n\n  // create player 2 pieces / container\n  const player2Pieces = document.createElement('div');\n  player2Pieces.setAttribute('id', 'player2Pieces');\n  player2Pieces.setAttribute('class', 'playerPieces');\n\n  const player2Name = document.createElement('p');\n  player2Name.setAttribute('id', 'player2Name');\n  player2Name.setAttribute('class', 'playerName');\n  player2Name.innerHTML = 'Player';\n  player2Pieces.appendChild(player2Name);\n\n  for (let i = 1; i < 11; i++) {\n    // create space\n    const playerPiece = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_1__.Button(\n      `player2Piece${i}`,\n      'playerPiece player2Piece',\n      '65px',\n      '65px',\n      '#0000FF',\n      i,\n      '',\n    );\n\n    player2Pieces.appendChild(playerPiece.createButton());\n  }\n\n  // append containers\n  gameContainer.append(player1Pieces, player2Pieces);\n\n  // create game board div\n  const blackHoleBoard = document.createElement('div');\n  blackHoleBoard.setAttribute('id', 'blackHoleBoard');\n\n  // create rows of game board\n  const blackHoleRow1 = document.createElement('div');\n  blackHoleRow1.setAttribute('class', 'blackHoleRow');\n  const blackHoleRow2 = document.createElement('div');\n  blackHoleRow2.setAttribute('class', 'blackHoleRow');\n  const blackHoleRow3 = document.createElement('div');\n  blackHoleRow3.setAttribute('class', 'blackHoleRow');\n  const blackHoleRow4 = document.createElement('div');\n  blackHoleRow4.setAttribute('class', 'blackHoleRow');\n  const blackHoleRow5 = document.createElement('div');\n  blackHoleRow5.setAttribute('class', 'blackHoleRow');\n  const blackHoleRow6 = document.createElement('div');\n  blackHoleRow6.setAttribute('class', 'blackHoleRow');\n\n  // reset black hole storage array\n  blackHoleBoardArray = [\n    [],\n    [],\n    [],\n    [],\n    [],\n    [],\n  ];\n\n  // for each space\n  for (let i = 0; i < 21; i++) {\n    // create space\n    const blackHoleSpace = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_1__.Button(\n      `blackHoleSpace${String.fromCharCode(65 + i)}`,\n      'blackHoleSpace',\n      '88px',\n      '88px',\n      'gray',\n      String.fromCharCode(65 + i),\n      `placePiece('${String.fromCharCode(65 + i)}')`,\n    );\n\n    blackHoleSpace.createButton();\n\n    // sort into pyramid structure\n    if (blackHoleBoardArray[0].length < 6) {\n      blackHoleBoardArray[0].push(blackHoleSpace.div);\n      blackHoleRow1.appendChild(blackHoleSpace.div);\n    } else if (blackHoleBoardArray[1].length < 5) {\n      blackHoleBoardArray[1].push(blackHoleSpace.div);\n      blackHoleRow2.appendChild(blackHoleSpace.div);\n    } else if (blackHoleBoardArray[2].length < 4) {\n      blackHoleBoardArray[2].push(blackHoleSpace.div);\n      blackHoleRow3.appendChild(blackHoleSpace.div);\n    } else if (blackHoleBoardArray[3].length < 3) {\n      blackHoleBoardArray[3].push(blackHoleSpace.div);\n      blackHoleRow4.appendChild(blackHoleSpace.div);\n    } else if (blackHoleBoardArray[4].length < 2) {\n      blackHoleBoardArray[4].push(blackHoleSpace.div);\n      blackHoleRow5.appendChild(blackHoleSpace.div);\n    } else {\n      blackHoleBoardArray[5].push(blackHoleSpace.div);\n      blackHoleRow6.appendChild(blackHoleSpace.div);\n    }\n\n    // push to track remaining tiles\n    remainingTiles.push(blackHoleSpace);\n  }\n\n  // append all elements to blackholeBoard + add it to container\n  blackHoleBoard.append(blackHoleRow1, blackHoleRow2, blackHoleRow3, blackHoleRow4, blackHoleRow5, blackHoleRow6);\n  gameContainer.append(blackHoleBoard);\n\n  // create game status / append it\n  const gameStatus = document.createElement('div');\n  gameStatus.setAttribute('id', 'gameStatus');\n  textNode = document.createTextNode('Starting up...');\n  gameStatus.append(textNode);\n  gameContainer.append(gameStatus);\n\n  optionPopUp('blackHole');\n};\n\nfunction createTiles(player, round) {\n  return;\n}\n\n// decide what piece was selected, add them to player list, and then swap player / round\nfunction placePiece(letter) {\n  // find piece that was clicked\n  const spaceToAdjust = document.body.querySelector(`#blackHoleSpace${letter}`);\n\n  // set player color to show who placed it / log it for future scoring\n  if (currentPlayer == 1) {\n    spaceToAdjust.style.backgroundColor = '#FF0000';\n    player1Tiles.push(spaceToAdjust);\n    document.body.querySelector(`#player1Piece${round}`).remove();\n  } else {\n    spaceToAdjust.style.backgroundColor = '#0000FF';\n    player2Tiles.push(spaceToAdjust);\n    document.body.querySelector(`#player2Piece${round}`).remove();\n  }\n  // disable future interactions\n  spaceToAdjust.classList.add('isDisabled');\n\n  // remove tile from remaining tiles\n  remainingTiles.splice(remainingTiles.findIndex((tile) => tile.idName == `blackHoleSpace${letter}`), 1);\n\n  // set up needed initialization variables\n  spaceToAdjust.innerHTML = round;\n\n  // flip player control / iterate to next round if needed\n  // round can be used to track what piece need to be used\n  if (currentPlayer == 1) {\n    currentPlayer++;\n    // jump to ai \"move\" if needed\n    if (aiPlaying) {\n      document.body.querySelector('#gameStatus').innerHTML = 'AI is thinking...';\n      aiBlackHoleMove();\n    } else {\n      document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player2Name').innerHTML;\n      document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;\n    }\n  } else if (round == 10) {\n    // if player 2 + round 10, game over.\n    calculateWinner();\n  } else {\n    // start next round and player 1's turn\n    currentPlayer = 1;\n    round++;\n    document.body.querySelector('#gameStatus').innerHTML = document.body.querySelector('#player1Name').innerHTML;\n    document.body.querySelector('#gameStatus').innerHTML += `, place your ${round} piece.`;\n  }\n}\n\n// grabs a random value from the remaining value, delays to simulate thinking,\n// and then chooses that piece\nasync function aiBlackHoleMove() {\n  document.body.querySelector('#blackHoleBoard').classList.add('isDisabled');\n  let randomTile = Math.round(Math.random() * remainingTiles.length);\n  if (randomTile == remainingTiles.length) { randomTile = 0; }\n  randomTile = remainingTiles[randomTile];\n  randomTile = randomTile.idName.charAt(randomTile.idName.length - 1);\n  const delayres = await delay(1000);\n  document.body.querySelector('#blackHoleBoard').classList.remove('isDisabled');\n  placePiece(randomTile.toUpperCase());\n}\n\n// calculate winner of Black Hole\nfunction calculateWinner() {\n  const blackHole = remainingTiles[0].div;\n  let blackHoleRow; let\n    blackHolePosition;\n  const player1ScoreTiles = [];\n  const player2ScoreTiles = [];\n  let player1Score = 0;\n  let player2Score = 0;\n  let result;\n\n  // find position of black hole in pyramid structure\n  for (let i = 0; i < blackHoleBoardArray.length; i++) {\n    for (let j = 0; j < blackHoleBoardArray[i].length; j++) {\n      if (blackHoleBoardArray[i][j] == blackHole) {\n        blackHoleRow = i;\n        blackHolePosition = j;\n        blackHoleBoardArray[i][j].classList.add('isDisabled');\n      }\n    }\n  }\n\n  // create two arrays of sucked in numbers - one for each player\n  for (let i = -1; i < 2; i++) {\n    for (let j = -1; j < 2; j++) {\n      // ignores non-adjacent squares\n      if (i != j) {\n        // excludes non-real indexes - a lot of weird math behind this one...\n        if (\n          blackHoleRow + i + blackHolePosition + j < 6\n                      && blackHoleRow + i >= 0\n                      && blackHolePosition + j >= 0) {\n          // check which player's piece was sucked in\n          const spaceSuckedIn = blackHoleBoardArray[blackHoleRow + i][blackHolePosition + j];\n          // by cycling through all ten possible tiles\n          for (let i = 0; i < 10; i++) {\n            // push value of space + add it to sum\n            if (spaceSuckedIn === player1Tiles[i]) {\n              player1ScoreTiles.push(spaceSuckedIn.innerHTML);\n              player1Score += parseInt(spaceSuckedIn.innerHTML);\n            } else if (spaceSuckedIn === player2Tiles[i]) {\n              player2ScoreTiles.push(spaceSuckedIn.innerHTML);\n              player2Score += parseInt(spaceSuckedIn.innerHTML);\n            }\n          }\n        }\n      }\n    }\n  }\n\n  // check win conditions\n  // if the score is higher\n  if (player1Score == player2Score) {\n    // tiebreaker 1: if less tiles sucked in\n    if (player1ScoreTiles.length == player2ScoreTiles.length) {\n      // tiebreaker 2: sort tiles and check which piece is the lowest\n      // if they're exactly equal - tie\n      player1ScoreTiles.sort((a, b) => b - a);\n      player2ScoreTiles.sort((a, b) => b - a);\n      for (let i = 0; i < player1ScoreTiles.length; i++) {\n        if (player1ScoreTiles[i] < player2ScoreTiles[i]) {\n          result = `${document.body.querySelector('#player1Name').innerHTML} has won by having a ${player1ScoreTiles[i]} vs a ${player2ScoreTiles[i]} sucked in!`;\n        } else if (player1ScoreTiles[i] > player2ScoreTiles[i]) {\n          result = `${document.body.querySelector('#player2Name').innerHTML} has won by having a ${player2ScoreTiles[i]} vs a ${player1ScoreTiles[i]} sucked in!`;\n        }\n        // everything else is just a result being stored and printed\n      }\n      if (!result) {\n        result = 'This game is a perfect tie!';\n      }\n    } else if (player1ScoreTiles.length < player2ScoreTiles.length) {\n      result = `${document.body.querySelector('#player1Name').innerHTML} has won by having less pieces sucked in!`;\n    } else {\n      result = `${document.body.querySelector('#player2Name').innerHTML} has won by having less pieces sucked in!`;\n    }\n  } else if (player1Score < player2Score) {\n    result = `${document.body.querySelector('#player1Name').innerHTML} has won by a score of ${player1Score} to ${player2Score}!`;\n  } else {\n    result = `${document.body.querySelector('#player2Name').innerHTML} has won by a score of ${player2Score} to ${player1Score}!`;\n  }\n  document.body.querySelector('#gameStatus').innerHTML = result;\n}\n\n//# sourceURL=webpack://430-project-1/./src/gameLogic/gameLogic.js?");

/***/ }),

/***/ "./src/gameLogic/utils.js":
/*!********************************!*\
  !*** ./src/gameLogic/utils.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"closePopUp\": () => (/* binding */ closePopUp),\n/* harmony export */   \"createHeader\": () => (/* binding */ createHeader),\n/* harmony export */   \"delay\": () => (/* binding */ delay),\n/* harmony export */   \"flipScreens\": () => (/* binding */ flipScreens),\n/* harmony export */   \"loadHelpBox\": () => (/* binding */ loadHelpBox),\n/* harmony export */   \"optionPopUp\": () => (/* binding */ optionPopUp),\n/* harmony export */   \"resetGame\": () => (/* binding */ resetGame),\n/* harmony export */   \"setSettings\": () => (/* binding */ setSettings),\n/* harmony export */   \"toggleDiv\": () => (/* binding */ toggleDiv)\n/* harmony export */ });\n/* harmony import */ var _buttonClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buttonClass.js */ \"./src/gameLogic/buttonClass.js\");\n\n\n// load instructions for each game in popup box\nfunction loadHelpBox(game) {\n  // disable all content outside pop up\n  document.body.querySelector('#gameContainer').classList.add('isDisabled');\n\n  // set up darkening of elements\n  const backDim = document.createElement('div');\n  backDim.setAttribute('id', 'backDim');\n\n  // set up actual content of div\n  const popUpContainer = document.createElement('div');\n  popUpContainer.setAttribute('id', 'popUpContainer');\n\n  const closeButton = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_0__.Button(\n    'closeButton',\n    '',\n    '50px',\n    '50px',\n    '',\n    'X',\n    'closePopUp()',\n  );\n\n  closeButton.createButton();\n\n  // as procedural based on game, don't add content to yet\n  const title = document.createElement('h1');\n  title.setAttribute('id', 'popUpTitle');\n  const gameInstructions = document.createElement('div');\n  gameInstructions.setAttribute('id', 'gameInstructions');\n  gameInstructions.scroll(top);\n\n  // display text of popup\n  switch (game) {\n    case 'blackHole':\n      title.textContent = 'Black Hole';\n      gameInstructions.innerHTML = \t\t\t`<h5>In Black Hole, your goal is to have the lowest sum of pieces sucked into the titular \"Black Hole\".<h5>\n              <h3>Game Flow</h3>\n              <p>Each player, going back and forth, places pieces 1-10 in numerical order. Once all 10 pieces are placed by all players,\n              the remaining tile becomes the \"Black Hole\", and sucks in all pieces touching it. The numbers written on the pieces of \n              each player that get sucked in are summed together, and the player with the lowest sum wins. In the event of a tie, the \n              player with the least pieces sucked in wins - if this does not break the tie, the lowest piece with the most value \n              sucked in wins.</p>\n              <h3>Controls</h3>\t\n              <p>The bottom status bar will say whose turn it is. When it's your turn, click on the tile on the pyramid (labelled with a letter)\n              that you would like to place your next piece. You can always know your next piece to place by looking at your tiles on your side\n              of the screen, under your name - the highest tile up / the lowest-value tile is what you're placing.</p>`;\n      break;\n    case 'credits':\n      title.textContent = 'Credits';\n      gameInstructions.innerHTML = \t\t\t`<h3>Game Created by Walter Joris</h3>\n              <h3>Website Created by Jack Walsh</h3>\n              <a href=\"https://docs.google.com/document/d/1b6NL-ogLaOMzX2hbALHpSkxvjquQrNXEOjGc5KQCoWQ/edit?usp=sharing\" target=\"_blank\">Documentation</a> `;\n      break;\n    default:\n      title.textContent = 'error';\n      gameInstructions.innerHTML = \t\t\t'If you\\'re seeing this, God has died. Only explanation.';\n      break;\n  }\n\n  // append elements\n  popUpContainer.append(closeButton.div, title, gameInstructions);\n  document.body.append(backDim, popUpContainer);\n}\n\n// close popup\nfunction closePopUp() {\n  // enable container\n  document.body.querySelector('#gameContainer').classList.remove('isDisabled');\n\n  // delete popup / backDim\n  document.querySelector('#backDim').remove();\n  document.querySelector('#popUpContainer').remove();\n}\n\n// open option pop up\nfunction optionPopUp(game) {\n  // disable all content outside pop up\n  document.body.querySelector('#gameContainer').classList.add('isDisabled');\n\n  // set up darkening of elements\n  const backDim = document.createElement('div');\n  backDim.setAttribute('id', 'backDim');\n\n  // set up actual content of div\n  const popUpContainer = document.createElement('div');\n  popUpContainer.setAttribute('id', 'popUpContainer');\n\n  const options = document.createElement('div');\n  options.setAttribute('id', 'options');\n\n  const player1Name = document.createElement('div');\n  player1Name.setAttribute('id', 'player1NameContainer');\n\n  const player1NameInput = document.createElement('input');\n  player1NameInput.setAttribute('id', 'player1NameInput');\n  player1NameInput.setAttribute('class', 'nameInput');\n  player1NameInput.setAttribute('type', 'text');\n  player1NameInput.setAttribute('maxlength', '8');\n\n  const player1NameLabel = document.createElement('label');\n  player1NameInput.setAttribute('class', 'label');\n  player1NameLabel.htmlFor = 'player1NameInput';\n  player1NameLabel.innerHTML = 'Player 1 Name: ';\n\n  player1Name.append(player1NameLabel, player1NameInput);\n\n  // set up switch for player 2\n  const player2SwitchContainer = document.createElement('label');\n  player2SwitchContainer.setAttribute('id', 'player2SwitchContainer');\n  player2SwitchContainer.setAttribute('class', 'switch');\n\n  const player2Switch = document.createElement('input');\n  player2Switch.setAttribute('id', 'switchContainer');\n  player2Switch.setAttribute('type', 'checkbox');\n  player2Switch.setAttribute('onchange', \"toggleDiv('#player2NameContainer')\");\n  const player2SwitchSpan = document.createElement('span');\n  player2SwitchSpan.setAttribute('class', 'slider round');\n\n  const player2SwitchLabel = document.createElement('label');\n  player2SwitchLabel.setAttribute('class', 'label');\n  player2SwitchLabel.htmlFor = 'player2SwitchContainer';\n  player2SwitchLabel.innerHTML = '2 Player?: ';\n\n  player2SwitchContainer.append(player2Switch, player2SwitchSpan);\n\n  const player2NameContainer = document.createElement('div');\n  player2NameContainer.setAttribute('id', 'player2NameContainer');\n  player2NameContainer.style.display = 'none';\n\n  const player2NameInput = document.createElement('input');\n  player2NameInput.setAttribute('id', 'player2NameInput');\n  player2NameInput.setAttribute('class', 'nameInput');\n  player2NameInput.setAttribute('type', 'text');\n  player2NameInput.setAttribute('maxlength', '8');\n\n  const player2NameLabel = document.createElement('label');\n  player2NameInput.setAttribute('class', 'label');\n  player2NameLabel.htmlFor = 'player2NameInput';\n  player2NameLabel.innerHTML = 'Player 2 Name: ';\n\n  player2NameContainer.append(player2NameLabel, player2NameInput);\n\n  options.append(player1Name, player2SwitchLabel, player2SwitchContainer, player2NameContainer);\n\n  const enterButton = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_0__.Button(\n    'enterButton',\n    '',\n    '100px',\n    '50px',\n    'gray',\n    'Start Game',\n    `setSettings('${game}')`,\n  );\n\n  popUpContainer.append(options, enterButton.createButton());\n  document.body.append(backDim, popUpContainer);\n}\n\n// push settings to main game\nfunction setSettings(game) {\n  let aiWanted;\n  if (document.querySelector('#player1NameInput').value == '') {\n    document.querySelector('#player1Name').innerHTML = 'Player 1';\n  } else {\n    document.querySelector('#player1Name').innerHTML = document.querySelector('#player1NameInput').value;\n  }\n\n  if (document.querySelector('#player2NameContainer').style.display == 'none') {\n    aiWanted = true;\n    document.querySelector('#player2Name').innerHTML = 'AI';\n  } else {\n    aiWanted = false;\n    if (document.querySelector('#player2NameInput').value == '') {\n      document.querySelector('#player2Name').innerHTML = 'Player 2';\n    } else {\n      document.querySelector('#player2Name').innerHTML = document.querySelector('#player2NameInput').value;\n    }\n  }\n\n  document.body.querySelector('#gameStatus').innerHTML = `${document.body.querySelector('#player1Name').innerHTML}, place your 1 piece.`;\n\n  aiPlaying = aiWanted;\n\n  document.body.querySelector('#gameContainer').classList.remove('isDisabled');\n\n  document.querySelector('#backDim').remove();\n  document.querySelector('#popUpContainer').remove();\n}\n\n// toggles div\nfunction toggleDiv(divID) {\n  if (document.querySelector(divID).style.display == 'none') {\n    document.querySelector(divID).style.display = '';\n  } else {\n    document.querySelector(divID).style.display = 'none';\n  }\n}\n\n// delays function by delay in milliseconds\nfunction delay(delayInms) {\n  return new Promise((resolve) => {\n    setTimeout(() => {\n      resolve(2);\n    }, delayInms);\n  });\n}\n\n// reset div of games\nfunction resetGame() {\n  // reset HTML\n  gameContainer.innerHTML = '';\n  gameContainer.className = '';\n\n  gameContainer.classList = '';\n  gameContainer.setAttribute('class', `blackHoleGameScene`);\n}\n\nfunction flipScreens() {\n  let homeScreen = document.querySelector(\"#homeScreen\");\n  let gameContainer = document.querySelector(\"#gameContainer\");\n\n  // flip the two screen's visibility\n  if (homeScreen.classList.contains(\"hidden\")) {\n    homeScreen.classList.replace(\"hidden\", \"visible\");\n    gameContainer.classList.replace(\"visible\", \"hidden\");\n  } else {\n    homeScreen.classList.replace(\"visible\", \"hidden\");\n    gameContainer.classList.replace(\"hidden\", \"visible\");\n  }\n}\n\n// create header for games\nfunction createHeader(game) {\n  // create container\n  const header = document.createElement('div');\n  header.setAttribute('id', 'uiHeader');\n\n  // create back arrow\n  const backButton = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_0__.Button(\n    'backButton',\n    '',\n    '60px',\n    '60px',\n    '',\n    '←',\n    'GameSelect()',\n  );\n\n  const helpButton = new _buttonClass_js__WEBPACK_IMPORTED_MODULE_0__.Button(\n    'helpButton',\n    '',\n    '120px',\n    '60px',\n    '#FFFF00',\n    `${capitalizeMultipleWords(game)} Rules`,\n    `loadHelpBox('${game}')`,\n  );\n\n  // create title\n  const title = document.createElement('h1');\n  title.setAttribute('id', 'gameTitle');\n  let textNode = document.createTextNode(capitalizeMultipleWords(game));\n  title.appendChild(textNode);\n\n  // append all items\n  header.append(backButton.createButton(), title, helpButton.createButton());\n  gameContainer.append(header);\n}\n\n// capitalize multiple words\nfunction capitalizeMultipleWords(words) {\n  let result = '';\n\n  for (const letter of words) {\n    if (letter == letter.toUpperCase()) {\n      // find index of capital\n      const indexOfSpace = words.indexOf(letter.toUpperCase());\n      // splice at word break\n      const wordToCapitalize = words.substring(0, indexOfSpace);\n      // add capped word to result\n      result += `${capitalizeFirstChar(wordToCapitalize)} `;\n      // remove capped word from words string\n      words = words.substring(indexOfSpace, words.length);\n    }\n  }\n\n  // return result and last word remaining capitalized\n  return result + capitalizeFirstChar(words);\n}\n\n// capitalize first character of words\nfunction capitalizeFirstChar(word) {\n  return word.charAt(0).toUpperCase() + word.slice(1);\n}\n\n\n//# sourceURL=webpack://430-project-1/./src/gameLogic/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/scriptTagCode.js");
/******/ 	
/******/ })()
;