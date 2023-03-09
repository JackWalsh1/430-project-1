import {blackHoleLoad} from "../src/gameLogic/gameLogic.js";

const handleResponse = async (response, parseResponse) => {
	if (response.status === 200 || response.status === 201) {
		let responseJSON = await response.json();
		console.log(responseJSON);
		return blackHoleLoad(responseJSON.gameID);
	}
	// get json back
	let h1;
	let p;

	// get content and then create h1 / p if needed - otherwise, just get them
	const content = document.querySelector('#result');
	h1 = document.querySelector('#h1');
	p = document.querySelector('#p');

	const statusCodes = {
	200: `<b>Success</b>`,
	201: `<b>Created</b>`,
	204: `<b>Updated (No Content)</b>`,
	400: `<b>Bad Request</b>`,
	404: `<b>Not Found</b>`,
	409: `<b>Data Conflict</b>`
	};

	h1.innerHTML = statusCodes[response.status];
	if (parseResponse && response.status !== 204) {
	const parsedResponse = await response.json();

	// if the message is good (aka is the users obj)
	// then display that
	// otherwise, display the error
	p.innerHTML = response.status === 200 
	? JSON.stringify(parsedResponse.message)
	: `Message: ${JSON.stringify(parsedResponse.message)}`;
	} else {
	p.innerHTML = "";
	}

	//Add the elements to the screen.
	content.appendChild(h1);
	content.appendChild(p);    
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

	const h1 = document.querySelector("#h1");

	h1.innerHTML = "script tag worked!";
};
window.onload = init;