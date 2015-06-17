/*jslint white: true, nomen: true */
(function (win) {

	'use strict';
	/*global window, document */
	/*global APP */

	win.APP.maps = win.APP.maps || {};

	win.APP.maps.skirmish_001_008 = {
		version: 3,
		type: 'skirmish',
		size: {width: 15, height: 15},
		maxPlayers: 4,
		isOpen: false,

		// en
		name: 'Solitude',

		// ru
		'name-ru': 'Одиночество',

		units: [
			{x: 2, y: 7, type: 'commander', ownerId: 0},
			{x: 7, y: 2, type: 'commander', ownerId: 1},
			{x: 12, y: 7, type: 'commander', ownerId: 2},
			{x: 7, y: 12, type: 'commander', ownerId: 3}
		],
		buildings: [
			{x: 7, y: 7, type: 'farm', state: 'normal'},
			{x: 6, y: 2, type: 'farm', state: 'normal'},
			{x: 4, y: 4, type: 'farm', state: 'normal'},
			{x: 4, y: 10, type: 'farm', state: 'normal'},
			{x: 10, y: 10, type: 'farm', state: 'normal'},
			{x: 10, y: 4, type: 'farm', state: 'normal'},
			{x: 2, y: 8, type: 'farm', state: 'normal'},
			{x: 8, y: 12, type: 'farm', state: 'normal'},
			{x: 12, y: 6, type: 'farm', state: 'normal'},
			{x: 2, y: 7, type: 'castle', state: 'normal', ownerId: 0},
			{x: 7, y: 2, type: 'castle', state: 'normal', ownerId: 1},
			{x: 12, y: 7, type: 'castle', state: 'normal', ownerId: 2},
			{x: 7, y: 12, type: 'castle', state: 'normal', ownerId: 3}
		],
		terrain: {
			x0y0: 'water-3',
			x0y1: 'water-1',
			x0y2: 'water-2',
			x0y3: 'water-1',
			x0y4: 'water-1',
			x0y5: 'water-1',
			x1y0: 'water-1',
			x1y1: 'water-1',
			x1y2: 'water-1',
			x1y3: 'water-1',
			x1y4: 'water-1',
			x1y5: 'forest-1',
			x2y0: 'water-1',
			x2y1: 'water-1',
			x2y2: 'water-1',
			x2y3: 'stone-1',
			x2y4: 'terra-1',
			x2y5: 'hill-1',
			x3y0: 'water-2',
			x3y1: 'water-1',
			x3y2: 'stone-1',
			x3y3: 'road-1',
			x3y4: 'road-1',
			x3y5: 'road-1',
			x4y0: 'water-1',
			x4y1: 'water-1',
			x4y2: 'hill-1',
			x4y3: 'road-1',
			x4y4: 'terra-1',
			x4y5: 'water-1',
			x5y0: 'water-1',
			x5y1: 'forest-1',
			x5y2: 'terra-1',
			x5y3: 'road-1',
			x5y4: 'water-1',
			x5y5: 'water-1',
			x6y0: 'water-1',
			x6y1: 'hill-1',
			x6y2: 'terra-1',
			x6y3: 'road-1',
			x6y4: 'water-1',
			x6y5: 'water-1',
			x7y0: 'water-1',
			x7y1: 'terra-1',
			x7y2: 'terra-1',
			x7y3: 'road-1',
			x7y4: 'bridge-2',
			x7y5: 'bridge-2',
			x8y0: 'water-1',
			x8y1: 'forest-2',
			x8y2: 'terra-1',
			x8y3: 'road-1',
			x8y4: 'water-1',
			x8y5: 'water-1',
			x9y0: 'water-1',
			x9y1: 'forest-2',
			x9y2: 'forest-1',
			x9y3: 'road-1',
			x9y4: 'water-1',
			x9y5: 'water-1',
			x10y0: 'water-1',
			x10y1: 'water-1',
			x10y2: 'stone-1',
			x10y3: 'road-1',
			x10y4: 'terra-1',
			x10y5: 'water-1',
			x11y0: 'water-3',
			x11y1: 'water-1',
			x11y2: 'hill-1',
			x11y3: 'road-1',
			x11y4: 'road-1',
			x11y5: 'road-1',
			x12y0: 'water-1',
			x12y1: 'water-1',
			x12y2: 'water-1',
			x12y3: 'stone-1',
			x12y4: 'terra-1',
			x12y5: 'hill-1',
			x13y0: 'water-1',
			x13y1: 'water-2',
			x13y2: 'water-1',
			x13y3: 'water-1',
			x13y4: 'water-1',
			x13y5: 'forest-2',
			x14y0: 'water-1',
			x14y1: 'water-1',
			x14y2: 'water-1',
			x14y3: 'water-1',
			x14y4: 'water-1',
			x14y5: 'water-1',
			x0y6: 'water-1',
			x1y6: 'hill-1',
			x2y6: 'terra-1',
			x3y6: 'road-1',
			x4y6: 'water-1',
			x5y6: 'water-1',
			x6y6: 'water-1',
			x7y6: 'bridge-2',
			x8y6: 'water-1',
			x9y6: 'water-1',
			x10y6: 'water-1',
			x11y6: 'road-1',
			x12y6: 'terra-1',
			x13y6: 'terra-1',
			x14y6: 'water-1',
			x0y7: 'water-1',
			x1y7: 'terra-1',
			x2y7: 'terra-1',
			x3y7: 'road-1',
			x4y7: 'bridge-1',
			x5y7: 'bridge-1',
			x6y7: 'bridge-1',
			x7y7: 'terra-1',
			x8y7: 'bridge-1',
			x9y7: 'bridge-1',
			x10y7: 'bridge-1',
			x11y7: 'road-1',
			x12y7: 'terra-1',
			x13y7: 'hill-1',
			x14y7: 'water-1',
			x0y8: 'water-1',
			x1y8: 'hill-1',
			x2y8: 'terra-1',
			x3y8: 'road-1',
			x4y8: 'water-1',
			x5y8: 'water-1',
			x6y8: 'water-1',
			x7y8: 'bridge-2',
			x8y8: 'water-1',
			x9y8: 'water-1',
			x10y8: 'water-1',
			x11y8: 'road-1',
			x12y8: 'terra-1',
			x13y8: 'stone-1',
			x14y8: 'water-1',
			x0y9: 'water-1',
			x1y9: 'forest-2',
			x2y9: 'forest-1',
			x3y9: 'road-1',
			x4y9: 'water-1',
			x5y9: 'water-1',
			x6y9: 'water-1',
			x7y9: 'bridge-2',
			x8y9: 'water-1',
			x9y9: 'water-1',
			x10y9: 'water-1',
			x11y9: 'road-1',
			x12y9: 'hill-1',
			x13y9: 'forest-1',
			x14y9: 'water-1',
			x0y10: 'water-1',
			x1y10: 'water-1',
			x2y10: 'stone-1',
			x3y10: 'road-1',
			x4y10: 'terra-1',
			x5y10: 'water-1',
			x6y10: 'water-1',
			x7y10: 'bridge-2',
			x8y10: 'water-1',
			x9y10: 'water-1',
			x10y10: 'terra-1',
			x11y10: 'road-1',
			x12y10: 'forest-1',
			x13y10: 'water-1',
			x14y10: 'water-1',
			x0y11: 'water-1',
			x1y11: 'water-1',
			x2y11: 'forest-1',
			x3y11: 'road-1',
			x4y11: 'road-1',
			x5y11: 'road-1',
			x6y11: 'road-1',
			x7y11: 'road-1',
			x8y11: 'road-1',
			x9y11: 'road-1',
			x10y11: 'road-1',
			x11y11: 'road-1',
			x12y11: 'forest-2',
			x13y11: 'water-1',
			x14y11: 'water-2',
			x0y12: 'water-2',
			x1y12: 'water-1',
			x2y12: 'water-1',
			x3y12: 'stone-1',
			x4y12: 'terra-1',
			x5y12: 'hill-1',
			x6y12: 'terra-1',
			x7y12: 'terra-1',
			x8y12: 'terra-1',
			x9y12: 'hill-1',
			x10y12: 'terra-1',
			x11y12: 'stone-1',
			x12y12: 'water-1',
			x13y12: 'water-1',
			x14y12: 'water-1',
			x0y13: 'water-1',
			x1y13: 'water-1',
			x2y13: 'water-1',
			x3y13: 'water-1',
			x4y13: 'water-1',
			x5y13: 'forest-1',
			x6y13: 'hill-1',
			x7y13: 'forest-2',
			x8y13: 'terra-1',
			x9y13: 'forest-2',
			x10y13: 'water-1',
			x11y13: 'water-1',
			x12y13: 'water-1',
			x13y13: 'water-1',
			x14y13: 'water-1',
			x0y14: 'water-1',
			x1y14: 'water-1',
			x2y14: 'water-3',
			x3y14: 'water-1',
			x4y14: 'water-1',
			x5y14: 'water-1',
			x6y14: 'water-1',
			x7y14: 'water-1',
			x8y14: 'water-1',
			x9y14: 'water-1',
			x10y14: 'water-1',
			x11y14: 'water-3',
			x12y14: 'water-1',
			x13y14: 'water-1',
			x14y14: 'water-1'
		}
	};

}(window));