'use strict';
/*global window */

import Backbone from './../../../../lib/backbone';
import Tan from './tan';
import _ from './../../../../lib/lodash';
import device from './../../../../services/device';
import mediator from './../../../../services/mediator';
import log from './../../../../services/log';
import sha1 from './../../../../lib/sha1';
import info from './../../../../services/info';
import TangramSuccessfulView from './../../tangram-successful/tangram-successful-view';

var tansInfo = {
	'triangleBig-1': {
		count: 1,
		coordinates: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0.5, y: 0.5}],
		parts: 2,
		type: 'triangle-big'
	},
	'triangleBig-2': {
		count: 1,
		coordinates: [{x: 0.5, y: 0.5}, {x: 1, y: 0}, {x: 1, y: 1}],
		parts: 2,
		type: 'triangle-big'
	},
	'triangleMedium': {
		count: 1,
		coordinates: [{x: 0.5, y: 0}, {x: 0.5 + 0.5 / Math.SQRT2, y: 0.5 / Math.SQRT2}, {x: 0.5 - 0.5 / Math.SQRT2, y: 0.5 / Math.SQRT2}],
		parts: 2,
		type: 'triangle-medium',
		patternId: 'triangle-medium-pattern'
	},
	'triangleSmall-1': {
		count: 1,
		coordinates: [{x: 0.25, y: 0.25}, {x: 0.5, y: 0.5}, {x: 0.25, y: 0.75}],
		parts: 2,
		type: 'triangle-small'
	},
	'triangleSmall-2': {
		count: 1,
		coordinates: [{x: 0.75, y: 0.75}, {x: 1, y: 1}, {x: 0.5, y: 1}],
		parts: 2,
		type: 'triangle-small'
	},
	'square': {
		count: 1,
		coordinates: [{x: 0.5, y: 0.5}, {x: 0.75, y: 0.75}, {x: 0.5, y: 1}, {x: 0.25, y: 0.75}],
		parts: 2,
		type: 'square'
	},
	'parallelogram': {
		count: 1,
		coordinates: [{x: 0, y: 0}, {x: 0.25, y: 0.25}, {x: 0.25, y: 0.75}, {x: 0, y: 0.5}],
		parts: 2,
		type: 'parallelogram'
	}
};

var atomInfo = {
	sideSize: 0.25
};

var patternInfo = {
	polygon: {
		styles: {
			fill: '#333',
			stroke: '#333',
			'stroke-width': '2px'
		},
		attributes: {
			'stroke-linejoin': 'round',
			'stroke-alignment': 'center'
		}
	}
};

var TanCollection = Backbone.Collection.extend({

	model: Tan,

	attr: {},

	setData: function (keyOrObj, value) {

		var self = this,
			attr = self.attr;

		if (typeof keyOrObj === 'string') {
			attr[keyOrObj] = value;
			return self;
		}

		Object.keys(keyOrObj).forEach(function (key) {
			this[key] = keyOrObj[key];
		}, attr);

		return self;

	},

	getData: function (key) {

		return this.attr[key];

	},

	emptyData: function () {

		this.attr = {};

		return this;

	},

	initialize: function () {

		var collection = this;

		collection.bindEventListeners();

	},

	bindEventListeners: function () {

		var collection = this;

		mediator.installTo(collection);

		collection.subscribe('deviceAction:isActive', collection.activateDeActiveTans);
		collection.subscribe('deviceAction:dblTap', function (data) {
			collection.flipTan(data);
			collection.checkTangram();
		});

		collection.subscribe('tan-collection:align', collection.align);
		collection.subscribe('tan-collection:saveAtoms', collection.saveAtoms);

	},

	activateDeActiveTans: function (isActive, data) {

		var collection = this,
			hoveredTan = collection.getHoveredTan(data),
			rotater = collection.getData('rotater'),
			isInRingRotater = rotater.isInRing(data);

		collection.deActiveAll();

		if (isActive) {

			if (isInRingRotater) {

				rotater.setStartData(data);

			} else {

				rotater.deActivate();
				if (hoveredTan) {
					hoveredTan.set('isActive', true);
					collection.setData('lastActiveTan', hoveredTan);
				} else {


				}


			}


		} else {

			// stop rotating if needed

			if (rotater.get('isActive')) {

				rotater.endRotating();

			} else {

				if (hoveredTan) {
					collection.align({tan: hoveredTan});
					rotater.connectTan({
						tan: hoveredTan
					});
				}

			}

			collection.checkTangram();

		}

	},

	checkTangram: function () {

		var collection = this,
			tangramAtoms = collection.prepareToEquals(collection.getTangramAtoms()),
			answerAtoms = collection.prepareToEquals(collection.getAnswerAtoms()),
			isDone;



		isDone = tangramAtoms.every(function (atomStr) {

			if (answerAtoms.indexOf(atomStr) === -1) {
				log(answerAtoms);
				log(atomStr);
			}

			return answerAtoms.indexOf(atomStr) !== -1;
		});

		if (!isDone) {
			return;
		}

		log('tangram is DONE');

		collection.unsubscribe('deviceAction:isActive');
		collection.unsubscribe('deviceAction:dblTap');
		collection.publish('rotater:deActivate');
		collection.deActiveAll();
		collection.setData('success-view', new TangramSuccessfulView(collection.getData('tangram-info')));

	},

	prepareToEquals: function (arrAtoms) {

		var strictNumber = this.strictNumber;

		return arrAtoms
			.map(function (atom) {
				return [
					strictNumber(atom[0]),
					strictNumber(atom[1]),
					atom[2]
				];

			})
			.map(JSON.stringify);

	},

	strictNumber: function (number) {
		return parseFloat(String(number).slice(0, 6));
	},

	getTangramAtoms: function () {

		var collection = this,
			tangramAtoms = [],
			minX = Infinity,
			minY = Infinity;

		collection.each(function (tan) {
			tangramAtoms = tangramAtoms.concat(tan.getAtoms());
		});

		tangramAtoms.forEach(function (xya) {

			var x = xya[0],
				y = xya[1];

			if (x < minX) {
				minX = x;
			}

			if (y < minY) {
				minY = y;
			}

		});

		return tangramAtoms.map(function (xya) {
			return [
				(Math.round((xya[0] - minX) * 1e6) / 1e6) || 0,
				(Math.round((xya[1] - minY) * 1e6) / 1e6) || 0,
				xya[2]
			];
		});

	},

	getAnswerAtoms: function () {

		return this.getData('pattern');

	},

	saveAtoms: function () {

		var collection = this,
			tangramAtoms = collection.getTangramAtoms(),
			tangramAtomsStr = JSON.stringify(tangramAtoms),
			tangramHash = sha1.hash(tangramAtomsStr).slice(0, 6),
			tangramName = $('.js-saved-atoms-name').val().trim(),
			result = JSON.stringify({name: tangramName, hash: tangramHash, data: tangramAtoms});

		console.log(result);

	},

	flipTan: function (data) {

		var collection = this,
			rotater = collection.getData('rotater'),
			hoveredTan = collection.getHoveredTan(data);

		return hoveredTan && rotater.get('tan') === hoveredTan && hoveredTan.flip();

	},

	align: function (data) {

		var collection = this,
			tan = data.tan,
			alignData,
			maxAlignPath = collection.getData('maxAlignPath');

		collection.moveToBox(tan);

		alignData = collection.getAlignData(data);

		if (alignData.pathSize > maxAlignPath) {
			return;
		}

		tan.move({
			dx: alignData.otherX - alignData.alignX,
			dy: alignData.otherY - alignData.alignY
		});

		collection.publish('rotater:moveTo', tan.getCenterCoordinates());

	},

	moveToBox: function (tan) {

		var fontSize = info.get('remSize', true),
			collection = this,
			maxX = collection.getData('maxX'),
			maxY = collection.getData('maxY'),
			minX = collection.getData('minX'),
			minY = collection.getData('minY') + fontSize * 1.5,
			dx = undefined,
			dy = undefined,
			coordinates = tan.getCoordinates();

		coordinates.forEach(function (xy) {

			var x = xy.x,
				y = xy.y;

			if (x > maxX) {
				dx = x - maxX;
			}

			if (y > maxY) {
				dy = y - maxY;
			}

			if (x < minX) {
				dx = x - minX;
			}

			if (y < minY) {
				dy = y - minY;
			}

		});

		if (dx || dy) {
			tan.move({
				dx: -dx || 0,
				dy: -dy || 0
			});
		}

	},

	getAlignData: function (data) {

		var collection = this,
			alignTan = data.tan,
			alignTanCoordinates = alignTan.getAlignCoordinates(),
			initedPattern = collection.getData('initedPattern'),
			initedPatternAlignPoints = collection.getInitedPatternAlignPoints(),
			align = {},
			minPath = Infinity,
			otherTansCoordinates = [],
			pow = Math.pow.bind(Math);

		if (info.get('gameDifficult') === 'regular') {
			otherTansCoordinates = otherTansCoordinates.concat(initedPatternAlignPoints);
		}

		collection.each(function (tan) {
			if (tan === alignTan) {
				return;
			}
			otherTansCoordinates = otherTansCoordinates.concat(tan.getAlignCoordinates());
		});

		otherTansCoordinates.forEach(function (otherXY) {

			alignTanCoordinates.forEach(function (alignXY) {

				var otherX = otherXY.x,
					otherY = otherXY.y,
					alignX = alignXY.x,
					alignY = alignXY.y,
					curPath = pow(otherX - alignX, 2) + pow(otherY - alignY, 2);

				if (curPath > minPath) {
					return;
				}

				minPath = curPath;

				align = {
					otherX: otherX,
					otherY: otherY,
					alignX: alignX,
					alignY: alignY,
					pathSize: Math.sqrt(minPath)
				}

			});

		});

		return align;

	},

	getInitedPatternAlignPoints: function () {
		return this.getData('patternAlignPoints')
	},

	getHoveredTan: function (xy) {

		var collection = this,
			hoveredTan = false;

		collection.each(function (tan) {

			// touch XY is not in tan
			if (!tan.isIn(xy)) {
				return;
			}

			if (!hoveredTan) {
				return hoveredTan = tan;
			}

			if (tan.getLastAccept() > hoveredTan.getLastAccept()) {
				hoveredTan = tan;
			}

		});

		return hoveredTan;

	},

	deActiveAll: function () {

		this.each(function (tan) {
			tan.set('isActive', false);
			tan.drawActiveDeActive(false);
		});

	},

	setScale: function (scale) {
		this.setData('maxAlignPath', scale / 10);
		this.setData('scale', scale);
	},

	createTans: function () {

		_.each(tansInfo, function (data, key) {
			for (var i = 0, len = data.count; i < len; i += 1) {
				this.add({
					coordinates: data.coordinates,
					parts: data.parts,
					count: len,
					scale: this.getData('scale'),
					type: data.type,
					patternId: data.patternId || null,
					key: key
				});
			}
		}, this);

	},

	createDrawElement: function ($node) {

		// device
		var collection = this,
			width = device.get('width'),
			height = device.get('height'),
		//svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			svg = $node.find('svg')[0],
			attributes = {
				x: '0px',
				y: '0px',
				width: width + 'px',
				height: height + 'px',
				viewBox: [0, 0, width, height].join(' ')
			};

		Object.keys(attributes).forEach(function (key) {
			var attr = document.createAttribute(key);
			attr.value = attributes[key];
			svg.setAttributeNode(attr);
		});

		collection.setData('draw-node', svg);

		return svg;

	},

	addDrawFieldTo: function ($node) {

		//$node.append(this.createDrawElement($node));
		this.createDrawElement($node);

	},

	drawTans: function () {

		var svg = this.getData('draw-node');

		this.each(function (tan) {
			tan.drawTo(svg);
		});

	},

	initPattern: function (pattern) {

		var collection = this,
			atomToTriangle = collection.atomToTriangle,
			scale = collection.getData('scale'),
			triangles = pattern.data,
			patternDeltaX,
			patternDeltaY,
			viewSizeX = collection.getData('sizeX'),
			viewSizeY = collection.getData('sizeY'),
			patternMaxX = -Infinity,
			patternMaxY = -Infinity,
			alignPoints = [];

		collection.setData('pattern', triangles);

		triangles = triangles.map(function (atom) {
			return atomToTriangle(atom, scale);
		});

		triangles.forEach(function (triangle) {

			var rightAngle = triangle[0],
				x = rightAngle.x,
				y = rightAngle.y;

			if (x > patternMaxX) {
				patternMaxX = x;
			}

			if (y > patternMaxY) {
				patternMaxY = y;
			}

		});

		patternDeltaX = Math.round((viewSizeX - patternMaxX) / 2);
		patternDeltaY = Math.round((viewSizeY - patternMaxY) / 2);

		collection.setData({
			patternDeltaX: patternDeltaX,
			patternDeltaY: patternDeltaY
		});

		triangles = triangles.map(function (triangle) {
			return triangle.map(function (xy, index) {

				var x = xy.x + patternDeltaX,
					y = xy.y + patternDeltaY;

				// add to align point big side only
				if (index) {
					alignPoints.push({
						x: x,
						y: y
					});
				}

				return {
					x: x,
					y: y
				}
			});
		});

		collection.setData('patternAlignPoints', alignPoints);
		collection.setData('initedPattern', triangles);

	},

	drawPattern: function () {

		// TODO: difficult hard
		var collection = this,
			coordinatesToPolygon = collection.coordinatesToPolygon.bind(collection),
			pattern = collection.getData('initedPattern'),
			width = collection.getData('sizeX'),
			height = collection.getData('sizeY'),
			svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			attributes = {
				x: '0px',
				y: '0px',
				width: width + 'px',
				height: height + 'px',
				viewBox: [0, 0, width, height].join(' '),
				'class': 'tangram-pattern'
			};

		if (info.get('gameDifficult') !== 'regular') {
			attributes.viewBox = [0, 0, width * 3.5, height * 3.5].join(' ');
		}

		Object.keys(attributes).forEach(function (key) {
			var attr = document.createAttribute(key);
			attr.value = attributes[key];
			svg.setAttributeNode(attr);
		});

		pattern.forEach(function (triangle) {
			var polygon = coordinatesToPolygon(triangle);
			svg.appendChild(polygon);
		});

		return svg;

	},

	coordinatesToPolygon: function (coordinates, stylesArg) {

		var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon'),
			styles = stylesArg || patternInfo.polygon.styles,
			attributes = patternInfo.polygon.attributes,
			styleStr = '',
			attr = document.createAttribute('style');

		// set position
		polygon.setAttribute('points', coordinates.map(function (xy) {
			return xy.x + ',' + xy.y;
		}).join(' '));

		// set styles
		Object.keys(styles).forEach(function (key) {
			//var value = (key === 'stroke-width') ? styles[key] * collection.getData('scale') : styles[key];
			styleStr += key + ':' + styles[key] + ';';
		});

		attr.value = styleStr;
		polygon.setAttributeNode(attr);

		Object.keys(attributes).forEach(function (key) {
			var attr = document.createAttribute(key);
			attr.value = attributes[key];
			polygon.setAttributeNode(attr);
		});

		return polygon;

	},

	atomToTriangle: function (atom, scale) {

		var x = atom[0] * scale,
			y = atom[1] * scale,
			angleRight = atom[2] - 45,
			angleLeft = angleRight + 90,
			toRad = Math.PI / 180,
			sideSize = atomInfo.sideSize * scale;

		angleRight = angleRight * toRad;
		angleLeft = angleLeft * toRad;

		return [
			{
				x: x,
				y: y
			},
			{
				x: x - Math.cos(angleLeft) * sideSize,
				y: y - Math.sin(angleLeft) * sideSize
			},
			{
				x: x - Math.cos(angleRight) * sideSize,
				y: y - Math.sin(angleRight) * sideSize
			}
		];

	},

	destroy: function () {

		var collection = this,
			rotater = collection.getData('rotater'),
			tan;

		rotater.destroy();

		collection.unsubscribe();

		mediator.uninstallFrom(collection);

		collection.emptyData();

		tan = collection.first();
		while (tan) {
			tan.destroy();
			tan = collection.first();
		}

		collection.reset();

	}

});

export default TanCollection;