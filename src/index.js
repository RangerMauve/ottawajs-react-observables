import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Game from "./components/Game.js";
import State from "./state.js";

var rootElement = document.getElementById('root')

var state = State(rootElement);

state.forEach(function(currentState){
	ReactDOM.render(
	  <Game state={currentState}/>,
		rootElement
	);
});
