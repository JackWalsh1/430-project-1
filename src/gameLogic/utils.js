import {Button} from "./buttonClass.js";

// load instructions for each game in popup box
export function loadHelpBox(game) {
  // disable all content outside pop up
  document.body.querySelector('#gameContainer').classList.add('isDisabled');

  // set up darkening of elements
  const backDim = document.createElement('div');
  backDim.setAttribute('id', 'backDim');

  // set up actual content of div
  const popUpContainer = document.createElement('div');
  popUpContainer.setAttribute('id', 'popUpContainer');

  const closeButton = new Button(
    'closeButton',
    '',
    '50px',
    '50px',
    '',
    'X',
    (evt) => closePopUp(),
  );

  closeButton.createButton();

  // as procedural based on game, don't add content to yet
  const title = document.createElement('h1');
  title.setAttribute('id', 'popUpTitle');
  const gameInstructions = document.createElement('div');
  gameInstructions.setAttribute('id', 'gameInstructions');
  gameInstructions.scroll(top);

  // display text of popup
  switch (game) {
    case 'blackHole':
      title.textContent = 'Black Hole';
      gameInstructions.innerHTML = 			`<h5>In Black Hole, your goal is to have the lowest sum of pieces sucked into the titular "Black Hole".<h5>
              <h3>Game Flow</h3>
              <p>Each player, going back and forth, places pieces 1-10 in numerical order. Once all 10 pieces are placed by all players,
              the remaining tile becomes the "Black Hole", and sucks in all pieces touching it. The numbers written on the pieces of 
              each player that get sucked in are summed together, and the player with the lowest sum wins. In the event of a tie, the 
              player with the least pieces sucked in wins - if this does not break the tie, the lowest piece with the most value 
              sucked in wins.</p>
              <h3>Controls</h3>	
              <p>The bottom status bar will say whose turn it is. When it's your turn, click on the tile on the pyramid (labelled with a letter)
              that you would like to place your next piece. You can always know your next piece to place by looking at your tiles on your side
              of the screen, under your name - the highest tile up / the lowest-value tile is what you're placing.</p>`;
      break;
    case 'credits':
      title.textContent = 'Credits';
      gameInstructions.innerHTML = 			`<h3>Game Created by Walter Joris</h3>
              <h3>Website Created by Jack Walsh</h3>
              <a href="https://docs.google.com/document/d/1b6NL-ogLaOMzX2hbALHpSkxvjquQrNXEOjGc5KQCoWQ/edit?usp=sharing" target="_blank">Documentation</a> `;
      break;
    default:
      title.textContent = 'error';
      gameInstructions.innerHTML = 			'If you\'re seeing this, God has died. Only explanation.';
      break;
  }

  // append elements
  popUpContainer.append(closeButton.div, title, gameInstructions);
  document.body.append(backDim, popUpContainer);
}

// close popup
export const closePopUp = () => {
  // enable container
  document.body.querySelector('#gameContainer').classList.remove('isDisabled');

  // delete popup / backDim
  document.querySelector('#backDim').remove();
  document.querySelector('#popUpContainer').remove();
};

// open option pop up with relevant info for player
export function optionPopUp(game, activePlayer) {
  let moveCount = game.moveCount;
  // disable all content outside pop up
  document.body.querySelector('#gameContainer').classList.add('isDisabled');

  // set up darkening of elements
  const backDim = document.createElement('div');
  backDim.setAttribute('id', 'backDim');

  // set up actual content of div
  const popUpContainer = document.createElement('div');
  popUpContainer.setAttribute('id', 'popUpContainer');

  const options = document.createElement('div');
  options.setAttribute('id', 'options');

  const playerName = document.createElement('div');
  playerName.setAttribute('id', 'player1NameContainer');

  const playerNameInput = document.createElement('input');
  playerNameInput.setAttribute('id', `playerNameInput`);
  playerNameInput.setAttribute('class', 'nameInput');
  playerNameInput.setAttribute('type', 'text');
  playerNameInput.setAttribute('maxlength', '8');

  const playerNameLabel = document.createElement('label');
  playerNameInput.setAttribute('class', 'label');
  playerNameLabel.htmlFor = `player${moveCount + 1}NameInput`;
  playerNameLabel.innerHTML = `Player ${moveCount + 1} Name: `;

  playerName.append(playerNameLabel, playerNameInput);
  options.append(playerName);

  const enterButton = new Button(
    'enterButton',
    '',
    '100px',
    '50px',
    'gray',
    'Start Game',
    (evt) => setSettings(game, true, activePlayer)
  );

  popUpContainer.append(options, enterButton.createButton());
  document.body.append(backDim, popUpContainer);
}

// push settings to main game
export const setSettings = async (game, fromOptionsMenu, activePlayer) => {
  console.log("set settings");
  // if value just set
  if (fromOptionsMenu) {
    let name = document.querySelector('#playerNameInput').value;
    // if name space was blank, set as Player X - otherwise, use name
    game.playerNames[game.moveCount] = name === '' ? `Player ${game.moveCount + 1}` : name;
  }

  document.body.querySelector("#player1Name").innerHTML = game.playerNames[0];
  // if player 2 isn't 8 question marks, have it show waiting - else, display name
  document.body.querySelector("#player2Name").innerHTML = game.playerNames[1] === '????????' ? "P2ToJoin" : game.playerNames[1];

  document.body.querySelector('#gameStatus').innerHTML = `${game.playerNames[game.moveCount]}, place your 1 piece.`;

  document.body.querySelector('#gameContainer').classList.remove('isDisabled');

  document.querySelector('#backDim').remove();
  document.querySelector('#popUpContainer').remove();

  console.log(game);

  let player = activePlayer;
  let name = document.querySelector(activePlayer === "Red" ? "#player1Name" : "#player2Name").innerHTML;
  let body = `gameID=${game.id}&player=${player}&name=${name}`;

  console.log(body);
  let response = await fetch("/sendPlayerName", {
    method: "POST",
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    },
    body: body,
  });

  console.log(await response.json());
}



// delays function by delay in milliseconds
export function delay(delayInms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delayInms);
  });
}

// reset div of games
export function resetGame(gameContainer) {
  // reset HTML
  gameContainer.innerHTML = '';
  gameContainer.className = '';

  gameContainer.classList = '';
  gameContainer.setAttribute('class', `blackHoleGameScene`);
}

export function flipScreens() {
  toggleDiv("#homeScreen");
  toggleDiv("#gameContainer");
}

// toggles div
export function toggleDiv(divID) {
  if (document.querySelector(divID).style.display == 'none') {
    document.querySelector(divID).style.display = '';
  } else {
    document.querySelector(divID).style.display = 'none';
  }
}

// create header for games
export function createHeader(game) {
  // create container
  const header = document.createElement('div');
  header.setAttribute('id', 'uiHeader');

  // create back arrow
  const backButton = new Button(
    'backButton',
    '',
    '60px',
    '60px',
    '',
    '←',
    // reset back to the original home screen
    (evt) => {flipScreens(); document.querySelector("#gameStatus").innerHTML = "Create an existing game using 4 letters OR join one that already exists!";},
  );

  const helpButton = new Button(
    'helpButton',
    '',
    '120px',
    '60px',
    '#FFFF00',
    `${capitalizeMultipleWords(game)} Rules`,
    (evt) => loadHelpBox(game)
  );

  // create title
  const title = document.createElement('h1');
  title.setAttribute('id', 'gameTitle');
  let textNode = document.createTextNode(capitalizeMultipleWords(game));
  title.appendChild(textNode);

  // append all items
  header.append(backButton.createButton(), title, helpButton.createButton());
  gameContainer.append(header);
}

// capitalize multiple words
function capitalizeMultipleWords(words) {
  let result = '';

  for (const letter of words) {
    if (letter == letter.toUpperCase()) {
      // find index of capital
      const indexOfSpace = words.indexOf(letter.toUpperCase());
      // splice at word break
      const wordToCapitalize = words.substring(0, indexOfSpace);
      // add capped word to result
      result += `${capitalizeFirstChar(wordToCapitalize)} `;
      // remove capped word from words string
      words = words.substring(indexOfSpace, words.length);
    }
  }

  // return result and last word remaining capitalized
  return result + capitalizeFirstChar(words);
}

// capitalize first character of words
function capitalizeFirstChar(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
