/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window */
	/*global */

	var langEn = win.APP.languages.en;

	win.APP.maps.mission_4 = {
		"type": "mission",
		"isOpen": true,
		"size": {"width": 16, "height": 16},
		"name": "REINFORCEMENTS",
		"name-ru": "RU - REINFORCEMENTS",
		"maxPlayers": 2,
		"unitLimit": 25,
		"money": [400, 1000],
		"win": ['noEnemyUnit', 'allCastles'], // allCastles, noEnemyUnit
		"defeat": ['commanderIsDead'], // 'galamarDead', 'valadornDead'
		"objective": 'Protect the Temple of Life - destroy all enemy units, occupy the enemy castle!',
		"startBriefing": [
			{
				popupName: 'briefing',
				from: 'right',
				cssClass: 'briefing',
				popupData: {
					text: 'Your Majesty, thank the Creator you are here! Please help us protect the Crystal!',
					img: 'i/face/tamplier.png'
				}
			},
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Only in the heavily guarded fortresses of Thorin will the Crystal be safe. We must deliver it there.',
					img: 'i/face/galamar.png'
				}
			},
			{
				popupName: 'briefing',
				from: 'right',
				cssClass: 'briefing',
				popupData: {
					text: 'Your Majesty, our scouts report enemy troops nearby!',
					img: 'i/face/soldier.png'
				}
			},
			{
				popupName: 'briefing',
				from: 'right',
				cssClass: 'briefing',
				popupData: {
					text: 'They are destroying our buildings to cripple our supply of gold! They must be stopped!',
					img: 'i/face/soldier.png'
				}
			},
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Captain, we must save the Crystal, prepare the troops for battle!',
					img: 'i/face/galamar.png'
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: langEn.objective,
					text: 'Protect the Temple of Life - destroy all enemy units, occupy the enemy castle!'
				},
				onHide: {
					fn: 'showHelpButton'
				}
			}
		],

		"endBriefing": [
			{
				popupName: 'briefing',
				from: 'right',
				cssClass: 'briefing',
				popupData: {
					text: 'Your Majesty, We have stopped the attack.',
					img: 'i/face/soldier.png'
				}
			},
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Well done, Captain! Prepare the troops to march to Thorin!',
					img: 'i/face/galamar.png'
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: langEn.victory,
					text: 'Go to next mission!'
				},
				onHide: {
					fn: 'backTo',
					args: ['select-level']
				}
			}
		],

		"units": [
			{"x": 7, "y": 1, "type": "galamar", "ownerId": 0},
			{"x": 3, "y": 3, "type": "sorceress", "ownerId": 0},
			{"x": 7, "y": 5, "type": "elemental", "ownerId": 0},
			{"x": 5, "y": 4, "type": "soldier", "ownerId": 0},
			{"x": 11, "y": 3, "type": "archer", "ownerId": 0},
			{"x": 12, "y": 3, "type": "soldier", "ownerId": 0},
			{"x": 13, "y": 6, "type": "soldier", "ownerId": 1},
			{"x": 11, "y": 7, "type": "dire-wolf", "ownerId": 1},
			{"x": 13, "y": 9, "type": "demon-lord", "ownerId": 1},
			{"x": 12, "y": 9, "type": "catapult", "ownerId": 1},
			{"x": 5, "y": 11, "type": "golem", "ownerId": 1},
			{"x": 6, "y": 10, "type": "catapult", "ownerId": 1},
			{"x": 9, "y": 11, "type": "soldier", "ownerId": 1},
			{"x": 14, "y": 5, "type": "elemental", "ownerId": 1}
		],
		"buildings": [
			{"x": 7, "y": 1, "type": "castle", "state": "normal", "ownerId": 0},
			{"x": 3, "y": 3, "type": "temple", "state": "normal"},
			{"x": 7, "y": 5, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 1, "y": 8, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 5, "y": 11, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 4, "y": 9, "type": "farm", "state": "destroyed"},
			{"x": 9, "y": 1, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 12, "y": 3, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 13, "y": 6, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 13, "y": 9, "type": "castle", "state": "normal", "ownerId": 1},
			{"x": 9, "y": 11, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 14, "y": 11, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 12, "y": 13, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 5, "y": 4, "type": "farm", "state": "normal", "ownerId": 0}
		],
		"terrain": {
			"x0y0": "stone-1",
			"x0y1": "stone-1",
			"x0y2": "forest-1",
			"x0y3": "stone-1",
			"x0y4": "hill-1",
			"x0y5": "road-1",
			"x1y0": "stone-1",
			"x1y1": "forest-2",
			"x1y2": "hill-1",
			"x1y3": "forest-1",
			"x1y4": "forest-1",
			"x1y5": "road-1",
			"x2y0": "stone-1",
			"x2y1": "forest-2",
			"x2y2": "forest-1",
			"x2y3": "terra-1",
			"x2y4": "hill-1",
			"x2y5": "road-1",
			"x3y0": "forest-1",
			"x3y1": "stone-1",
			"x3y2": "terra-1",
			"x3y3": "terra-1",
			"x3y4": "road-1",
			"x3y5": "road-1",
			"x4y0": "stone-1",
			"x4y1": "forest-2",
			"x4y2": "stone-1",
			"x4y3": "terra-1",
			"x4y4": "hill-1",
			"x4y5": "road-1",
			"x5y0": "forest-1",
			"x5y1": "hill-1",
			"x5y2": "forest-1",
			"x5y3": "stone-1",
			"x5y4": "terra-1",
			"x5y5": "road-1",
			"x6y0": "forest-1",
			"x6y1": "terra-1",
			"x6y2": "terra-1",
			"x6y3": "stone-1",
			"x6y4": "forest-1",
			"x6y5": "forest-2",
			"x7y0": "stone-1",
			"x7y1": "terra-1",
			"x7y2": "road-1",
			"x7y3": "forest-1",
			"x7y4": "forest-2",
			"x7y5": "terra-1",
			"x8y0": "road-1",
			"x8y1": "road-1",
			"x8y2": "road-1",
			"x8y3": "road-1",
			"x8y4": "road-1",
			"x8y5": "road-1",
			"x9y0": "forest-2",
			"x9y1": "terra-1",
			"x9y2": "road-1",
			"x9y3": "forest-2",
			"x9y4": "terra-1",
			"x9y5": "hill-1",
			"x10y0": "stone-1",
			"x10y1": "forest-2",
			"x10y2": "road-1",
			"x10y3": "stone-1",
			"x10y4": "forest-1",
			"x10y5": "forest-1",
			"x11y0": "forest-1",
			"x11y1": "hill-1",
			"x11y2": "road-1",
			"x11y3": "hill-1",
			"x11y4": "forest-1",
			"x11y5": "stone-1",
			"x12y0": "forest-1",
			"x12y1": "hill-1",
			"x12y2": "road-1",
			"x12y3": "terra-1",
			"x12y4": "water-1",
			"x12y5": "water-1",
			"x13y0": "forest-1",
			"x13y1": "road-1",
			"x13y2": "road-1",
			"x13y3": "stone-1",
			"x13y4": "water-1",
			"x13y5": "water-1",
			"x14y0": "stone-1",
			"x14y1": "road-1",
			"x14y2": "hill-1",
			"x14y3": "water-1",
			"x14y4": "water-1",
			"x14y5": "water-1",
			"x0y6": "stone-1",
			"x1y6": "stone-1",
			"x2y6": "forest-1",
			"x3y6": "road-1",
			"x4y6": "forest-2",
			"x5y6": "road-1",
			"x6y6": "road-1",
			"x7y6": "road-1",
			"x8y6": "road-1",
			"x9y6": "stone-1",
			"x10y6": "terra-1",
			"x11y6": "forest-1",
			"x12y6": "stone-1",
			"x13y6": "terra-1",
			"x14y6": "forest-1",
			"x0y7": "forest-1",
			"x1y7": "terra-1",
			"x2y7": "hill-1",
			"x3y7": "road-1",
			"x4y7": "forest-1",
			"x5y7": "forest-2",
			"x6y7": "hill-1",
			"x7y7": "stone-1",
			"x8y7": "water-1",
			"x9y7": "water-1",
			"x10y7": "forest-2",
			"x11y7": "forest-1",
			"x12y7": "forest-2",
			"x13y7": "hill-1",
			"x14y7": "forest-1",
			"x0y8": "stone-1",
			"x1y8": "terra-1",
			"x2y8": "terra-1",
			"x3y8": "road-1",
			"x4y8": "stone-1",
			"x5y8": "stone-1",
			"x6y8": "forest-2",
			"x7y8": "water-1",
			"x8y8": "water-1",
			"x9y8": "water-1",
			"x10y8": "stone-1",
			"x11y8": "terra-1",
			"x12y8": "terra-1",
			"x13y8": "terra-1",
			"x14y8": "stone-1",
			"x0y9": "hill-1",
			"x1y9": "stone-1",
			"x2y9": "forest-1",
			"x3y9": "road-1",
			"x4y9": "terra-1",
			"x5y9": "terra-1",
			"x6y9": "stone-1",
			"x7y9": "water-1",
			"x8y9": "water-1",
			"x9y9": "water-1",
			"x10y9": "forest-2",
			"x11y9": "terra-1",
			"x12y9": "hill-1",
			"x13y9": "terra-1",
			"x14y9": "terra-1",
			"x0y10": "forest-1",
			"x1y10": "forest-2",
			"x2y10": "terra-1",
			"x3y10": "road-1",
			"x4y10": "road-1",
			"x5y10": "road-1",
			"x6y10": "road-1",
			"x7y10": "bridge-1",
			"x8y10": "bridge-1",
			"x9y10": "road-1",
			"x10y10": "road-1",
			"x11y10": "road-1",
			"x12y10": "road-1",
			"x13y10": "road-1",
			"x14y10": "road-1",
			"x0y11": "stone-1",
			"x1y11": "forest-2",
			"x2y11": "hill-1",
			"x3y11": "hill-1",
			"x4y11": "terra-1",
			"x5y11": "terra-1",
			"x6y11": "hill-1",
			"x7y11": "water-1",
			"x8y11": "water-1",
			"x9y11": "terra-1",
			"x10y11": "terra-1",
			"x11y11": "hill-1",
			"x12y11": "forest-1",
			"x13y11": "road-1",
			"x14y11": "terra-1",
			"x0y12": "forest-1",
			"x1y12": "forest-1",
			"x2y12": "forest-1",
			"x3y12": "stone-1",
			"x4y12": "forest-1",
			"x5y12": "terra-1",
			"x6y12": "forest-1",
			"x7y12": "water-1",
			"x8y12": "water-1",
			"x9y12": "forest-1",
			"x10y12": "stone-1",
			"x11y12": "terra-1",
			"x12y12": "terra-1",
			"x13y12": "road-1",
			"x14y12": "forest-2",
			"x15y0": "forest-1",
			"x15y1": "road-1",
			"x15y2": "stone-1",
			"x15y3": "water-1",
			"x15y4": "water-2",
			"x15y5": "water-1",
			"x15y6": "water-1",
			"x15y7": "forest-1",
			"x15y8": "road-1",
			"x15y9": "road-1",
			"x15y10": "road-1",
			"x15y11": "stone-1",
			"x15y12": "forest-2",
			"x0y13": "water-1",
			"x1y13": "water-1",
			"x2y13": "water-1",
			"x3y13": "stone-1",
			"x4y13": "hill-1",
			"x5y13": "forest-1",
			"x6y13": "water-1",
			"x7y13": "water-1",
			"x8y13": "water-1",
			"x9y13": "stone-1",
			"x10y13": "terra-1",
			"x11y13": "terra-1",
			"x12y13": "terra-1",
			"x13y13": "road-1",
			"x14y13": "road-1",
			"x15y13": "forest-1",
			"x0y14": "water-3",
			"x1y14": "water-1",
			"x2y14": "water-1",
			"x3y14": "forest-2",
			"x4y14": "stone-1",
			"x5y14": "water-1",
			"x6y14": "water-1",
			"x7y14": "water-1",
			"x8y14": "water-1",
			"x9y14": "hill-1",
			"x10y14": "forest-2",
			"x11y14": "hill-1",
			"x12y14": "stone-1",
			"x13y14": "terra-1",
			"x14y14": "road-1",
			"x15y14": "forest-1",
			"x0y15": "water-1",
			"x1y15": "water-2",
			"x2y15": "water-1",
			"x3y15": "water-1",
			"x4y15": "water-1",
			"x5y15": "water-1",
			"x6y15": "water-3",
			"x7y15": "water-1",
			"x8y15": "hill-1",
			"x9y15": "forest-1",
			"x10y15": "forest-1",
			"x11y15": "forest-1",
			"x12y15": "forest-2",
			"x13y15": "hill-1",
			"x14y15": "road-1",
			"x15y15": "forest-2"
		}
	}

}(window));