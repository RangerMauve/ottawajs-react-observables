<!-- .slide: data-background="http://i.giphy.com/3oz8xXfDRmzR0vQ7II.gif" -->

# Making an app with Observables and React

### Georgiy Shibaev

Note: Today we're going to be going over planning a simple app using Observables and react

---

## Quick Recap on Observables

* Composable
* Declarative
* Kinda like streams of events

Note: Observables are a primitive that can be useful for declaring pipelines for processsing events. Observables make it easy to compose streams of events and let you represent complex asynchronous flows of data declaratively

----

## Recap on React

* Declarative
* Composable
* Kinda like re-rendering every time data changes

Note: React has transformed how people have approached to creating complicated UIs by declaring your UI as a function of your application state.

---

<!-- .slide: data-background="http://i.giphy.com/ZOkZMEY7SgozC.gif" -->

## What we're making

Note: Tic Tac Toe is a simple game with clear user inputs and a easy way to represent state

---

### Setting up build tools

> create-react-app

Note: JavaScript build tools have been pretty crazy these days and a lot of beginners end up being intimidated by all of the configuration and learning that's required. Create-react-app makes it easy to get your app started with a single command to set everything up, and commands for building your app and scaffolding for testing components.

----

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

Note: After setting up a project with create-react-appk, it will add scripts to your package.json to perform common tasks

---

<!-- .slide: data-background="http://i.giphy.com/3o6Zt4bSnXhBBgKjNC.gif" -->

## What now?

Note: What do we do after we have our project set up?

---

## What will it look like?

```
+----------------+ --- Board
| +--+ +--+ +--+ |
| |  | |  | |\/| | --- Cells
| |  | |  | |/\| |
| +--+ +--+ +--+ |
| +--+ +--+ ---+ |   +----------------+
| |  | |\/| |  | |   |     X wins!    | --- Win screen
| |  | |/\| |  | |   +----------------+
| +--+ +--+ +--+ |
| +--+ +--+ +--+ |
| |\/| |  | |  | |
| |/\| |  | |  | |
| +--+ +--+ +--+ |
+----------------+
      X:           --- Player
```

Note: The first place to start is to define what you want things to look like. Think about which parts of the UI can be split up into components.

----

### Create stateless components

```
src
 └── components
		 ├── Board.jsx
		 ├── Cell.jsx
		 ├── Game.jsx
		 └── Status.jsx
```

Note: Next you should create React components for the various parts of your UI.

----

### Cell.jsx

```javascript
function Cell(props){
	return (
		<button className="Cell" data-cell={props.cell}>
			{props.state || ""}
		</button>
		);
}
```

Note: Here's an example of what a component might look like

----

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

Note: Style your UI and you're good to go onto the next part

---
<!-- .slide: data-background="http://i.giphy.com/3o7TKDMPKsakcn9NU4.gif" -->

## What will your state look like

Note: After you know what your UI will look like, you should think of what your application state will be for powering that UI.

----

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

Note: As you can see here, there's very few pieces to our UI state: The current state of each cell, the current player, and whether somebody has won or not

----

### Computed state

```
player <- cell clicks
cells <- cell clicks + player
winner <- cells
```

Note: Further, we can show how various parts of our state are really just a function of other parts of the state or user inputs

---

## Data flow

```ruby
State -> React -> DOM -> Events -> Actions -> State
```

Note: Now, a lot of people have heard of Flux, Redux, Unidirectional data flow, and there have been a lot of diagrams demonstrating ways to arrange all your data. In our case, we're going to go with the most simple representation possible. Our initial state gets shoved into React, which will render out the DOM and diff changes for us, the DOM will then emit events from user interactions, This will result in our code reacting to these events and modifying our state, which will loop over to the start again

----

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

Note: Here we can see some code for how we can set up Observable chains to calculate our state from user actions.

----

### Hooked up into React

```javascript
state.forEach(function(currentState){
	React.render(<Game state={currentState}/>, rootElement);
});
```

Note: Now we can subscribe to our Observable of state changes and update the UI every time it changes

---

<!-- .slide: data-background="http://i.giphy.com/3oz8xDp5mAEOAZXEPe.gif" -->

## Mind = Blown

Note: And that's it! This is a simple app, and we're missing a bunch of potential features like resetting games and preventing clicks on the same tile. But it's not too much difficult to add more chains of observables which eventially flow into the application state.

---

## Demo / Full code

Note: Now lets take a look at what the final code looks like behind the scenes

---

## References

[Presentation source code](https://github.com/RangerMauve/ottawajs-react-observables)

[MostJS API](https://github.com/cujojs/most/blob/master/docs/api.md)

[MostJS dom event lib](https://github.com/mostjs/dom-event)

[Use observables for individual components](https://github.com/reactive-react/react-most)

[Cycle JS](https://cycle.js.org)
