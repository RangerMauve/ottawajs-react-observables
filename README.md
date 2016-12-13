# ottawajs-react-observables
Talk about using React and Observables for making a tic-tac-toe game

## Quick Recap on Observables

* Kinda like streams of events
* Composable
* Declarative

## Recap on React

* Declarative
* Composable
* Kinda like re-rendering every time data changes

## What we're making

Tic tac toe

(Totally original, I know)

### Setting up build tools

create-react-app

### Wow, no configuration at all!

```
"scripts": {
	"start": "react-scripts start",
	"build": "react-scripts build",
	"test": "react-scripts test --env=jsdom",
	"eject": "react-scripts eject"
}
```

```
npm run start
```

## What now?

## What will it look like?

```
+----------------+ --- Board
| +--+ +--+ +--+ |
| |  | |  | |\/| | --- Cells
| |  | |  | |/\| |
| +--+ +--+ +--+ |
| +--+ +--+ ---+ |
| |  | |\/| |  | |
| |  | |/\| |  | |
| +--+ +--+ +--+ |
| +--+ +--+ +--+ |
| |\/| |  | |  | |
| |/\| |  | |  | |
| +--+ +--+ +--+ |
+----------------+
      X:           --- Player

+----------------+
|     X wins!    | --- Win screen
+----------------+
```

### Create stateless components

```
src
 └── components
		 ├── Board.jsx
		 ├── Cell.jsx
		 ├── Game.jsx
		 └── Status.jsx
```

### Cell.jsx

```jsx
function Cell(props){
	return (
		<button className="Cell" data-cell={props.cell}>
			{props.state || ""}
		</button>
		);
}
```

### Throw some plain ol' CSS in there

```CSS
.Board {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 600px;
	height: 600px;
}
.Cell {
	width: 33%;
	height: 33%;
}
```

## What will your state look like

### Sketch out the entire state for the UI

```javascript
{
	cells: [
		"", "", "x",
		"", "x", "",
		"x", "", ""
	],
	player: "x",
	winner: "x"
}
```

### Computed state

```
player <- cell clicks
cells <- cell clicks + player
winner <- cells
```

## Data flow

```
State -> React -> DOM -> Events -> Actions -> State
```

### Represented using Observables

```javascript
var fromClick = require("@most/dom-event").click;
var most = require("most");

var appClicks = fromClick(rootElement);
var cellClicks = appClicks.filter(isCell).map(getCell);

var player = cellClicks.scan(changePlayer, "x");
var cells = cellClicks.combine(addPlayer, player).reduce(addCell);
var winner = cells.map(getWinner).filter(hasWinner);
var state = most.startWith(defaultState).combineArray(makeState, [
	player, cells, winner
]);
```

### Hooked up into React

```javascript
state.forEach(function(currentState){
	React.render(<Game state={currentState}/>, rootElement);
});
```

## Mind = Blown

## Demo / Full code

## References

[Presentation source code](https://github.com/RangerMauve/ottawajs-react-observables)

[MostJS API](https://github.com/cujojs/most/blob/master/docs/api.md)

[MostJS dom event lib](https://github.com/mostjs/dom-event)

[Use observables for individual components](https://github.com/reactive-react/react-most)

[Cycle JS](https://cycle.js.org)
