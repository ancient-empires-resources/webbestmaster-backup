import Backbone from './../../../../lib/backbone';
import mediator from './../../../../services/mediator';

var Tan = Backbone.Model.extend({

	styles: {
		fill: '#c00',
		stroke: '#0c0',
		'stroke-width': 0.02
	},

	activeStyles: {
		fill: '#0c0',
		stroke: '#c00',
		'stroke-width': 0.02
	},

	nodeAttributes: {
		'stroke-linejoin': 'round',
		'stroke-alignment': 'center'
	},

	setBy: function (key, deltaValue) {

		var tan = this;

		return tan.set(key, tan.get(key) + deltaValue);

	},

	initialize: function () {

		var tan = this;

		tan.initCoordinates();

		tan.bindEventListeners();

	},

	setLastAccept: function () {
		return this.set('last-accept', Date.now());
	},

	getLastAccept: function () {
		return this.get('last-accept');
	},

	initCoordinates: function () {

		var tan = this,
			scale = tan.get('scale'),
			maxX = -Infinity,
			maxY = -Infinity,
			minX = Infinity,
			minY = Infinity,
			sizeX,
			sizeY,
			halfSizeX,
			halfSizeY,
			rotateOriginX,
			rotateOriginY,
			coordinates = tan.get('coordinates');

		// push init coordinates to real tan coordinates
		tan.set('coordinates', coordinates.map(function (xy) {

			var x = xy.x * scale,
				y = xy.y * scale;

			maxX = x > maxX ? x : maxX;
			maxY = y > maxY ? y : maxY;
			minX = x < minX ? x : minX;
			minY = y < minY ? y : minY;

			return { x: x, y: y };

		}));

		sizeX = maxX - minX;
		sizeY = maxY - minY;

		halfSizeX = sizeX / 2;
		halfSizeY = sizeY / 2;

		rotateOriginX = minX + halfSizeX;
		rotateOriginY = minY + halfSizeY;

		tan.set({
			maxX: maxX,
			maxY: maxY,
			//centerX: minX + halfSizeX,
			//centerY: minY + halfSizeY,
			minX: minX,
			minY: minY,
			sizeX: sizeX,
			sizeY: sizeY,
			halfSizeX: halfSizeX,
			halfSizeY: halfSizeY,
			dx: 0,
			dy: 0,
			rotate: 0,
			rotateOriginX: rotateOriginX,
			rotateOriginY: rotateOriginY,
			isFlip: false
		});

	},

	bindEventListeners: function () {

		var tan = this;

		mediator.installTo(tan);

		tan.on('change:isActive', tan.setStateActiveDeActive);

		tan.subscribe('deviceAction:moving', tan.move);

	},

	move: function (data) {

		var tan = this;

		if (!tan.get('isActive')) {
			return;
		}

		var	dx = data.dx,
			dy = data.dy;

		tan.setBy('dx', data.dx);
		tan.setBy('dy', data.dy);

		//_.each(coordinates, function (xy) {
		//	xy.x += dx;
		//	xy.y += dy;
		//});
		//
		//tan.setCoordinates(coordinates);

		tan.reDraw();

	},

	setStateActiveDeActive: function (self, isActive) {

		var tan = this;

		tan.drawActiveDeActive(isActive);

		tan.moveToUpDown(isActive)

	},

	drawActiveDeActive: function (isActive) {

		var tan = this;

		tan.setStyles(isActive && tan.activeStyles);

	},

	moveToUpDown: function (isActive) {

		if (!isActive) {
			return;
		}

		var node = this.get('node');

		node.parentElement.appendChild(node);

	},

	getCoordinates: function () {

		var tan = this,
			coordinates = tan.get('coordinates'),
			dx = tan.get('dx'),
			dy = tan.get('dy'),
			rotate = tan.get('rotate'),
			isFlip = tan.get('isFlip');

		return coordinates.map(function (xy) {
			return {
				x: xy.x + dx,
				y: xy.y + dy
			}
		});

	},

/*
	setCoordinates: function (coordinates) {

		var tan = this;

		_.each(coordinates, function (xy, i) {
			tan.set('x' + i, xy.x);
			tan.set('y' + i, xy.y);
		});

		return tan;

	},
*/

	drawTo: function (drawNode) {

		var tan = this,
			tanNode = tan.get('node'),
			polygonCoordinates = tan.getInitialPolygonCoordinates();

		if (!tanNode) {
			tanNode = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
			tan.set('node', tanNode);
			tan.setStyles();
			drawNode.appendChild(tanNode);
		}

		tanNode.setAttribute('points', polygonCoordinates);

	},

	reDraw: function () {

		var tan = this,
			tanNode = tan.get('node'),
			transformation = tan.getTransform().attribute;

		tanNode.setAttribute('transform', transformation);

	},

	getTransform: function () {

		var tan = this,
			rotate = tan.get('rotate'),
			rotateOriginX = tan.get('rotateOriginX'),
			rotateOriginY = tan.get('rotateOriginY'),
			dx = tan.get('dx'),
			flipDx,
			dy = tan.get('dy'),
			isFlip = tan.get('isFlip'),
			translateSrt = 'translate(dx,dy)',
			rotateSrt = 'rotate(angle rotateOriginX rotateOriginY)',
			scaleStr = 'scale(-1,1)',
			attribute = [];

		if (isFlip || 1) {
			flipDx = -2 * tan.get('minX') - dx - tan.get('sizeX');
			attribute.push(scaleStr);
			attribute.push(
				translateSrt
					.replace('dx', flipDx)
					.replace('dy', dy)
			);
		} else {
			attribute.push(
				translateSrt
					.replace('dx', dx)
					.replace('dy', dy)
			);
		}

		attribute.push(
			rotateSrt
				.replace('angle', rotate)
				.replace('rotateOriginX', rotateOriginX)
				.replace('rotateOriginY', rotateOriginY)
		);

		return {
			data: {
				dx: dx,
				dy: dy,
				rotate: rotate,
				isFlip: isFlip,
				flipDx: flipDx
			},
			attribute: attribute.join(' ')
		}

	},

	setStyles: function (stylesArg) {

		var tan = this,
			node = tan.get('node'),
			styles = stylesArg || tan.styles,
			nodeAttributes = tan.nodeAttributes,
			styleStr = '',
			attr = document.createAttribute('style');

		Object.keys(styles).forEach(function (key) {
			var value = (key === 'stroke-width') ? styles[key] * tan.get('scale') : styles[key];
			styleStr += key + ':' + value + ';';
		});

		attr.value = styleStr;
		node.setAttributeNode(attr);

		Object.keys(nodeAttributes).forEach(function (key) {
			var attr = document.createAttribute(key);
			attr.value = nodeAttributes[key];
			node.setAttributeNode(attr);
		});

	},

	getInitialPolygonCoordinates: function () {

		var tan = this,
			scale = tan.get('scale');

		return tan.get('coordinates').map(function (xy) {
			return xy.x + ',' + xy.y;
		}).join(' ');

	},

	isIn: function (xy) {

		var tan = this,
			coordinates = tan.getCoordinates(),
			anglesLength = coordinates.length;

		if (anglesLength === 3) {
			return tan.isInTriangle.apply(tan, coordinates.concat([xy]));
		}

		if (anglesLength === 4) {
			return tan.isInFourangle.apply(tan, coordinates.concat([xy]));
		}

	},

	// x0, y0 - point coordinates

	isInTriangle: function (xy1, xy2, xy3, xy0) {

		var a, b, c,
			x1 = xy1.x,
			y1 = xy1.y,
			x2 = xy2.x,
			y2 = xy2.y,
			x3 = xy3.x,
			y3 = xy3.y,
			x0 = xy0.x,
			y0 = xy0.y;

		a = (x1 - x0) * (y2 - y1) - (x2 - x1) * (y1 - y0);
		b = (x2 - x0) * (y3 - y2) - (x3 - x2) * (y2 - y0);
		c = (x3 - x0) * (y1 - y3) - (x1 - x3) * (y3 - y0);

		return (a >= 0 && b >= 0 && c >= 0) || (a <= 0 && b <= 0 && c <= 0);

	},

	isInFourangle: function (xy1, xy2, xy3, xy4, xy0) {

		var tan = this;

		return tan.isInTriangle(xy1, xy2, xy3, xy0) || tan.isInTriangle(xy3, xy4, xy1, xy0);

	}

});

export default Tan;