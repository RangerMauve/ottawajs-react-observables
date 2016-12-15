"use strict";
import React from 'react';

import Cell from "./Cell.js";

export default Board;

function Board(props){
	return (
		<section className="Board">
			{props.cells.map(renderCell)}
		</section>
	);
}

function renderCell(state, cellIndex) {
	return (
		<Cell state={state} cell={cellIndex} key={cellIndex}/>
	);
}
