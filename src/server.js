window.onload = (e) => {GameSelect()};

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
    '/sendMove': gameHandler.addUser,
    notFound: gameHandler.notFound,
  },
};

const onRequest = (request, response) => {
    const parsedUrl = url.parse(request.url);
  
    // if request method does not exist
    if (!routes[request.method]) {
      // notFound head
      return routes.HEAD.notFound(request, response);
    }
  
    // if path exists
    if (routes[request.method][parsedUrl.pathname]) {
      // special parse body for post
      if (request.method === 'POST') {
        parseBody(request, response, gameHandler.addUser);
        return routes[request.method][parsedUrl.pathname];
      }
  
      // get or head -> go there
      return routes[request.method][parsedUrl.pathname](request, response);
    }
  
    // otherwise return notFound for that
    return routes[request.method].notFound(request, response);
  };  


// start HTTP server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
// game code


// global containers needed
let textNode;
let gameContainer;

// global variables for games
let currentPlayer;
let round;
let aiPlaying;
let remainingTiles = [];
let player1Tiles = [];
let player2Tiles = [];

let blackHoleBoardArray;

// creates button
// functionName = function that button calls when pressed
class Button {
    constructor(idName, className, width, height, backgroundColor, text, functionName) {
        this.idName = idName;
        this.className = className;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.text = text;
        this.functionName = functionName;
        this.div = "";
    }

    // creates button
    createButton() {
        // if not already made
        if (!this.div) {

            // set up container
            let button = document.createElement("div");

            // input elements
            if (this.idName) {
                button.setAttribute("id", this.idName);
            }    
            if (this.className) {
                button.setAttribute("class", this.className);
            }
            if (this.functionName) {
                button.setAttribute("onclick", this.functionName);
            }
        
            // set dimensions / color
            button.style.width = this.width;
            button.style.height = this.height;
            button.style.backgroundColor = this.backgroundColor;
            
            // create text
            let textnode = document.createTextNode(this.text);
            button.appendChild(textnode);

            // log button
            this.div = button;
        }

        // return button - also works as getter
        return this.div;
    }
}

// load game selection screen
function GameSelect() {

    //initialize container for all elements
    gameContainer = document.querySelector("#gameContainer");
    resetGame();

    // create header
    const header = document.createElement("h1");
    header.setAttribute("id", "mainTitle");
    textNode = document.createTextNode("Black Hole");
    header.appendChild(textNode);

    // create button container for css use

    const gameSelectButtonContainer = document.createElement("div");
    gameSelectButtonContainer.setAttribute("id", "gameSelectButtonContainer");
    
    // create buttons
    const blackHoleButton = new Button(
        "blackHoleButton", 
        "gameSelectButton",
        "400px",
        "100px",
        "#FFFF00",
        "Black Hole",
        "blackHoleLoad()"
    );

    blackHoleButton.createButton();

    const creditsButton = new Button(
        "gyulHapButton", 
        "gameSelectButton",
        "400px",
        "100px",
        "#FFFF00",
        "Credits",
        "loadHelpBox('credits')"
    );
   
    creditsButton.createButton();

    gameSelectButtonContainer.append(blackHoleButton.div, /*blindPokerButton, gyulHapButton,*/ creditsButton.div);

    // append all elements
    gameContainer.append(header, gameSelectButtonContainer);   
}

// load general structure for black hole
function blackHoleLoad() {

    // reset game
    resetGame("blackHole");
    createHeader("blackHole");

    // set initial game variables
    round = 1;
    currentPlayer = 1;
    remainingTiles = [];
    player1Tiles = [];
    player2Tiles = [];

    // create player 1 pieces / container
    const player1Pieces = document.createElement("div");
    player1Pieces.setAttribute("id", "player1Pieces");
    player1Pieces.setAttribute("class", "playerPieces");

    const player1Name = document.createElement("p");
    player1Name.setAttribute("id", "player1Name");
    player1Name.setAttribute("class", "playerName");
    player1Name.innerHTML = "Player";
    player1Pieces.appendChild(player1Name);

    for (let i = 1; i < 11; i++) {
        // create space
        let playerPiece = new Button(
            "player1Piece" + i, 
            "playerPiece player1Piece",
            "65px",
            "65px",
            "#FF0000",
            i,
            ""
        );

        player1Pieces.appendChild(playerPiece.createButton());
    }

    // create player 2 pieces / container
    const player2Pieces = document.createElement("div");
    player2Pieces.setAttribute("id", "player2Pieces");
    player2Pieces.setAttribute("class", "playerPieces");

    const player2Name = document.createElement("p");
    player2Name.setAttribute("id", "player2Name");
    player2Name.setAttribute("class", "playerName");
    player2Name.innerHTML = "Player";
    player2Pieces.appendChild(player2Name);

    for (let i = 1; i < 11; i++) {
        // create space
        let playerPiece = new Button(
            "player2Piece" + i, 
            "playerPiece player2Piece",
            "65px",
            "65px",
            "#0000FF",
            i,
            ""
        );

        player2Pieces.appendChild(playerPiece.createButton());
    }

    // append containers
    gameContainer.append(player1Pieces, player2Pieces);

    // create game board div
    const blackHoleBoard = document.createElement("div");
    blackHoleBoard.setAttribute("id", "blackHoleBoard");

    // create rows of game board
    let blackHoleRow1 = document.createElement("div");
    blackHoleRow1.setAttribute("class", "blackHoleRow");
    let blackHoleRow2 = document.createElement("div");
    blackHoleRow2.setAttribute("class", "blackHoleRow");
    let blackHoleRow3 = document.createElement("div");
    blackHoleRow3.setAttribute("class", "blackHoleRow");
    let blackHoleRow4 = document.createElement("div");
    blackHoleRow4.setAttribute("class", "blackHoleRow");
    let blackHoleRow5 = document.createElement("div");
    blackHoleRow5.setAttribute("class", "blackHoleRow");
    let blackHoleRow6 = document.createElement("div");
    blackHoleRow6.setAttribute("class", "blackHoleRow");

    // reset black hole storage array
    blackHoleBoardArray = [
        [],
        [],
        [],
        [],
        [],
        []
    ];

    // for each space
    for (let i = 0; i < 21; i++) {
        // create space
        let blackHoleSpace = new Button(
            "blackHoleSpace" + String.fromCharCode(65 + i), 
            "blackHoleSpace",
            "88px",
            "88px",
            "gray",
            String.fromCharCode(65 + i),
            "placePiece('" + String.fromCharCode(65 + i) + "')"
        );

        blackHoleSpace.createButton();

        // sort into pyramid structure
        if(blackHoleBoardArray[0].length < 6) {
            blackHoleBoardArray[0].push(blackHoleSpace.div);
            blackHoleRow1.appendChild(blackHoleSpace.div);
        } else if (blackHoleBoardArray[1].length < 5) {
            blackHoleBoardArray[1].push(blackHoleSpace.div);
            blackHoleRow2.appendChild(blackHoleSpace.div);
        } else if (blackHoleBoardArray[2].length < 4) {
            blackHoleBoardArray[2].push(blackHoleSpace.div);
            blackHoleRow3.appendChild(blackHoleSpace.div);
        } else if (blackHoleBoardArray[3].length < 3) {
            blackHoleBoardArray[3].push(blackHoleSpace.div);
            blackHoleRow4.appendChild(blackHoleSpace.div);
        } else if (blackHoleBoardArray[4].length < 2) {
            blackHoleBoardArray[4].push(blackHoleSpace.div);
            blackHoleRow5.appendChild(blackHoleSpace.div);
        } else {
            blackHoleBoardArray[5].push(blackHoleSpace.div);
            blackHoleRow6.appendChild(blackHoleSpace.div);
        }

        // push to track remaining tiles
        remainingTiles.push(blackHoleSpace);
    }

    // append all elements to blackholeBoard + add it to container
    blackHoleBoard.append(blackHoleRow1, blackHoleRow2, blackHoleRow3, blackHoleRow4, blackHoleRow5, blackHoleRow6);
    gameContainer.append(blackHoleBoard);

    // create game status / append it
    let gameStatus = document.createElement("div");
    gameStatus.setAttribute("id", "gameStatus");
    textNode = document.createTextNode("Starting up...");
    gameStatus.append(textNode);
    gameContainer.append(gameStatus);

    optionPopUp("blackHole");
}

// decide what piece was selected, add them to player list, and then swap player / round
function placePiece(letter) {

    // find piece that was clicked
    let spaceToAdjust = document.body.querySelector("#blackHoleSpace" + letter);

    // set player color to show who placed it / log it for future scoring 
    if (currentPlayer == 1) {
        spaceToAdjust.style.backgroundColor = "#FF0000";
        player1Tiles.push(spaceToAdjust);
        document.body.querySelector("#player1Piece" + round).remove();
    } else {
        spaceToAdjust.style.backgroundColor = "#0000FF";
        player2Tiles.push(spaceToAdjust);
        document.body.querySelector("#player2Piece" + round).remove();
    }
    // disable future interactions
    spaceToAdjust.classList.add("isDisabled");

    // remove tile from remaining tiles
    remainingTiles.splice(remainingTiles.findIndex(tile => tile.idName == "blackHoleSpace" + letter), 1);

    // set up needed initialization variables
    spaceToAdjust.innerHTML = round;

    // flip player control / iterate to next round if needed
    // round can be used to track what piece need to be used
    if (currentPlayer == 1) {
        currentPlayer++;
        // jump to ai "move" if needed
        if (aiPlaying) {
            document.body.querySelector("#gameStatus").innerHTML = "AI is thinking...";
            aiBlackHoleMove();
        } else {
            document.body.querySelector("#gameStatus").innerHTML = document.body.querySelector("#player2Name").innerHTML;
            document.body.querySelector("#gameStatus").innerHTML += ", place your " + round + " piece.";
        }   
    } else if (round == 10) {
        // if player 2 + round 10, game over.
        calculateWinner();
    } else {
        // start next round and player 1's turn
        currentPlayer = 1;
        round++;
        document.body.querySelector("#gameStatus").innerHTML = document.body.querySelector("#player1Name").innerHTML;
        document.body.querySelector("#gameStatus").innerHTML += ", place your " + round + " piece.";
    } 
}

// grabs a random value from the remaining value, delays to simulate thinking,
// and then chooses that piece 
async function aiBlackHoleMove() {
    document.body.querySelector("#blackHoleBoard").classList.add("isDisabled");
    let randomTile = Math.round(Math.random() * remainingTiles.length);
    if (randomTile == remainingTiles.length) { randomTile = 0 }
    randomTile = remainingTiles[randomTile];
    randomTile = randomTile.idName.charAt(randomTile.idName.length - 1);
    let delayres = await delay(1000);
    document.body.querySelector("#blackHoleBoard").classList.remove("isDisabled");
    placePiece(randomTile.toUpperCase());
}

// calculate winner of Black Hole
function calculateWinner() {
    let blackHole = remainingTiles[0].div;
    let blackHoleRow, blackHolePosition;
    let player1ScoreTiles = [];
    let player2ScoreTiles = [];
    let player1Score = 0;
    let player2Score = 0;
    let result;

    // find position of black hole in pyramid structure
    for(let i = 0; i < blackHoleBoardArray.length; i++) {
        for (let j = 0; j < blackHoleBoardArray[i].length; j++) {
            if (blackHoleBoardArray[i][j] == blackHole) {
                blackHoleRow = i;
                blackHolePosition = j;
                blackHoleBoardArray[i][j].classList.add("isDisabled");
            }
        }
    }

    // create two arrays of sucked in numbers - one for each player
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            // ignores non-adjacent squares
            if (i != j) {
                // excludes non-real indexes - a lot of weird math behind this one...
                if(
                    blackHoleRow + i + blackHolePosition + j < 6
                    && blackHoleRow + i >= 0 
                    && blackHolePosition + j >= 0) {
                    //check which player's piece was sucked in
                    let spaceSuckedIn = blackHoleBoardArray[blackHoleRow + i][blackHolePosition + j];
                    //by cycling through all ten possible tiles
                    for (let i = 0; i < 10; i++) { 
                        // push value of space + add it to sum
                        if (spaceSuckedIn === player1Tiles[i]) {
                            player1ScoreTiles.push(spaceSuckedIn.innerHTML);
                            player1Score += parseInt(spaceSuckedIn.innerHTML);
                        } else if (spaceSuckedIn === player2Tiles[i]) {
                            player2ScoreTiles.push(spaceSuckedIn.innerHTML);
                            player2Score += parseInt(spaceSuckedIn.innerHTML);
                        }
                    }
                }
            }
        }
    }

    // check win conditions
    // if the score is higher
    if (player1Score == player2Score) {
        // tiebreaker 1: if less tiles sucked in
        if (player1ScoreTiles.length == player2ScoreTiles.length) {
            // tiebreaker 2: sort tiles and check which piece is the lowest
            // if they're exactly equal - tie
            player1ScoreTiles.sort((a, b) => b - a);
            player2ScoreTiles.sort((a, b) => b - a);
            for (let i = 0; i < player1ScoreTiles.length; i++) {
                if (player1ScoreTiles[i] < player2ScoreTiles[i]) {
                    result = document.body.querySelector("#player1Name").innerHTML + " has won by having a " + player1ScoreTiles[i] + " vs a " + player2ScoreTiles[i] + " sucked in!";
                } else if (player1ScoreTiles[i] > player2ScoreTiles[i]) {
                    result = document.body.querySelector("#player2Name").innerHTML + " has won by having a " + player2ScoreTiles[i] + " vs a " + player1ScoreTiles[i] + " sucked in!";
                }
                // everything else is just a result being stored and printed
            }
            if (!result) {
                result = "This game is a perfect tie!"
            }
        } else if (player1ScoreTiles.length < player2ScoreTiles.length) {
            result = document.body.querySelector("#player1Name").innerHTML + " has won by having less pieces sucked in!";
        } else {
            result = document.body.querySelector("#player2Name").innerHTML + " has won by having less pieces sucked in!";
        }
    } else if (player1Score < player2Score) {
        result = document.body.querySelector("#player1Name").innerHTML + " has won by a score of " + player1Score + " to " + player2Score + "!";
    } else {
        result = document.body.querySelector("#player2Name").innerHTML + " has won by a score of " + player2Score + " to " + player1Score + "!";
    }
    document.body.querySelector("#gameStatus").innerHTML = result;
}

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

	let helpButton = new Button(
		"helpButton", 
        "",
        "120px",
        "60px",
        "#FFFF00",
        capitalizeMultipleWords(game) + " Rules",
        "loadHelpBox('" + game + "')"
	);

	// create title
	let title = document.createElement("h1");
    title.setAttribute("id", "gameTitle");
    textNode = document.createTextNode(capitalizeMultipleWords(game));
    title.appendChild(textNode);

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
