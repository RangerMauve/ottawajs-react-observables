"use strict";
import React from 'react';

import Board from "./Board.js";
import Status from "./Status.js";
import Win from "./Win.js";

export default Game;

function Game(props){
	var state = props.state;

	if(state.winner)
		return (
			<section className="Game">
				<Win winner={state.winner}/>
			</section>
		);

	return (
		<section className="Game">
			<Board cells={state.cells}/>
			<Status player={state.player}/>
		</section>
	);
}
