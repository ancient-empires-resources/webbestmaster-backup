/*jslint white: true, nomen: true */ // http://www.jslint.com/lint.html#options
(function (win) {

	"use strict";
	/*global console, alert, window, document */
	/*global */

	win.APP.building = {
		defaults: {
			state: 'normal',
			ownerId: null,
			color: 'gray',
			teamNumber: null
		},
		list: {
			castle: {
				availableStates: ['normal'],
				earn: 30,
				healthUp: 30,
				defence: 20,
				canBeStore: true
			},
			farm: {
				availableStates: ['normal', 'destroyed'],
				earn: 20,
				healthUp: 20,
				defence: 15
			},
			well: {
				availableStates: ['normal'],
				healthUp: 20,
				defence: 15
			},
			temple: {
				availableStates: ['normal'],
				healthUp: 20,
				defence: 15
			}
		}

	};


}(window));