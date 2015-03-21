(function (win, doc) {

	// todo: bug - after resize on ios - smoke is wrong

	"use strict";
	/*global window, document, setTimeout, history, Image */
	/*global Backbone, $, templateMaster, APP, log, Mover */

	win.APP = win.APP || {};

	win.APP.BB = win.APP.BB || {};

	APP.BB.BattleView = APP.BB.BaseView.extend({

		events: {
			'click .js-end-turn': 'endTurn'
		},

		selectors: {
			mapImageWrapper: '.js-map-image-wrapper',
			moveAreaWrapper: '.js-move-area-wrapper',
			moveAreaContainer: '.js-move-area-container',
			eventHandlerWrapper: '.js-event-handler-wrapper',
			eventSquares: '.js-event-square',
			activeEventSquare: '.active-event-square',
			activeSquareMark: '.active-square-mark',
			buildingWrapper: '.js-building-wrapper',
			unitsWrapper: '.js-units-wrapper',
			unitWrapper: '.js-unit-wrapper',
			building: '.js-building',
			smokeWrapper: '.js-smoke-wrapper',
			viewDisable: '.js-view-disable',
			square: '.js-square'
		},

		initialize: function (data) {

			this.detectClickEvent();

			this.detectTransitionEndEventName();
			this.detectAnimationEndEventName();

			this.squareSize = {
				min: win.APP.util.defaultUnit,
				max: win.APP.util.defaultUnit * 9,
				default: win.APP.util.defaultUnit * 3
			};

			this.$el = $(this.tmpl.battle(data));

			this.proto.initialize.apply(this, arguments);

			// get map
			this.set('args', this.util.copyJSON(data));
			this.set('map', this.util.copyJSON(APP.maps[data.jsMapKey]));

			this.set('model', new win.APP.BB.BattleModel({
				view: this,
				args: this.get('args'),
				map: this.get('map')
			}));

			// set sizes
			this.setSize();

			// draw map
			this.drawMap();

			// draw buildings
			this.drawBuildings();

			// draw units
			this.drawUnits();

			// bind move area
			this.bindMoveArea();

			// 'draw' event listeners
			this.setEventHandlerListeners();

			log(data);

			this.bindEventListeners();

			this.render();

			// start game from model
			this.get('model').startGame();

		},

		detectTransitionEndEventName: function () {
			var i,
				el = document.createElement('div'),
				transitions = {
					'transition':'transitionend',
					'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
					'MozTransition':'transitionend',
					'WebkitTransition':'webkitTransitionEnd'
				},
				transitionEnd = 'transitionend';

			for (i in transitions) {
				if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
					transitionEnd = transitions[i];
				}
			}

			this.set('transitionEnd', transitionEnd);

		},

		detectAnimationEndEventName: function () {
			var i,
				el = document.createElement('div'),
				animations = {
					'animation':'animationend',
					'OAnimation':'oAnimationEnd',  // oAnimationEnd in very old Opera
					'MozAnimation':'animationend',
					'WebkitAnimation':'webkitAnimationEnd'
				},
				animationEnd = 'animationend';

			for (i in animations) {
				if (animations.hasOwnProperty(i) && el.style[i] !== undefined) {
					animationEnd = animations[i];
				}
			}

			this.set('animationEnd', animationEnd);

		},

		disable: function () {
			this.$el.find(this.selectors.viewDisable).removeClass('hidden');
		},

		enable: function () {
			this.$el.find(this.selectors.viewDisable).addClass('hidden');
		},

		onClick: function (xy) {

			this.markActiveSquare(xy);

			// 0 - show unit available attack (using available path) - hold or dblclick
			// 1 - show unit info in popup - hold or dblclick
			// 5 - show available path - only for player unit - click

			this.get('model').click(xy);

		},

		endTurn: function () {
			this.get('model').newTurn();
			this.removeActiveSquare();
			this.clearAvailableActions();
		},

		markActiveSquare: function (xy) {

			var selectorActiveEventSquare = this.selectors.activeEventSquare,
				classNameActiveEventSquare = this.classNames.activeEventSquare,
				selectorActiveSquareMark = this.selectors.activeSquareMark,
				classNameActiveSquareMark = this.classNames.activeSquareMark,
				$activeSquare = this.$el.find(this.selectors.eventSquares + selectorActiveEventSquare),
				$newActiveSquare = this.$el.find(this.selectors.eventSquares + '[data-xy="x' + xy.x + 'y' + xy.y + '"]');

			$activeSquare.removeClass(classNameActiveEventSquare).find(selectorActiveSquareMark).remove();
			$newActiveSquare.addClass(classNameActiveEventSquare).append('<div class="' + classNameActiveSquareMark + '">&nbsp;</div>');

		},

		showAvailableActions: function (actions) {

			var view = this;

			view.clearAvailableActions();

			if ( actions.availablePathViewWithTeamUnit ) {
				view.showAvailablePathViewWithTeamUnit(actions.availablePathViewWithTeamUnit);
			}

			if ( actions.confirmMoveAction ) {
				view.showConfirmMoveAction(actions.confirmMoveAction);
			}

			if ( actions.unitsUnderAttack ) {
				view.showUnitsUnderAttack(actions.unitsUnderAttack);
			}

			if ( actions.confirmAttackAction ) {
				view.showConfirmAttackAction(actions.confirmAttackAction);
			}

			if ( actions.gravesToRise ) {
				view.showGravesToRise(actions.gravesToRise);
			}

		},

		showAvailablePathViewWithTeamUnit: function (path) {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);

			_.each(path, function (xy) {
				$eventWrapper.find('[data-xy="x' + xy.x + 'y' + xy.y + '"]').addClass('show-available-path');
			}, this);

		},

		hideAvailablePathViewWithTeamUnit: function () {
			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);
			$eventWrapper.find('.show-available-path').each(function () {
				$(this).removeClass('show-available-path');
			});
		},

		showConfirmMoveAction: function (confirmMoveAction) {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper),
				x = confirmMoveAction.x,
				y = confirmMoveAction.y;

			$eventWrapper.find('[data-xy="x' + x + 'y' + y + '"]').addClass('show-confirm-move');

		},

		hideConfirmMoveAction: function () {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);

			$eventWrapper.find('.show-confirm-move').removeClass('show-confirm-move');

		},

		showUnitsUnderAttack: function (unitsUnderAttack) {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);

			_.each(unitsUnderAttack, function (xy) {
				$eventWrapper.find('[data-xy="x' + xy.x + 'y' + xy.y + '"]').addClass('show-unit-under-attack');
			}, this);

		},

		hideUnitsUnderAttack: function () {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);
			$eventWrapper.find('.show-unit-under-attack').each(function () {
				$(this).removeClass('show-unit-under-attack');
			});

		},

		showConfirmAttackAction: function (confirmAttackAction) {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper),
				x = confirmAttackAction.x,
				y = confirmAttackAction.y;

			$eventWrapper.find('[data-xy="x' + x + 'y' + y + '"]').addClass('show-confirm-attack');

		},

		hideConfirmAttackAction: function () {

			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);
			$eventWrapper.find('.show-confirm-attack').removeClass('show-confirm-attack');

		},

		showGravesToRise: function (graves) {

			var view = this,
				$eventWrapper = view.$el.find(view.selectors.eventHandlerWrapper);

			_.each(graves, function (xy) {
				var x = xy.x,
					y = xy.y;
				$eventWrapper.find('[data-xy="x' + x + 'y' + y + '"]').addClass('show-raise-skeleton');
			});

		},

		hideGravesToRise: function () {
			var $eventWrapper = this.$el.find(this.selectors.eventHandlerWrapper);
			$eventWrapper.find('.show-raise-skeleton').removeClass('show-raise-skeleton');
		},

		clearAvailableActions: function () {
			this.hideAvailablePathViewWithTeamUnit();
			this.hideConfirmMoveAction();
			this.hideUnitsUnderAttack();
			this.hideConfirmAttackAction();
			this.hideGravesToRise();
		},

		removeActiveSquare: function () {
			// this.classNames.eventSquares
			var selectorActiveEventSquare = this.selectors.activeEventSquare,
				selectorActiveSquareMark = this.selectors.activeSquareMark,
				classNameActiveEventSquare = this.classNames.activeEventSquare,
				$activeSquare = this.$el.find(this.selectors.eventSquares + selectorActiveEventSquare);

			$activeSquare.removeClass(classNameActiveEventSquare).find(selectorActiveSquareMark).remove();

		},

		bindEventListeners: function () {
			var device = win.APP.device;
			this.listenTo(device, 'resize', this.onResize);
		},

		unbindEventListeners: function () {
			this.stopListening();
			this.get('mover').unbindEventListeners();
		},

		onResize: function () {

			var mover = this.get('mover');
			mover.detectSizes();
			mover.detectEdgePositions();
			mover.onResizeCheckState();

		},

		setEventHandlerListeners: function () {

			var squareSize = this.info.get('squareSize'),
				$eventHandlerWrapper = this.$el.find(this.selectors.eventHandlerWrapper),
				map = this.get('map'),
				pre = this.info.get('pre', true).css,
				template = this.tmpl['event-handler'],
				resultArr = [],
				x, y, xLen, yLen;

			for (x = 0, xLen = map.size.width; x < xLen; x += 1) {
				for (y = 0, yLen = map.size.height; y < yLen; y += 1) {
					resultArr.push(template({
							x: x,
							y: y,
							squareSize: squareSize,
							pre: pre
						})
					);
				}
			}

			$eventHandlerWrapper.html(resultArr.join(''));

		},

		drawMap: function () {

			var $mapImageWrapper = this.$el.find(this.selectors.mapImageWrapper),
				canvas = $mapImageWrapper.get(0),
				ctx = canvas.getContext('2d'),
				getXYFromStringXY = this.util.getXYFromStringXY,
				xyStr = this.util.getStringFromXY,
				map = this.get('map'),
				squareSize = this.info.get('squareSize'),
				squareSizeX2,
				mapTiles = win.APP.mapTiles,
				terrains = map.terrain,
				angleTypes = ['road', 'water'],
				reBridge = /^bridge\-\d+$/;

			squareSize = Math.max(squareSize, Math.round(this.squareSize.max * 0.66) ); // set max
			squareSize = Math.min(squareSize, this.squareSize.min * 2); // and min square

			if ( this.info.get('isIOS', true) ) {
				squareSize = 24; // see tiles image size
			}

			squareSizeX2 = squareSize * 2;

			canvas.width = map.size.width * 2 * squareSize;
			canvas.height = map.size.height * 2 * squareSize;

			// reduce blur
			ctx.webkitImageSmoothingEnabled = false;
			ctx.mozImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false; // future

			// draw main tiles
			_.each(terrains, function (value, xy) {
				xy = getXYFromStringXY(xy);
				ctx.drawImage(mapTiles[value].img, xy.x * squareSizeX2, xy.y * squareSizeX2, squareSizeX2, squareSizeX2);
			});

			// draw angles road
			angleTypes.forEach(function (type) {

				var re = new RegExp('^(' + type +'|bridge)\\-' + '\\d+$');

				_.each(terrains, function (value, xy) {

					if ( !re.test(value) || reBridge.test(value) ) {
						return;
					}

					xy = getXYFromStringXY(xy);

					var x = xy.x,
						y = xy.y,
						xl = x - 1,
						xr = x + 1,
						yu = y - 1,
						yd = y + 1,
						xSquareSizeX2 = x * squareSizeX2,
						ySquareSizeX2 = y * squareSizeX2,
						xSquareSizeX2Half = xSquareSizeX2 + squareSize,
						ySquareSizeX2Half = ySquareSizeX2 + squareSize,
						t1 = re.test(terrains[xyStr(xl, yu)] || value),
						t2 = re.test(terrains[xyStr(x, yu)] || value),
						t3 = re.test(terrains[xyStr(xr, yu)] || value),
						t4 = re.test(terrains[xyStr(xl, y)] || value),
						t6 = re.test(terrains[xyStr(xr, y)] || value),
						t7 = re.test(terrains[xyStr(xl, yd)] || value),
						t8 = re.test(terrains[xyStr(x, yd)] || value),
						t9 = re.test(terrains[xyStr(xr, yd)] || value);

					// draw 2, 4, 6, 8
					if ( !t2 ) { // up is different type
						ctx.drawImage(mapTiles['a-' + type + '-2'].img, xSquareSizeX2, ySquareSizeX2, squareSizeX2, squareSize);
					}

					if ( !t4 ) {
						ctx.drawImage(mapTiles['a-' + type + '-4'].img, xSquareSizeX2, ySquareSizeX2, squareSize, squareSizeX2);
					}

					if ( !t6 ) {
						ctx.drawImage(mapTiles['a-' + type + '-6'].img, xSquareSizeX2Half, ySquareSizeX2, squareSize, squareSizeX2);
					}

					if ( !t8 ) {
						ctx.drawImage(mapTiles['a-' + type + '-8'].img, xSquareSizeX2, ySquareSizeX2Half, squareSizeX2, squareSize);
					}

					// draw 1, 3, 7, 9 - normal
					if ( !t1 && !t2 && !t4 ) {
						ctx.drawImage(mapTiles['a-' + type + '-1'].img, xSquareSizeX2, ySquareSizeX2, squareSize, squareSize);
					}

					if ( !t3 && !t2 && !t6 ) {
						ctx.drawImage(mapTiles['a-' + type + '-3'].img, xSquareSizeX2Half, ySquareSizeX2, squareSize, squareSize);
					}

					if ( !t7 && !t4 && !t8 ) {
						ctx.drawImage(mapTiles['a-' + type + '-7'].img, xSquareSizeX2, ySquareSizeX2Half, squareSize, squareSize);
					}

					if ( !t9 && !t6 && !t8 ) {
						ctx.drawImage(mapTiles['a-' + type + '-9'].img, xSquareSizeX2Half, ySquareSizeX2Half, squareSize, squareSize);
					}

					// draw 1, 3, 7, 9 - small
					if ( t2 && t4 && !t1 ) {
						ctx.drawImage(mapTiles['a-' + type + '-1-s'].img, xSquareSizeX2, ySquareSizeX2, squareSize, squareSize);
					}

					if ( t2 && t6 && !t3 ) {
						ctx.drawImage(mapTiles['a-' + type + '-3-s'].img, xSquareSizeX2Half, ySquareSizeX2, squareSize, squareSize);
					}

					if ( t4 && t8 && !t7 ) {
						ctx.drawImage(mapTiles['a-' + type + '-7-s'].img, xSquareSizeX2, ySquareSizeX2Half, squareSize, squareSize);
					}

					if ( t6 && t8 && !t9 ) {
						ctx.drawImage(mapTiles['a-' + type + '-9-s'].img, xSquareSizeX2Half, ySquareSizeX2Half, squareSize, squareSize);
					}

				});

			});

		},

		drawBuildings: function () {
			var model = this.get('model');
			model.appendBuildings();
		},

		appendBuilding: function (building) {

			var $node = $('<div>&nbsp;</div>'),
				x = building.x,
				y = building.y,
				dY = building.type === 'castle' ? -1 : 0,
				squareSize = this.info.get('squareSize'),
				height = squareSize - squareSize * dY,
				width = squareSize,
				pre = this.info.get('pre', true).css,
				$wrapper = this.$el.find(this.selectors.buildingWrapper);

			$node.attr('data-xy', 'x' + x + 'y' + y).attr('data-x', x).attr('data-y', y).attr('data-type', building.type);

			$node.addClass('building').addClass('js-building');

			if (building.state === 'normal') {
				$node.addClass( 'building-' + building.type + '-' + building.color );
			}

			if (building.state === 'destroyed') {
				$node.addClass( 'building-' + building.type + '-destroyed' );
			}

			x = x * squareSize;
			y = (y + dY) * squareSize;

			$node.css(pre + 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');

			$node.css({
				height: height + 'px',
				width: width + 'px'
			});

			if (building.type === 'farm' && building.hasOwnProperty('ownerId')) {
				//$node.html('<div class="building-smoke"></div>');
				this.addSmokeToBuilding(building);
			}

			$wrapper.append($node);

		},

		addSmokeToBuilding: function (building) {

			var x = building.x,
				y = building.y,
				pre = this.info.get('pre', true).css,
				squareSize = this.info.get('squareSize'),
				$wrapper = this.$el.find(this.selectors.smokeWrapper),
				$smokeContainer = $('<div class="smoke-container square js-square"><div class="building-smoke">&nbsp;</div></div>');

			$smokeContainer.attr('data-xy', 'x' + x + 'y' + y).attr('data-x', x).attr('data-y', y);

			x *= squareSize;
			y *= squareSize;

			$smokeContainer
				.css({
					height: squareSize + 'px',
					width: squareSize + 'px'
				})
				.css(pre + 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');

			$wrapper.append($smokeContainer);

		},

		drawUnits: function () {
			var model = this.get('model');
			model.appendUnits();
		},

		appendUnit: function (unit) {

			var view = this,
				pre = view.info.get('pre', true).css,
				$unitWrapper = $('<div></div>'),
				squareSize = view.info.get('squareSize'),
				$unitBlock = $('<div>&nbsp;</div>'),
				unitInfo = unit.toJSON(),
				x = unitInfo.x,
				y = unitInfo.y,
				cssX = x * squareSize,
				cssY = y * squareSize,
				$unitLayerWrapper = view.$el.find(view.selectors.unitsWrapper);

			$unitWrapper
				.css({
					height: squareSize + 'px',
					width: squareSize + 'px'
				})
				.css(pre + 'transform', 'translate3d(' + cssX + 'px, ' + cssY + 'px, 0)');

			$unitWrapper.attr({
				'data-x': x,
				'data-y': y,
				'data-xy': 'x' + x + 'y' + y,
				'data-unit-id': unitInfo.id
			});

			$unitWrapper.addClass('js-square square unit-wrapper unit-wrapper-' + unitInfo.type);

			$unitWrapper.append($unitBlock);

			$unitBlock.addClass('unit-image unit-image-' + unitInfo.type + '-' + unitInfo.color);

			//$unitWrapper.append('<div class="unit-health js-unit-health">' + unit.get('health') + '</div>');
			$unitWrapper.append('<div class="js-unit-health unit-health"><div class="js-unit-health-ten unit-health-ten">&nbsp;</div><div class="js-unit-health-one unit-health-one">&nbsp;</div></div>');
			$unitWrapper.append('<div class="js-delta-unit-health delta-unit-health"><div class="js-delta-unit-health-sign delta-unit-health-sign">&nbsp;</div><div class="js-delta-unit-health-ten delta-unit-health-ten">&nbsp;</div><div class="js-delta-unit-health-one delta-unit-health-one">&nbsp;</div></div>');

			$unitLayerWrapper.append($unitWrapper);

			view.setUnitHealth({ unit: unit });

		},


		removeUnit: function (unit) {

			this.getUnitByUnit(unit).remove();

		},

		getUnitByUnit: function (unit) {
			return this.$el.find(this.selectors.unitsWrapper + ' [data-unit-id="' + unit.get('id') + '"]');
		},

		setActiveUnit: function (unit) {
			this.getUnitByUnit(unit).removeClass('not-active');
		},

		setNotActiveUnit: function (unit) {
			this.getUnitByUnit(unit).addClass('not-active');
		},

		addGrave: function (grave) {

			var view = this,
				pre = view.info.get('pre', true).css,
				$graveWrapper = $('<div></div>'),
				squareSize = view.info.get('squareSize'),
				x = grave.x,
				y = grave.y,
				cssX = x * squareSize,
				cssY = y * squareSize,
				$unitLayerWrapper = view.$el.find(view.selectors.unitsWrapper);

			$graveWrapper
				.css({
					height: squareSize + 'px',
					width: squareSize + 'px'
				})
				.css(pre + 'transform', 'translate3d(' + cssX + 'px, ' + cssY + 'px, 0)');

			$graveWrapper.attr({
				'data-x': x,
				'data-y': y,
				'data-xy': 'x' + x + 'y' + y,
				'data-grave-id': grave.id
			});

			$graveWrapper.addClass('js-square square grave-wrapper');

			$unitLayerWrapper.append($graveWrapper);

		},

		removeGrave: function (grave) {

			var view = this,
				$graveWrapper = view.$el.find(view.selectors.unitsWrapper + ' [data-grave-id="' + grave.id + '"]');

			$graveWrapper.remove();

		},

		setSize: function () {

			var squareSize = this.info.get('squareSize') || this.squareSize.default,
				selectors = this.selectors,
				$moveAreaContainer = this.$el.find(selectors.moveAreaContainer),
				$mapImageWrapper = this.$el.find(selectors.mapImageWrapper),
				$eventHandlerWrapper = this.$el.find(selectors.eventHandlerWrapper),
				$squares = this.$el.find(selectors.square),
				$buildings = this.$el.find(selectors.building),
				map = this.get('map'),
				pre = this.info.get('pre', true).css,
				width = map.size.width * squareSize,
				height = map.size.height * squareSize;

			this.info.set('squareSize', squareSize);

			// set container
			$moveAreaContainer.css({
					width: width + 'px',
					height: height + 'px'
				});

			// set canvas
			$mapImageWrapper.css({
					width: width + 'px',
					height: height + 'px'
				});

			//set event handler wrapper
			$eventHandlerWrapper.css({
					width: width + 'px',
					height: height + 'px'
				});

			// set squares sizes
			$squares.each(function () {

				var $this = $(this),
					x = Number($this.attr('data-x')) * squareSize,
					y = Number($this.attr('data-y')) * squareSize;

				$this
					.css({
						width: squareSize + 'px',
						height: squareSize + 'px'
					})
					.css(pre + 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');

			});

			// set buildings position
			$buildings.each(function () {

				var $this = $(this),
					type = $this.attr('data-type'),
					x = Number($this.attr('data-x')),
					y = Number($this.attr('data-y')),
					dY = type === 'castle' ? -1 : 0,
					nodeWidth = squareSize,
					nodeHeight = squareSize - squareSize * dY;

				x = x * squareSize;
				y = (y + dY) * squareSize;

				$this.css(pre + 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');

				$this.css({
					width: nodeWidth + 'px',
					height: nodeHeight + 'px'
				});

			});

		},

		bindMoveArea: function () {

			var moveAreaWrapper = this.$el.find(this.selectors.moveAreaWrapper),
				moveAreaContainer = moveAreaWrapper.find(this.selectors.moveAreaContainer),
				mover = new Mover({
					wrapper: moveAreaWrapper,
					container: moveAreaContainer,
					onRedraw: {
						context: this,
						fn: this.onRedrawMapFromMover
					}
				});

			mover.init();

			win.mover = mover;

			this.set('mover', mover);

		},

		onRedrawMapFromMover: function (data) {

			var xyzs = data.xyzs,
				time = xyzs.hasOwnProperty('time') ? xyzs.time : 300,
				scale = xyzs.scale,
				x = xyzs.x,
				y = xyzs.y,
				z = xyzs.z,
				squareSize = Math.round(this.info.get('squareSize') * scale),
				mover = this.get('mover');

			squareSize = win.APP.util.getBetween(this.squareSize.min, squareSize, this.squareSize.max);

			this.info.set('squareSize', squareSize);

			this.setSize();

			mover.detectSizes();
			mover.detectEdgePositions();
			mover.setDefaultContainerSize();
			mover.setStyleByXYZS({
				x: x,
				y: y,
				z: z,
				time:  time,
				check: true // fix if user up two finger simultaneously
			});

			mover.set('currentContainerXY', { // fix if user up two finger simultaneously
				x: x,                         // see mover.fixAfterResizing
				y: y
			});

		},

		detectClickEvent: function () {

			this.events[this.eventTypes.down + ' ' + this.selectors.moveAreaContainer] = 'saveDownEvent';
			this.events[this.eventTypes.move + ' ' + this.selectors.moveAreaContainer] = 'saveMoveEvent';
			this.events[this.eventTypes.up + ' ' + this.selectors.eventSquares] = 'detectClick';
		},

		detectClick: function (e) {

			var $this,
				x,
				y,
				downXY = this.get('downEvent'),
				moveXY = this.get('moveEvent'),
				maxDeltaMove = 10,
				eventSquareClassName = this.classNames.eventSquares;

			if ( !downXY || !moveXY ) {
				return;
			}

			if ( Math.abs(downXY.x - moveXY.x) + Math.abs(downXY.y - moveXY.y) >  maxDeltaMove ) {
				return;
			}

			$this = $(e.target);

			if ( !$this.hasClass(eventSquareClassName) ) {
				$this = $this.parent();
			}

			x = Number($this.attr('data-x'));
			y = Number($this.attr('data-y'));

			this.onClick({ x: x, y: y });

		},

		saveDownEvent: function (e) {

			var events = this.getEvents(e);

			if (events.length === 1) {
				this.set('downEvent', events.events[0]);
				this.set('moveEvent', events.events[0]);
			} else {
				this.set('downEvent', false);
				this.set('moveEvent', false);
			}

		},

		saveMoveEvent: function (e) {

			var events = this.getEvents(e);

			if (events.length === 1) {
				this.set('moveEvent', events.events[0]);
			} else {
				this.set('moveEvent', false);
			}

		},

		getEvents: function (e) {

			e = e.originalEvent;

			var evt = {},
				touches = e.touches,
				events = touches || [e];

			evt.events = [];

			evt.length = events.length;

			$.each(events, function (index, e) {
				evt.events.push({
					x: e.clientX,
					y: e.clientY
				});
			});

			return evt;

		},

		//////////////////
		// unit actions
		//////////////////

		moveUnitTo: function (data) {

			var view = this,
				model = view.get('model'),
				deferred = $.Deferred(),
				pre = view.info.get('pre', true).css,
				transitionEnd = view.get('transitionEnd'),
				squareSize = view.info.get('squareSize'),
				$unitNode = view.getUnitByUnit(data.unit),
				x = data.x,
				y = data.y,
				xPx = x * squareSize,
				yPx = y * squareSize;

			view.disable();

			$unitNode.addClass('moving');

			// set action on move end
			$unitNode.one(transitionEnd, function () {

				$(this)
					.removeClass('moving')
					.attr('data-x', x)
					.attr('data-y', y)
					.attr('data-xy', 'x' + x + 'y' + y);

				model.clearAvailableActions();
				view.clearAvailableActions();

				view.enable();

				deferred.resolve();

			}); // work only one time

			$unitNode.css(pre + 'transform', 'translate3d(' + xPx + 'px, ' + yPx + 'px, 0)');

			return deferred.promise();

		},

		showAttack: function (data) {

			var view = this,
				model = view.get('model'),
				from = data.from,
				to = data.to,
				deferred = $.Deferred(),
				pre = view.info.get('pre', true).css,
				transitionEnd = view.get('transitionEnd'),
				squareSize = view.info.get('squareSize'),
				$attackNode = $('<div class="attack-square">&nbsp;</div>'),
				$unitsWrapper = view.$el.find(view.selectors.unitsWrapper);

			view.removeActiveSquare();

			$unitsWrapper.append($attackNode);

			$attackNode
				.css(pre + 'transform', 'translate3d(' + (from.x * squareSize) + 'px, ' + (from.y * squareSize) + 'px, 0)')
				.css({
					width: squareSize + 'px',
					height: squareSize + 'px'
				});

			$attackNode.one(transitionEnd, function () {

				$(this).remove();

				model.clearAvailableActions();
				view.clearAvailableActions();

				view.enable();

				deferred.resolve();

			}); // work only one time

			view.disable();

			$attackNode.addClass('moving');

			setTimeout(function () { // todo: try to do transitionEnd without this hack
				$attackNode.css(pre + 'transform', 'translate3d(' + (to.x * squareSize) + 'px, ' + (to.y * squareSize) + 'px, 0)');
			}, 0);

			return deferred.promise();

		},

		showDifferentUnitHealth: function (data) {

			var view = this,
				unit = data.unit,
				differentHealth = data.differentHealth,
				deferred = $.Deferred(),
				unitWrapper = view.getUnitByUnit(unit),
				$deltaHealth = unitWrapper.find('.js-delta-unit-health'),
				animationEnd = view.get('animationEnd');

			view.disable();

			view.setUnitHealth({ unit: unit });

			view.setUnitDifferentHealth({
				unit: unit,
				differentHealth: differentHealth
			});

			$deltaHealth.one(animationEnd, function () {

				$deltaHealth.removeClass('bounce');

				view.enable();

				deferred.resolve();

			}); // work only one time

			$deltaHealth.addClass('bounce');

			return deferred.promise();

		},

		chars: {
			charsList: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'none', 'plus', 'minus', 'slash'],
			charReference: {
				'-': 'minus',
				'+': 'plus',
				'/': 'slash'
			}
		},

		setUnitHealth: function (data) {

			var view = this,
				charsList = view.chars.charsList,
				unit = data.unit,
				health = unit.get('health'),
				defaultHealth = unit.get('defaultHealth'),
				$unitWrapper = view.getUnitByUnit(unit),
				one = 'none',
				ten = 'none',
				$healthOne = $unitWrapper.find('.js-unit-health-one'),
				$healthTen = $unitWrapper.find('.js-unit-health-ten');

			_.each(charsList, function (char) {
				$healthOne.removeClass('number-1-' + char);
				$healthTen.removeClass('number-1-' + char);
			});

			if (health !== defaultHealth) {
				health = health.toString().split('');
				one = health.pop() || one;
				ten = health.pop() || ten;
			}

			$healthOne.addClass('number-1-' + one);
			$healthTen.addClass('number-1-' + ten);

		},

		setUnitDifferentHealth: function (data) {

			var view = this,
				charsList = view.chars.charsList,
				$unitWrapper = view.getUnitByUnit(data.unit),
				sign = 'none',
				one = 'none',
				ten = 'none',
				$deltaHealthSign = $unitWrapper.find('.js-delta-unit-health-sign'),
				$deltaHealthOne = $unitWrapper.find('.js-delta-unit-health-one'),
				$deltaHealthTen = $unitWrapper.find('.js-delta-unit-health-ten'),
				differentHealth = data.differentHealth;

			if ( differentHealth > 0 ) {
				sign = 'plus';
			}

			if ( differentHealth < 0 ) {
				sign = 'minus';
			}

			_.each(charsList, function (char) {
				$deltaHealthSign.removeClass('number-2-' + char);
				$deltaHealthOne.removeClass('number-2-' + char);
				$deltaHealthTen.removeClass('number-2-' + char);
			});

			differentHealth = Math.abs(differentHealth).toString();

			if ( differentHealth.length === 1 ) {
				one = differentHealth[0];
			}

			if ( differentHealth.length === 2 ) {
				one = differentHealth[1];
				ten = differentHealth[0];
			}

			$deltaHealthSign.addClass('number-2-' + sign);
			$deltaHealthOne.addClass('number-2-' + one);
			$deltaHealthTen.addClass('number-2-' + ten);

		}


	});

}(window, window.document));
