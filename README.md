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

### What will it look like?

```
+------------+ --- Board
|+--++--+---+|
||  ||  ||  || --- Cells
||  ||  ||  ||
|+--++--++--+|
|+--++--+---+|
||  ||  ||  ||
||  ||  ||  ||
|+--++--++--+|
|+--++--+---+|
||  ||  ||  ||
||  ||  ||  ||
|+--++--++--+|
+-------------
      X:       --- Status
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
