"use strict";
import React from 'react';

export default Cell;

function Cell(props){
	return (
		<button className="Cell" data-cell={props.cell}>
			{props.state || " "}
		</button>
		);
}
