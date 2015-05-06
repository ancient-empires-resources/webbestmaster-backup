/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window */
	/*global */

	var langEn = win.APP.languages.en,
		langRu = win.APP.languages.ru;

	win.APP.maps.mission_001_006 = {
		"version": 3,
		"type": "mission",
		"isOpen": false,
		"openMaps": [
			{"jsMapKey": 'mission_001_007', "type": "mission"},
			{"jsMapKey": 'mission_001_012', "type": "skirmish"}
		],
		"size": {"width": 12, "height": 20},
		"name": "NORTHBOUND",
		"name-ru": "ИДУЩИЙ НА СЕВЕР",
		"maxPlayers": 2,
		"unitLimit": 25,
		"availableStoreUnits": ["soldier", "archer", "elemental", "sorceress", "wisp", "dire-wolf", "golem"],
		"money": [
			{playerId: 0, money: 600},
			{playerId: 1, money: 600}
		],
		"win": ['noEnemyUnit', 'allCastles'], // allCastles, noEnemyUnit, allUnorderedCasesIsDone
		"defeat": ['commanderIsDead'], // 'galamarDead', 'valadornDead', crystalIsDead

		"objective": 'Occupy the enemy castle and destroy all enemy troops. Valadorn must survive.',
		"objective-ru": 'Занять вражеский замок и уничтожить все вражеские войска. Король Валадорн должен выжить.',

		"startBriefing": [
			{
				popupName: 'simple-notification',
				popupData: {
					header: 'The Gates of Thorin'
				}
			},
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'The enemy is planning to attack King Galamar before he reaches Thorin! We must defeat them!',
					img: 'i/face/valadorn.png'
				},
				onShow: {
					fn: 'centerToXY',
					context: 'parentView',
					args: [{ x: 5, y: 17 }]
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: 'NORTHBOUND',
					text: 'Occupy the enemy castle and destroy all enemy troops. Valadorn must survive.'
				}
			}

		],

		"startBriefing-ru": [
			{
				popupName: 'simple-notification',
				popupData: {
					header: 'Ворота Торина'
				}
			},
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Враг планирует атаковать Короля Галамара, пока он не достигнет Торина. Мы должны уничтожить их!',
					img: 'i/face/valadorn.png'
				},
				onShow: {
					fn: 'centerToXY',
					context: 'parentView',
					args: [{ x: 5, y: 17 }]
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: 'NORTHBOUND',
					text: 'Занять вражеский замок и уничтожить все вражеские войска. Король Валадорн должен выжить.'
				}
			}

		],

		"endBriefing": [
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Let us hurry North to meet Galamar. The enemy knows of his plans and he may need help!',
					img: 'i/face/valadorn.png'
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: langEn.missionComplete,
					text: '\'Winter Storm\' ' + langEn.unlocked
				},
				playSound: {
					sound: 'victory.mp3',
					road: 0,
					isLoop: false
				},
				onHide: {
					fn: 'openMap',
					args: ['mission_001_007', { type: 'mission' }]
				}
			}
		],

		"endBriefing-ru": [
			{
				popupName: 'briefing',
				from: 'left',
				cssClass: 'briefing',
				popupData: {
					text: 'Давайте поспешим на Север, чтобы встретиться с Галамаром. Враги знают о его планах и ему может потребоваться наша помощь!',
					img: 'i/face/valadorn.png'
				}
			},
			{
				popupName: 'simple-notification',
				popupData: {
					header: langRu.missionComplete,
					text: '\'Зимний Шторм\' ' + langRu.unlocked
				},
				playSound: {
					sound: 'victory.mp3',
					road: 0,
					isLoop: false
				},
				onHide: {
					fn: 'openMap',
					args: ['mission_001_007', { type: 'mission' }]
				}
			}
		],

		"units": [
			{"x": 5, "y": 5, "type": "demon-lord", "ownerId": 1},
			{"x": 6, "y": 5, "type": "wisp", "ownerId": 1},
			{"x": 4, "y": 6, "type": "golem", "ownerId": 1},
			{"x": 5, "y": 6, "type": "catapult", "ownerId": 1},
			{"x": 6, "y": 6, "type": "soldier", "ownerId": 1},
			{"x": 7, "y": 6, "type": "dire-wolf", "ownerId": 1},
			{"x": 5, "y": 7, "type": "soldier", "ownerId": 1},
			{"x": 5, "y": 17, "type": "valadorn", "ownerId": 0},
			{"x": 7, "y": 17, "type": "archer", "ownerId": 0},
			{"x": 8, "y": 17, "type": "soldier", "ownerId": 0},
			{"x": 8, "y": 16, "type": "golem", "ownerId": 0},
			{"x": 4, "y": 16, "type": "dire-wolf", "ownerId": 0},
			{"x": 3, "y": 17, "type": "catapult", "ownerId": 0}
		],
		"buildings": [
			{"x": 5, "y": 5, "type": "castle", "state": "normal", "ownerId": 1},
			{"x": 5, "y": 7, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 7, "y": 8, "type": "farm", "state": "normal", "ownerId": 1},
			{"x": 10, "y": 6, "type": "farm", "state": "normal"},
			{"x": 2, "y": 7, "type": "farm", "state": "normal"},
			{"x": 10, "y": 10, "type": "farm", "state": "destroyed"},
			{"x": 2, "y": 14, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 9, "y": 13, "type": "farm", "state": "destroyed"},
			{"x": 4, "y": 12, "type": "farm", "state": "normal"},
			{"x": 8, "y": 17, "type": "farm", "state": "normal", "ownerId": 0},
			{"x": 5, "y": 17, "type": "castle", "state": "normal", "ownerId": 0}
		],
		"terrain": {
			"x0y0": "water-1",
			"x0y1": "water-1",
			"x0y2": "water-1",
			"x0y3": "water-3",
			"x0y4": "water-1",
			"x0y5": "forest-1",
			"x1y0": "water-1",
			"x1y1": "water-2",
			"x1y2": "water-1",
			"x1y3": "water-1",
			"x1y4": "water-1",
			"x1y5": "forest-1",
			"x2y0": "water-1",
			"x2y1": "water-1",
			"x2y2": "water-1",
			"x2y3": "stone-1",
			"x2y4": "forest-1",
			"x2y5": "forest-2",
			"x3y0": "water-1",
			"x3y1": "water-1",
			"x3y2": "forest-2",
			"x3y3": "forest-1",
			"x3y4": "hill-1",
			"x3y5": "stone-1",
			"x4y0": "water-1",
			"x4y1": "hill-1",
			"x4y2": "terra-1",
			"x4y3": "stone-1",
			"x4y4": "terra-1",
			"x4y5": "forest-1",
			"x5y0": "bridge-2",
			"x5y1": "road-1",
			"x5y2": "road-1",
			"x5y3": "road-1",
			"x5y4": "terra-1",
			"x5y5": "terra-1",
			"x6y0": "water-1",
			"x6y1": "terra-1",
			"x6y2": "terra-1",
			"x6y3": "road-1",
			"x6y4": "road-1",
			"x6y5": "road-1",
			"x7y0": "water-1",
			"x7y1": "stone-1",
			"x7y2": "forest-2",
			"x7y3": "terra-1",
			"x7y4": "stone-1",
			"x7y5": "hill-1",
			"x8y0": "water-1",
			"x8y1": "forest-1",
			"x8y2": "terra-1",
			"x8y3": "stone-1",
			"x8y4": "forest-2",
			"x8y5": "forest-1",
			"x9y0": "water-1",
			"x9y1": "water-1",
			"x9y2": "stone-1",
			"x9y3": "terra-1",
			"x9y4": "forest-1",
			"x9y5": "forest-2",
			"x10y0": "water-2",
			"x10y1": "water-1",
			"x10y2": "water-1",
			"x10y3": "water-1",
			"x10y4": "water-1",
			"x10y5": "forest-1",
			"x11y0": "water-1",
			"x11y1": "water-3",
			"x11y2": "water-1",
			"x11y3": "water-2",
			"x11y4": "water-1",
			"x11y5": "water-1",
			"x0y6": "stone-1",
			"x1y6": "road-1",
			"x2y6": "road-1",
			"x3y6": "road-1",
			"x4y6": "road-1",
			"x5y6": "road-1",
			"x6y6": "road-1",
			"x7y6": "road-1",
			"x8y6": "road-1",
			"x9y6": "road-1",
			"x10y6": "terra-1",
			"x11y6": "water-1",
			"x0y7": "hill-1",
			"x1y7": "road-1",
			"x2y7": "terra-1",
			"x3y7": "forest-1",
			"x4y7": "stone-1",
			"x5y7": "terra-1",
			"x6y7": "road-1",
			"x7y7": "terra-1",
			"x8y7": "stone-1",
			"x9y7": "road-1",
			"x10y7": "road-1",
			"x11y7": "road-1",
			"x0y8": "forest-2",
			"x1y8": "road-1",
			"x2y8": "stone-1",
			"x3y8": "terra-1",
			"x4y8": "forest-1",
			"x5y8": "hill-1",
			"x6y8": "road-1",
			"x7y8": "terra-1",
			"x8y8": "terra-1",
			"x9y8": "water-1",
			"x10y8": "water-1",
			"x11y8": "bridge-2",
			"x0y9": "forest-1",
			"x1y9": "road-1",
			"x2y9": "forest-2",
			"x3y9": "hill-1",
			"x4y9": "forest-1",
			"x5y9": "terra-1",
			"x6y9": "road-1",
			"x7y9": "hill-1",
			"x8y9": "forest-1",
			"x9y9": "water-1",
			"x10y9": "water-1",
			"x11y9": "bridge-2",
			"x0y10": "water-1",
			"x1y10": "bridge-2",
			"x2y10": "water-1",
			"x3y10": "water-1",
			"x4y10": "water-1",
			"x5y10": "stone-1",
			"x6y10": "road-1",
			"x7y10": "terra-1",
			"x8y10": "forest-1",
			"x9y10": "forest-2",
			"x10y10": "terra-1",
			"x11y10": "road-1",
			"x0y11": "water-1",
			"x1y11": "bridge-2",
			"x2y11": "water-1",
			"x3y11": "water-1",
			"x4y11": "water-1",
			"x5y11": "hill-1",
			"x6y11": "road-1",
			"x7y11": "stone-1",
			"x8y11": "hill-1",
			"x9y11": "stone-1",
			"x10y11": "terra-1",
			"x11y11": "road-1",
			"x0y12": "stone-1",
			"x1y12": "road-1",
			"x2y12": "road-1",
			"x3y12": "road-1",
			"x4y12": "terra-1",
			"x5y12": "forest-1",
			"x6y12": "road-1",
			"x7y12": "road-1",
			"x8y12": "road-1",
			"x9y12": "road-1",
			"x10y12": "road-1",
			"x11y12": "road-1",
			"x0y13": "forest-1",
			"x1y13": "terra-1",
			"x2y13": "hill-1",
			"x3y13": "road-1",
			"x4y13": "terra-1",
			"x5y13": "hill-1",
			"x6y13": "water-1",
			"x7y13": "water-1",
			"x8y13": "water-1",
			"x9y13": "terra-1",
			"x10y13": "hill-1",
			"x11y13": "stone-1",
			"x0y14": "water-1",
			"x1y14": "water-1",
			"x2y14": "terra-1",
			"x3y14": "road-1",
			"x4y14": "hill-1",
			"x5y14": "stone-1",
			"x6y14": "water-1",
			"x7y14": "water-3",
			"x8y14": "water-1",
			"x9y14": "road-1",
			"x10y14": "road-1",
			"x11y14": "road-1",
			"x0y15": "water-1",
			"x1y15": "water-1",
			"x2y15": "terra-1",
			"x3y15": "road-1",
			"x4y15": "forest-2",
			"x5y15": "forest-1",
			"x6y15": "water-1",
			"x7y15": "water-1",
			"x8y15": "water-1",
			"x9y15": "road-1",
			"x10y15": "forest-2",
			"x11y15": "stone-1",
			"x0y16": "stone-1",
			"x1y16": "stone-1",
			"x2y16": "hill-1",
			"x3y16": "road-1",
			"x4y16": "terra-1",
			"x5y16": "stone-1",
			"x6y16": "hill-1",
			"x7y16": "forest-1",
			"x8y16": "stone-1",
			"x9y16": "road-1",
			"x10y16": "terra-1",
			"x11y16": "forest-2",
			"x0y17": "forest-1",
			"x1y17": "forest-1",
			"x2y17": "stone-1",
			"x3y17": "road-1",
			"x4y17": "hill-1",
			"x5y17": "terra-1",
			"x6y17": "terra-1",
			"x7y17": "stone-1",
			"x8y17": "terra-1",
			"x9y17": "road-1",
			"x10y17": "stone-1",
			"x11y17": "forest-1",
			"x0y18": "road-1",
			"x1y18": "road-1",
			"x2y18": "road-1",
			"x3y18": "road-1",
			"x4y18": "road-1",
			"x5y18": "road-1",
			"x6y18": "road-1",
			"x7y18": "road-1",
			"x8y18": "road-1",
			"x9y18": "road-1",
			"x10y18": "water-1",
			"x11y18": "water-1",
			"x0y19": "stone-1",
			"x1y19": "forest-1",
			"x2y19": "forest-2",
			"x3y19": "road-1",
			"x4y19": "stone-1",
			"x5y19": "forest-1",
			"x6y19": "hill-1",
			"x7y19": "terra-1",
			"x8y19": "stone-1",
			"x9y19": "forest-1",
			"x10y19": "water-1",
			"x11y19": "water-3"
		}
	};


}(window));