"use strict";
import React from 'react';

export default Win;

function Win(props){
	return (
		<div className="Win">
			{props.winner} wins!
		</div>
	);
}
