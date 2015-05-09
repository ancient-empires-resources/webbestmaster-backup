/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP.maps = win.APP.maps || {};

	win.APP.maps.skirmish_001_002 = {
		version: 3,
		type: 'skirmish',
		size: {width: 10, height: 10},
		maxPlayers: 2,
		isOpen: true,

		// en
		name: 'River',

		// ru
		"name-ru": 'Река',

		"units": [
			{type: "commander", x: 8, y: 1, ownerId: 0},
			{type: "commander", x: 1, y: 8, ownerId: 1}
		],

		"buildings": [
			{type: "farm", x: 9, y: 0, state: 'normal'},
			{type: "farm", x: 1, y: 1, state: 'destroyed'},
			{type: "castle", x: 8, y: 1, state: 'normal', ownerId: 0},
			{type: "farm", x: 2, y: 4, state: 'destroyed'},
			{type: "farm", x: 7, y: 5, state: 'destroyed'},
			{type: "castle", x: 1, y: 8, state: 'normal', ownerId: 1},
			{type: "farm", x: 8, y: 8, state: 'destroyed'},
			{type: "farm", x: 0, y: 9, state: 'normal'}
		],

		"terrain": {
			"x0y0": "forest-1",
			"x1y0": "forest-1",
			"x2y0": "hill-1",
			"x3y0": "hill-1",
			"x4y0": "hill-1",
			"x5y0": "forest-1",
			"x6y0": "forest-1",
			"x7y0": "forest-1",
			"x8y0": "forest-1",
			"x9y0": "terra-1",
			"x0y1": "forest-1",
			"x1y1": "terra-1",
			"x2y1": "terra-1",
			"x3y1": "terra-1",
			"x4y1": "road-1",
			"x5y1": "road-1",
			"x6y1": "road-1",
			"x7y1": "road-1",
			"x8y1": "road-1",
			"x9y1": "forest-1",
			"x0y2": "water-1",
			"x1y2": "water-1",
			"x2y2": "water-1",
			"x3y2": "water-1",
			"x4y2": "road-1",
			"x5y2": "terra-1",
			"x6y2": "hill-1",
			"x7y2": "road-1",
			"x8y2": "road-1",
			"x9y2": "forest-1",
			"x0y3": "terra-1",
			"x1y3": "road-1",
			"x2y3": "road-1",
			"x3y3": "bridge-1",
			"x4y3": "road-1",
			"x5y3": "terra-1",
			"x6y3": "hill-1",
			"x7y3": "stone-1",
			"x8y3": "road-1",
			"x9y3": "forest-1",
			"x0y4": "terra-1",
			"x1y4": "road-1",
			"x2y4": "terra-1",
			"x3y4": "water-1",
			"x4y4": "water-1",
			"x5y4": "water-1",
			"x6y4": "terra-1",
			"x7y4": "terra-1",
			"x8y4": "road-1",
			"x9y4": "forest-1",
			"x0y5": "forest-1",
			"x1y5": "road-1",
			"x2y5": "terra-1",
			"x3y5": "terra-1",
			"x4y5": "water-1",
			"x5y5": "water-1",
			"x6y5": "water-1",
			"x7y5": "terra-1",
			"x8y5": "road-1",
			"x9y5": "terra-1",
			"x0y6": "forest-1",
			"x1y6": "road-1",
			"x2y6": "stone-1",
			"x3y6": "hill-1",
			"x4y6": "terra-1",
			"x5y6": "road-1",
			"x6y6": "bridge-1",
			"x7y6": "road-1",
			"x8y6": "road-1",
			"x9y6": "terra-1",
			"x0y7": "forest-1",
			"x1y7": "road-1",
			"x2y7": "road-1",
			"x3y7": "hill-1",
			"x4y7": "terra-1",
			"x5y7": "road-1",
			"x6y7": "water-1",
			"x7y7": "water-1",
			"x8y7": "water-1",
			"x9y7": "water-1",
			"x0y8": "forest-1",
			"x1y8": "road-1",
			"x2y8": "road-1",
			"x3y8": "road-1",
			"x4y8": "road-1",
			"x5y8": "road-1",
			"x6y8": "terra-1",
			"x7y8": "terra-1",
			"x8y8": "terra-1",
			"x9y8": "forest-1",
			"x0y9": "terra-1",
			"x1y9": "forest-1",
			"x2y9": "forest-1",
			"x3y9": "forest-1",
			"x4y9": "forest-1",
			"x5y9": "hill-1",
			"x6y9": "hill-1",
			"x7y9": "hill-1",
			"x8y9": "forest-1",
			"x9y9": "forest-1"
		}

	};

}(window));