// load instructions for each game in popup box
function loadHelpBox(game) {
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
      'closePopUp()',
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
  function closePopUp() {
    // enable container
    document.body.querySelector('#gameContainer').classList.remove('isDisabled');
  
    // delete popup / backDim
    document.querySelector('#backDim').remove();
    document.querySelector('#popUpContainer').remove();
  }
  
  // open option pop up
  function optionPopUp(game) {
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
  
    const player1Name = document.createElement('div');
    player1Name.setAttribute('id', 'player1NameContainer');
  
    const player1NameInput = document.createElement('input');
    player1NameInput.setAttribute('id', 'player1NameInput');
    player1NameInput.setAttribute('class', 'nameInput');
    player1NameInput.setAttribute('type', 'text');
    player1NameInput.setAttribute('maxlength', '8');
  
    const player1NameLabel = document.createElement('label');
    player1NameInput.setAttribute('class', 'label');
    player1NameLabel.htmlFor = 'player1NameInput';
    player1NameLabel.innerHTML = 'Player 1 Name: ';
  
    player1Name.append(player1NameLabel, player1NameInput);
  
    // set up switch for player 2
    const player2SwitchContainer = document.createElement('label');
    player2SwitchContainer.setAttribute('id', 'player2SwitchContainer');
    player2SwitchContainer.setAttribute('class', 'switch');
  
    const player2Switch = document.createElement('input');
    player2Switch.setAttribute('id', 'switchContainer');
    player2Switch.setAttribute('type', 'checkbox');
    player2Switch.setAttribute('onchange', "toggleDiv('#player2NameContainer')");
    const player2SwitchSpan = document.createElement('span');
    player2SwitchSpan.setAttribute('class', 'slider round');
  
    const player2SwitchLabel = document.createElement('label');
    player2SwitchLabel.setAttribute('class', 'label');
    player2SwitchLabel.htmlFor = 'player2SwitchContainer';
    player2SwitchLabel.innerHTML = '2 Player?: ';
  
    player2SwitchContainer.append(player2Switch, player2SwitchSpan);
  
    const player2NameContainer = document.createElement('div');
    player2NameContainer.setAttribute('id', 'player2NameContainer');
    player2NameContainer.style.display = 'none';
  
    const player2NameInput = document.createElement('input');
    player2NameInput.setAttribute('id', 'player2NameInput');
    player2NameInput.setAttribute('class', 'nameInput');
    player2NameInput.setAttribute('type', 'text');
    player2NameInput.setAttribute('maxlength', '8');
  
    const player2NameLabel = document.createElement('label');
    player2NameInput.setAttribute('class', 'label');
    player2NameLabel.htmlFor = 'player2NameInput';
    player2NameLabel.innerHTML = 'Player 2 Name: ';
  
    player2NameContainer.append(player2NameLabel, player2NameInput);
  
    options.append(player1Name, player2SwitchLabel, player2SwitchContainer, player2NameContainer);
  
    const enterButton = new Button(
      'enterButton',
      '',
      '100px',
      '50px',
      'gray',
      'Start Game',
      `setSettings('${game}')`,
    );
  
    popUpContainer.append(options, enterButton.createButton());
    document.body.append(backDim, popUpContainer);
  }
  
  // push settings to main game
  function setSettings(game) {
    let aiWanted;
    if (document.querySelector('#player1NameInput').value == '') {
      document.querySelector('#player1Name').innerHTML = 'Player 1';
    } else {
      document.querySelector('#player1Name').innerHTML = document.querySelector('#player1NameInput').value;
    }
  
    if (document.querySelector('#player2NameContainer').style.display == 'none') {
      aiWanted = true;
      document.querySelector('#player2Name').innerHTML = 'AI';
    } else {
      aiWanted = false;
      if (document.querySelector('#player2NameInput').value == '') {
        document.querySelector('#player2Name').innerHTML = 'Player 2';
      } else {
        document.querySelector('#player2Name').innerHTML = document.querySelector('#player2NameInput').value;
      }
    }
  
    document.body.querySelector('#gameStatus').innerHTML = `${document.body.querySelector('#player1Name').innerHTML}, place your 1 piece.`;
  
    aiPlaying = aiWanted;
  
    document.body.querySelector('#gameContainer').classList.remove('isDisabled');
  
    document.querySelector('#backDim').remove();
    document.querySelector('#popUpContainer').remove();
  }
  
  // toggles div
  function toggleDiv(divID) {
    if (document.querySelector(divID).style.display == 'none') {
      document.querySelector(divID).style.display = '';
    } else {
      document.querySelector(divID).style.display = 'none';
    }
  }
  
  // delays function by delay in milliseconds
  function delay(delayInms) {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(2);
        }, delayInms);
    });
  }
  
  // reset div of games
  function resetGame(game) {
          // reset HTML
    gameContainer.innerHTML = '';
    gameContainer.className = '';
  
    gameContainer.classList = '';
    gameContainer.setAttribute('class', `${game}GameScene`);
  }
  
  // create header for games
  function createHeader(game) {
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
      'GameSelect()',
    );
  
    const helpButton = new Button(
      'helpButton',
      '',
      '120px',
      '60px',
      '#FFFF00',
      `${capitalizeMultipleWords(game)} Rules`,
      `loadHelpBox('${game}')`,
    );
  
    // create title
    const title = document.createElement('h1');
    title.setAttribute('id', 'gameTitle');
    textNode = document.createTextNode(capitalizeMultipleWords(game));
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