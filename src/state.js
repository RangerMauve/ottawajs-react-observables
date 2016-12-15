"use strict";
var most = require("most");

export default makeState;

var defaultState = {
	cells: [
		"", "", "",
		"", "", "",
		"", "", ""
	],
	player: "x",
	winner: ""
};

var defaultCells = defaultState.cells.slice();

function makeState(rootElement) {
	var appClicks = most.fromEvent("click", rootElement);
	var cellClicks = appClicks.filter(isCell).map(getCell);

	var playerClicks = cellClicks.scan(makePlayerClick, null);

	var cells = playerClicks.scan(addCell, defaultCells);
	var winner = cells.map(getWinner).filter(isTruthy);
	var player = playerClicks.map(getPlayer);

	var stateDependencies = [player, cells, winner];

	var initialState = most.startWith(defaultState);
	var combinedState = most.combineArray(makeState, stateDependencies);
	var state = initialState.continueWith(function(){
		return combinedState;
	});

	return state;
}

function isCell(event) {
	var target = event.target;
	return target.classList.contains("Cell");
}

function getCell(event) {
	return +event.target.dataset.cell;
}

function makePlayerClick(previous, currentCell) {
	return {
		player: (previous && previous.player === "y") ? "x" : "y",
		cell: currentCell
	};
}

function addCell(cells, playerClick) {
	var newCells = cells.slice();
	cells[playerClick.cell] = playerClick.player;
	return newCells;
}

function isTruthy(value) {
	return !!value;
}

function getWinner(cells) {
	return sameRows(cells) || sameColumns(cells) || sameDiagonals(cells);
}

function sameRows(cells) {
	return (
		areSame([cells[0], cells[1], cells[2]]) ||
		areSame([cells[3], cells[4], cells[5]]) ||
		areSame([cells[6], cells[7], cells[8]])
	);
}

function sameColumns(cells) {
	return (
		areSame([cells[0], cells[3], cells[6]]) ||
		areSame([cells[1], cells[4], cells[7]]) ||
		areSame([cells[2], cells[5], cells[8]])
	);
}

function sameDiagonals(cells) {
	return (
		areSame([cells[0], cells[4], cells[8]]) ||
		areSame([cells[2], cells[4], cells[6]])
	);
}

function areSame(cells) {
	return (cells[0] === cells[1] === cells[3]) ? cells[0] : "";
}

function getPlayer(playerClick) {
	return playerClick.player === "x" ? "y" : "x";
}
