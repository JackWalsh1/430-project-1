import blackHoleLoad from "../src/gameLogic/gameLogic.js";

const handleResponse = async (response, parseResponse) => {
	// get game if valid
	if (response.status === 200 || response.status === 201) {
		let responseJSON = await response.json();
		let activePlayer = document.querySelector("#playerSelect").value;
		console.log(responseJSON);
		return blackHoleLoad(responseJSON.gameID, activePlayer);
	}

	// get content and then create h1 / p if needed - otherwise, just get them
	const gameStatus = document.querySelector("#gameStatus");

	const statusCodes = {
	400: `<b>Invalid game code. It must be exactly 4 letters.</b>`,
	404: `Game does not exist. Try creating it!`,
	409: `Game already exists. Try joining it!`
	};

	gameStatus.innerHTML = statusCodes[response.status]; 
};

const joinGame = async (joinGameForm) => {
	// build response for get OR head using url / method consts
	let gameID = joinGameForm.querySelector("#gameIDField").value;
	//let url = `/getGame?gameID=${gameID}`;
	console.log(gameID);
	let response = await fetch ("/getGame?gameID=" + gameID, {
		method: "GET",
		headers: {
		'Accept': 'application/json'
		},
	});

	// handle the response
	handleResponse(response, true);
};

const createGame = async (createGameForm) => {
	let response = await fetch("/createGame", {
		method: "POST",
		headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Accept': 'application/json',
		},
		body: `gameID=${createGameForm.querySelector('#gameIDField').value}`,
	});

	// always print a response for post
	handleResponse(response, true);
};

const init = () => {
	const joinGameForm = document.querySelector('#joinGameForm');
	const createGameForm = document.querySelector('#createGameForm');

	// create functions to override initial form functions
	const joinGameFormAction = (e) => {
	e.preventDefault();
	joinGame(joinGameForm);
	return false;
	};

	const createGameFormAction = (e) => {
	e.preventDefault();
	createGame(createGameForm);
	return false;
	};

	// attach evt listeners to forms
	joinGameForm.addEventListener('submit', joinGameFormAction);
	createGameForm.addEventListener('submit', createGameFormAction);

	document.querySelector("#gameContainer").style.display = "none";

	const gameStatus = document.querySelector("#gameStatus");

	gameStatus.innerHTML = "Create an existing game using 4 letters OR join one that already exists!";
};
window.onload = init;