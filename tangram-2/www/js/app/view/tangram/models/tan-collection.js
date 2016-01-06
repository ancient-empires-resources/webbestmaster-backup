import Backbone from './../../../../lib/backbone';
import Tan from './tan';
import _ from './../../../../lib/lodash';
import device from './../../../../services/device';
import mediator from './../../../../services/mediator';
import log from './../../../../services/log';
import sha1 from './../../../../lib/sha1';

var tansInfo = {
	triangleBig: {
		count: 2,
		coordinates: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0.5, y: 0.5}],
		parts: 2
	},
	triangleMedium: {
		count: 1,
		coordinates: [{x: 0, y: 0.5}, {x: 0.5, y: 1}, {x: 0, y: 1}],
		parts: 2
	},
	triangleSmall: {
		count: 2,
		coordinates: [{x: 0.25, y: 0.25}, {x: 0.5, y: 0.5}, {x: 0.25, y: 0.75}],
		parts: 2
	},
	square: {
		count: 1,
		coordinates: [{x: 0.5, y: 0.5}, {x: 0.75, y: 0.75}, {x: 0.5, y: 1}, {x: 0.25, y: 0.75}],
		parts: 2
	},
	parallelogram: {
		count: 1,
		coordinates: [{x: 0, y: 0}, {x: 0.25, y: 0.25}, {x: 0.25, y: 0.75}, {x: 0, y: 0.5}],
		parts: 2
	}
};

var atomInfo = {
	coordinates: [{x: 0, y: 0}, {x: 0, y: 0.25}, {x: 0.25, y: 0}]
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

	initialize: function () {

		var collection = this;

		collection.bindEventListeners();

	},

	bindEventListeners: function () {

		var collection = this;

		mediator.installTo(collection);

		collection.subscribe('deviceAction:isActive', collection.activateDeActiveTans);
		collection.subscribe('deviceAction:dblTap', collection.flipTan);

		collection.subscribe('tan:align', collection.align);

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

			tangramAtoms = collection.getTangramAtoms(),
			answerAtoms = collection.getAnswerAtoms();

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
				(Math.round( (xya[0] - minX) * 1e8 ) / 1e8) || 0,
				(Math.round( (xya[1] - minY) * 1e8 ) / 1e8) || 0,
				xya[2]
			];
		});

	},

	getAnswerAtoms: function () {

	},

	saveAtoms: function () {

		var collection = this,
			tangramAtoms = collection.getTangramAtoms(),
			tangramAtomsStr = JSON.stringify(tangramAtoms),
			tangramHash = sha1.hash(tangramAtomsStr).slice(0, 6),
			tangramName = $('.js-saved-atoms-name').val().trim(),
			result = JSON.stringify({ name: tangramName, hash: tangramHash, data: tangramAtoms });

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
			alignData = collection.getAlignData(data),
			maxAlignPath = collection.getData('maxAlignPath');

		if (alignData.pathSize > maxAlignPath) {
			return;
		}

		tan.move({
			dx: alignData.otherX - alignData.alignX,
			dy: alignData.otherY - alignData.alignY
		});

		collection.publish('rotater:moveTo', tan.getCenterCoordinates());

	},

	getAlignData: function (data) {

		var collection = this,
			alignTan = data.tan,
			alignTanCoordinates = alignTan.getAlignCoordinates(),
			align = {},
			minPath = Infinity,
			otherTansCoordinates = [],
			pow = Math.pow.bind(Math);

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
					type: key
				});
			}
		}, this);

	},

	createDrawElement: function () {

		// device
		var collection = this,
			width = device.get('width'),
			height = device.get('height'),
			svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
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

		$node.append(this.createDrawElement());

	},

	drawTans: function () {

		var svg = this.getData('draw-node');

		this.each(function (tan) {
			tan.drawTo(svg);
		});

	},

	initPattern: function (pattern) {









	}

});

export default TanCollection;