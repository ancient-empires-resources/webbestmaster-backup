/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window, document */
	/*global APP */

	win.APP.maps = win.APP.maps || {};

	win.APP.maps.skirmish_001_013 = {
		"version": 3,
		"type": "skirmish",
		"size": {"width": 11, "height": 11},
		"maxPlayers": 2,
		"isOpen": false,

		// en
		"name": "Morning Star",

		// ru
		"name-ru": "Утренняя звезда",

		"units": [
			{"x": 2, "y": 8, "type": "commander", "ownerId": 0},
			{"x": 8, "y": 2, "type": "commander", "ownerId": 1}
		],
		"buildings": [
			{"x": 0, "y": 2, "type": "farm", "state": "normal"},
			{"x": 5, "y": 0, "type": "farm", "state": "normal"},
			{"x": 2, "y": 5, "type": "farm", "state": "normal"},
			{"x": 8, "y": 5, "type": "farm", "state": "normal"},
			{"x": 5, "y": 10, "type": "farm", "state": "normal"},
			{"x": 0, "y": 10, "type": "farm", "state": "normal"},
			{"x": 10, "y": 0, "type": "farm", "state": "normal"},
			{"x": 10, "y": 8, "type": "farm", "state": "normal"},
			{"x": 2, "y": 8, "type": "castle", "state": "normal", "ownerId": 0},
			{"x": 8, "y": 2, "type": "castle", "state": "normal", "ownerId": 1}
		],
		"terrain": {
			"x0y0": "water-1",
			"x0y1": "water-1",
			"x0y2": "terra-1",
			"x0y3": "terra-1",
			"x0y4": "forest-1",
			"x0y5": "water-1",
			"x1y0": "water-3",
			"x1y1": "water-1",
			"x1y2": "road-1",
			"x1y3": "road-1",
			"x1y4": "road-1",
			"x1y5": "road-1",
			"x2y0": "water-1",
			"x2y1": "water-1",
			"x2y2": "bridge-1",
			"x2y3": "water-1",
			"x2y4": "water-1",
			"x2y5": "terra-1",
			"x3y0": "water-2",
			"x3y1": "water-1",
			"x3y2": "bridge-1",
			"x3y3": "water-1",
			"x3y4": "water-1",
			"x3y5": "water-1",
			"x4y0": "water-1",
			"x4y1": "water-1",
			"x4y2": "road-1",
			"x4y3": "water-1",
			"x4y4": "water-1",
			"x4y5": "water-1",
			"x5y0": "terra-1",
			"x5y1": "forest-1",
			"x5y2": "road-1",
			"x5y3": "water-1",
			"x5y4": "water-1",
			"x5y5": "water-3",
			"x6y0": "stone-1",
			"x6y1": "road-1",
			"x6y2": "road-1",
			"x6y3": "stone-1",
			"x6y4": "water-1",
			"x6y5": "water-1",
			"x7y0": "forest-1",
			"x7y1": "road-1",
			"x7y2": "stone-1",
			"x7y3": "forest-1",
			"x7y4": "stone-1",
			"x7y5": "water-1",
			"x8y0": "stone-1",
			"x8y1": "road-1",
			"x8y2": "terra-1",
			"x8y3": "hill-1",
			"x8y4": "forest-1",
			"x8y5": "terra-1",
			"x9y0": "hill-1",
			"x9y1": "road-1",
			"x9y2": "road-1",
			"x9y3": "road-1",
			"x9y4": "road-1",
			"x9y5": "road-1",
			"x10y0": "terra-1",
			"x10y1": "terra-1",
			"x10y2": "forest-1",
			"x10y3": "stone-1",
			"x10y4": "water-1",
			"x10y5": "water-1",
			"x0y6": "water-1",
			"x1y6": "road-1",
			"x2y6": "forest-1",
			"x3y6": "stone-1",
			"x4y6": "water-1",
			"x5y6": "water-1",
			"x6y6": "water-2",
			"x7y6": "water-1",
			"x8y6": "water-1",
			"x9y6": "road-1",
			"x10y6": "forest-2",
			"x0y7": "stone-1",
			"x1y7": "road-1",
			"x2y7": "hill-1",
			"x3y7": "forest-2",
			"x4y7": "stone-1",
			"x5y7": "water-1",
			"x6y7": "water-1",
			"x7y7": "water-1",
			"x8y7": "water-1",
			"x9y7": "road-1",
			"x10y7": "terra-1",
			"x0y8": "forest-1",
			"x1y8": "road-1",
			"x2y8": "terra-1",
			"x3y8": "stone-1",
			"x4y8": "road-1",
			"x5y8": "road-1",
			"x6y8": "road-1",
			"x7y8": "bridge-1",
			"x8y8": "bridge-1",
			"x9y8": "road-1",
			"x10y8": "terra-1",
			"x0y9": "terra-1",
			"x1y9": "road-1",
			"x2y9": "road-1",
			"x3y9": "road-1",
			"x4y9": "road-1",
			"x5y9": "forest-2",
			"x6y9": "water-1",
			"x7y9": "water-1",
			"x8y9": "water-1",
			"x9y9": "water-1",
			"x10y9": "water-1",
			"x0y10": "terra-1",
			"x1y10": "hill-1",
			"x2y10": "stone-1",
			"x3y10": "forest-1",
			"x4y10": "stone-1",
			"x5y10": "terra-1",
			"x6y10": "water-1",
			"x7y10": "water-1",
			"x8y10": "water-3",
			"x9y10": "water-1",
			"x10y10": "water-1"
		}
	};

}(window));