// load instructions for each game in popup box
function loadHelpBox(game) {
	// disable all content outside pop up
	document.body.querySelector("#gameContainer").classList.add("isDisabled");

	// set up darkening of elements
    const backDim = document.createElement("div");
	backDim.setAttribute("id", "backDim");

	// set up actual content of div
	const popUpContainer = document.createElement("div");
	popUpContainer.setAttribute("id", "popUpContainer");

	const closeButton = new Button(
		"closeButton", 
        "",
        "50px",
        "50px",
        "",
        "X",
        "closePopUp()"
	);

	closeButton.createButton();

	// as procedural based on game, don't add content to yet
	const title = document.createElement("h1");
	title.setAttribute("id", "popUpTitle");
	const gameInstructions = document.createElement("div");
	gameInstructions.setAttribute("id", "gameInstructions");
	gameInstructions.scroll(top);

	// display text of popup
	switch(game) {
		case "blackHole":
			title.textContent = "Black Hole";
			gameInstructions.innerHTML = 
			`<h5>In Black Hole, your goal is to have the lowest sum of pieces sucked into the titular "Black Hole".<h5>
			<h3>Game Flow</h3>
			<p>Each player, going back and forth, places pieces 1-10 in numerical order. Once all 10 pieces are placed by all players,
			the remaining tile becomes the "Black Hole", and sucks in all pieces touching it. The numbers written on the pieces of 
			each player that get sucked in are summed together, and the player with the lowest sum wins. In the event of a tie, the 
			player with the least pieces sucked in wins - if this does not break the tie, the lowest piece with the most value 
			sucked in wins.</p>
			<h3>Controls</h3>	
			<p>The bottom status bar will say whose turn it is. When it's your turn, click on the tile on the pyramid (labelled with a letter)
			that you would like to place your next piece. You can always know your next piece to place by looking at your tiles on your side
			of the screen, under your name - the highest tile up / the lowest-value tile is what you're placing.</p>`
			break;
		case "blindPoker":
			title.textContent = "Blind Poker";
			gameInstructions.innerHTML = 
			`<h5>In Blind Poker, your goal is to get all of the chips in the game by either winning hands of poker or having your opponent fold
			before the round finishes. <h5>
			<h3>Game Flow</h3>
			<p>At the start of the game, each player will be given an amount of chips (by default, 30). The game is played with a deck of 40 cards, 4 each of
			the numbers 1 through 10. Each card is only used once per deck, and once all of the cards are used in a deck, a new deck is used.
			<br><br>
			The game is broken up into hands. At the start of every hand, both players will receive a card. You will then both peek at your opponent's card,
			but NOT view your own. Each player will then pay one chip as an ante and betting will begin with the player who won the last round - if it is
			the first hand, then the left player will go first.
			<br><br>
			While betting, you have three options: calling, raising, or folding. Calling will raise your bet to the same as your opponent's, ending the betting.
			This is not available for the person starting the round. Raising will allow you to increase the current amount bet, allowing for your opponent to 
			respond to your bet. Folding will end the bet early, forfeiting all chips in the pot to your opponent including the ante and ending the round. There
			is a note about this: if you fold with a 10, you additionally pay a penalty of 10 chips to your opponent.
			<br><br>
			Once someone calls, betting will end. Both players' cards will then be revealed and the player with the higher card wins, taking all chips in the pot.
			If the cards are the same, all chips bet during the round will be returned. 
			<br><br>
			If, after any hand, a player has no more chips, the game ends in their loss and their opponent's win. </p>
			<h3>Controls</h3>	
			<p>At the start of each round, each player will get a prompt individually to look at their opponent's card. The player who is betting will have three 
			buttons to use - Call, Raise, and Fold. If Raise is pressed, enter the extra chips you are adding- for example, if you want to raise from 7 to 9 chips,
			you'll input 2 into the box. Once a player has called or folded, the end result of the round will be announced - when you're ready to proceed, hit the 
			"Next Round" button.</p>`
			break;
		case "gyulHap":
			title.textContent = "Gyul! Hap!";
			gameInstructions.innerHTML = 
			`<h5>GYUL HAP DESCRIPTION LATER.<h5>
			<h3>Game Flow</h3>
			<br>
			<br>
			<h3>Controls</h3>	`
			break;
		case "credits":
			title.textContent = "Credits";
			gameInstructions.innerHTML = 
			`<h3>Game Created by Walter Joris</h3>
			<h3>Website Created by Jack Walsh</h3>
			<a href="https://docs.google.com/document/d/1b6NL-ogLaOMzX2hbALHpSkxvjquQrNXEOjGc5KQCoWQ/edit?usp=sharing" target="_blank">Documentation</a> `
			break;
		default:
			title.textContent = "error";
			gameInstructions.innerHTML = 
			`If you're seeing this, God has died. Only explanation.`
			break;
	}

	// append elements
	popUpContainer.append(closeButton.div, title, gameInstructions);
	document.body.append(backDim, popUpContainer);
}

// close popup
function closePopUp() {
	// enable container
	document.body.querySelector("#gameContainer").classList.remove("isDisabled");

	// delete popup / backDim
	document.querySelector("#backDim").remove();
	document.querySelector("#popUpContainer").remove();
}

// open option pop up
function optionPopUp(game) {
	// disable all content outside pop up
	document.body.querySelector("#gameContainer").classList.add("isDisabled");

	// set up darkening of elements
	const backDim = document.createElement("div");
	backDim.setAttribute("id", "backDim");

	// set up actual content of div
	const popUpContainer = document.createElement("div");
	popUpContainer.setAttribute("id", "popUpContainer");

	const options = document.createElement("div");
	options.setAttribute("id", "options");

	// set up options
	switch(game) {
		case "blackHole":
			// set up name containers / input label
			let player1Name = document.createElement("div");
			player1Name.setAttribute("id", "player1NameContainer");

			let player1NameInput = document.createElement("input");
			player1NameInput.setAttribute("id", "player1NameInput");
			player1NameInput.setAttribute("class", "nameInput");
			player1NameInput.setAttribute("type", "text");
			player1NameInput.setAttribute("maxlength", "8");

			let player1NameLabel = document.createElement("label");	
			player1NameInput.setAttribute("class", "label");
			player1NameLabel.htmlFor = "player1NameInput";
			player1NameLabel.innerHTML = "Player 1 Name: ";

			player1Name.append(player1NameLabel, player1NameInput);

			// set up switch for player 2
			let player2SwitchContainer = document.createElement("label");
			player2SwitchContainer.setAttribute("id", "player2SwitchContainer");
			player2SwitchContainer.setAttribute("class", "switch");

			let player2Switch = document.createElement("input");
			player2Switch.setAttribute("id", "switchContainer");
			player2Switch.setAttribute("type", "checkbox");
			player2Switch.setAttribute("onchange", "toggleDiv('#player2NameContainer')")
			let player2SwitchSpan = document.createElement("span");
			player2SwitchSpan.setAttribute("class", "slider round");

			let player2SwitchLabel = document.createElement("label");	
			player2SwitchLabel.setAttribute("class", "label");
			player2SwitchLabel.htmlFor = "player2SwitchContainer";
			player2SwitchLabel.innerHTML = "2 Player?: ";

			player2SwitchContainer.append(player2Switch, player2SwitchSpan);

			let player2NameContainer = document.createElement("div");
			player2NameContainer.setAttribute("id", "player2NameContainer");
			player2NameContainer.style.display = "none";

			let player2NameInput = document.createElement("input");
			player2NameInput.setAttribute("id", "player2NameInput");
			player2NameInput.setAttribute("class", "nameInput");
			player2NameInput.setAttribute("type", "text");
			player2NameInput.setAttribute("maxlength", "8");

			let player2NameLabel = document.createElement("label");
			player2NameInput.setAttribute("class", "label");
			player2NameLabel.htmlFor = "player2NameInput";
			player2NameLabel.innerHTML = "Player 2 Name: ";

			player2NameContainer.append(player2NameLabel, player2NameInput);

			options.append(player1Name, player2SwitchLabel, player2SwitchContainer, player2NameContainer);


			break;
		case "blindPoker":
			break;
		case "gyulHap":
			break;
		default:
			break;
	}

	const enterButton = new Button(
		"enterButton", 
		"",
		"100px",
		"50px",
		"gray",
		"Start Game",
		"setSettings('" + game + "')"
	);

	popUpContainer.append(options, enterButton.createButton());
	document.body.append(backDim, popUpContainer);
}

// push settings to main game
function setSettings(game) {
	let aiWanted;

	switch(game) {
		case "blackHole":
			// set playe
			if (document.querySelector("#player1NameInput").value == "") {
				document.querySelector("#player1Name").innerHTML = "Player 1";
			} else {
				document.querySelector("#player1Name").innerHTML = document.querySelector("#player1NameInput").value;
			}
			
			if (document.querySelector("#player2NameContainer").style.display == "none") {
				aiWanted = true;
				document.querySelector("#player2Name").innerHTML = "AI";
			} else {
				aiWanted = false;
				if (document.querySelector("#player2NameInput").value == "") {
					document.querySelector("#player2Name").innerHTML = "Player 2";
				} else {
					document.querySelector("#player2Name").innerHTML = document.querySelector("#player2NameInput").value;
				}			
			}

			document.body.querySelector("#gameStatus").innerHTML = document.body.querySelector("#player1Name").innerHTML + ", place your 1 piece.";
			
			break;
		case "blindPoker":
			break;
		case "gyulHap":
			break;
	}

	aiPlaying = aiWanted;

	document.body.querySelector("#gameContainer").classList.remove("isDisabled");

	document.querySelector("#backDim").remove();
	document.querySelector("#popUpContainer").remove();
}

// toggles div
function toggleDiv(divID) {
	if (document.querySelector(divID).style.display == "none") {
		document.querySelector(divID).style.display = "";
	} else {
		document.querySelector(divID).style.display = "none";
	}
}

// delays function by delay in milliseconds
function delay(delayInms) {
	return new Promise(resolve => {
	  setTimeout(() => {
		resolve(2);
	  }, delayInms);
	});
  }

// reset div of games
function resetGame(game) {
	    // reset HTML
		gameContainer.innerHTML = "";
		gameContainer.className = "";

		gameContainer.classList = "";
		gameContainer.setAttribute("class", game + "GameScene");
}

// create header for games
function createHeader(game) {
	// create container
	let header = document.createElement("div");
	header.setAttribute("id", "uiHeader");

	// create back arrow
	let backButton = new Button(
		"backButton", 
        "",
        "60px",
        "60px",
        "",
        "←",
        "GameSelect()"
	);

	// create title
	let title = document.createElement("h1");
    title.setAttribute("id", "gameTitle");
    textNode = document.createTextNode(game == "gyulHap" ? "Gyul! Hap!" : capitalizeMultipleWords(game));
    title.appendChild(textNode);

	// create help buttons
	// Gyul! Hap!'s exclamation marks are annoying - edge case
	let helpButton = new Button(
		"helpButton", 
        "",
        "120px",
        "60px",
        "#FFFF00",
        (game == "gyulHap" ? "Gyul! Hap!" : capitalizeMultipleWords(game)) + " Rules",
        "loadHelpBox('" + game + "')"
	);

	// append all items
	header.append(backButton.createButton(), title, helpButton.createButton())
	gameContainer.append(header);
}

// capitalize multiple words
function capitalizeMultipleWords(words) {
    let result = "";

    for(let letter of words) {
		if (letter == letter.toUpperCase()) {
			// find index of capital
			let indexOfSpace = words.indexOf(letter.toUpperCase());
			// splice at word break
			let wordToCapitalize =  words.substring(0, indexOfSpace);
			// add capped word to result
			result += capitalizeFirstChar(wordToCapitalize) + " ";
			// remove capped word from words string
			words = words.substring(indexOfSpace, words.length);
		}
    }

    //return result and last word remaining capitalized
    return result + capitalizeFirstChar(words);
}

// capitalize first character of words
function capitalizeFirstChar(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}