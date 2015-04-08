/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global window */
	/*global */

	win.APP = win.APP || {};

	win.APP.BB = win.APP.BB || {};

	APP.BB.MapEditorView = APP.BB.BattleView.extend({

		events: {
			'click .js-open-map-popup': 'openMapPopup',
			'change .js-tool-size': 'changeSize',

			'click .js-set-brush-type': 'setBrushType',
			'click .js-set-brush-color': 'setBrushColor',
			'click .js-set-brush-form': 'setBrushForm',

			'click .js-save-map': 'saveMap'

		},

		selectors: {

			// self
			toolsWrapper: '.js-map-editor-tools-wrapper',

			// nested
			mapImageWrapper: '.js-map-image-wrapper',
			moveAreaWrapper: '.js-move-area-wrapper',
			moveAreaContainer: '.js-move-area-container',
			mainEventHandler: '.js-main-event-handler',
			eventHandlerWrapper: '.js-event-handler-wrapper',
			eventSquares: '.js-event-square',
			//activeEventSquare: '.active-event-square',
			//activeSquareMark: '.active-square-mark',
			buildingWrapper: '.js-building-wrapper',
			unitsWrapper: '.js-units-wrapper',
			unitWrapper: '.js-unit-wrapper',
			building: '.js-building',
			//smokeWrapper: '.js-smoke-wrapper',
			//viewDisable: '.js-view-disable',
			//viewCpuDisable: '.js-view-cpu-disable',
			square: '.js-square',
			statusBar: '.js-battle-view-status-bar',
			styleSquareSize: '.js-style-square-size'
			//unitInfoWrapper: '.js-unit-info-wrapper',
		},

		defaultMap: {
			type: 'skirmish',
			size: {
				width: 10,
				height: 6
			},
			name: 'no name',

			maxPlayers: null, // set automatically
			units: [],
			buildings: [],
			terrain: {}

		},

		defaults: {
			brush: {
				color: 'blue',
				type: 'terrain', // terrain, unit, building
				form: ''
			}
		},

		squareSize: win.APP.map.squareSize,

		initialize: function (data) {

			$('.js-map-editor-wrapper').trigger('hide'); // remove previous map editor

			data = data || {};

			var view = this,
				util = view.util;

			view.set('brush', view.defaults.brush);

			view.set('clickXY', {});

			view.battleProto = APP.BB.BattleView.prototype;

			view.detectClickEvent();

			view.$el = $(view.tmpl['map-editor']());

			view.set('map', util.copyJSON(data.map || view.defaultMap));

			// set sizes
			view.setSize();

			view.drawMap();

			// draw buildings
			view.drawBuildings();

			// draw units
			view.drawUnits();

			// bind move area
			view.bindMoveArea();

			view.bindEventListeners();

			view.render();

			view.proto.initialize.apply(view, arguments);

			view.updateTools();

		},

		onClick: function (xy) {

			var view = this,
				xyStr = 'x' + xy.x + 'y' + xy.y,
				map = view.get('map'),
				brush = view.get('brush'),
				util = win.APP.util,
				buildingMaster = win.APP.building,
				mapMaster = win.APP.map,
				playerColors = mapMaster.playerColors,
				buildingData;

			if (brush.type === 'terrain' && brush.form) {
				if (brush.form === 'eraser') {
					map.terrain[xyStr] = 'terra-1';
				} else {
					map.terrain[xyStr] = brush.form;
				}
				view.drawMap();
				return;
			}

			if (brush.type === 'unit' && brush.form) {
				util.arrayRemoveByValue(map.units, _.find(map.units, xy));
				if (brush.form !== 'eraser') {
					map.units.push({
						x: xy.x,
						y: xy.y,
						type: brush.form,
						ownerId: playerColors.indexOf(brush.color)
					});
				}
				view.reDrawUnits();
				return;
			}

			if (brush.type === 'building' && brush.form) {
				util.arrayRemoveByValue(map.buildings, _.find(map.buildings, xy));

				if (brush.form !== 'eraser') {
					buildingData = {
						x: xy.x,
						y: xy.y,
						type: brush.form,
						state: 'normal'
					};

					if ( _.contains(buildingMaster.noMansBuildingsList, brush.form) ) {
						buildingData.color = 'gray';
					}

					if ( brush.form === 'farm-destroyed' ) {
						buildingData.type = 'farm';
						buildingData.state = 'destroyed';
						buildingData.color = 'gray';
					}

					if ( buildingData.color !== 'gray' ) {
						buildingData.ownerId = playerColors.indexOf(brush.color);
					}

					map.buildings.push(buildingData);
				}

				view.reDrawBuildings();
				view.drawMap();
				return;
			}


		},

		// just overwrite
		detectDblClick: function () {
			console.log('dbl click is', this.get('clickXY'));
		},

		openMapPopup: function () {

			var view = this;

			win.APP.map.db.getMapsInfo().then(function (mapsInfo) {

				view.showPopup({
					popupName: 'map-list-popup',
					parentView: view,
					popupData: {
						mapsInfo: mapsInfo
					}
				});

			});

		},

		drawMap: function () {

			// prepare empty map's squares
			var view = this,
				map = view.get('map'),
				x, y,
				lenX, lenY,
				tileXY;

			for (x = 0, lenX = map.size.width; x < lenX; x += 1) {
				for (y = 0, lenY = map.size.height; y < lenY; y += 1) {
					tileXY = 'x' + x + 'y' + y;
					if ( !map.terrain[tileXY] ) {
						map.terrain[tileXY] = 'terra-1';
					}
				}
			}

			return view.battleProto.drawMap.apply(view, arguments);

		},

		drawBuildings: function () {

			var view = this,
				map = view.get('map'),
				maxX = map.size.width - 1,
				maxY = map.size.height - 1,
				buildings = map.buildings,
				mapMaster = win.APP.map,
				playerColors = mapMaster.playerColors;

			_.each(buildings, function (building) {
				if (building.x > maxX || building.y > maxY) {
					return;
				}
				building.color = playerColors[building.ownerId] || 'gray';
				if (building.color === 'gray') {
					delete building.ownerId;
				}
				view.appendBuilding(building);
			});

		},

		drawUnits: function () {

			var view = this,
				map = view.get('map'),
				maxX = map.size.width - 1,
				maxY = map.size.height - 1,
				units = map.units,
				mapMaster = win.APP.map,
				playerColors = mapMaster.playerColors,
				unitMaster = win.APP.unitMaster,
				commanderList = unitMaster.commanderList;

			_.each(units, function (unitData) {

				if (unitData.x > maxX || unitData.y > maxY) {
					return;
				}

				var unitType = unitData.type,
					unit,
					isCommander = unitType === 'commander' || _.contains(win.APP.unitMaster.commanderList, unitType);

				unitData.color = playerColors[unitData.ownerId];

				if ( isCommander ) {
					unitData.type = commanderList[unitData.ownerId];
				}

				unit = win.APP.unitMaster.createUnit(unitData);
				view.appendUnit(unit);

			});


		},

		updateTools: function (data) {

			data = data || {};

			function objToDataURL(obj) {
				return encodeURI(JSON.stringify(obj).replace(/\s/g, ''));
			}

			var view = this,
				map = view.get('map'),
				mapWidth = map.size.width,
				mapHeight = map.size.height,
				$wrapper = view.$el.find(view.selectors.toolsWrapper),
				$node,
				parseData = {},
				mapMaster = win.APP.map,
				mapSizes = [];

			_.each(mapMaster.mapSizes, function (value, key) {
				mapSizes.push({
					key: key,
					value: value
				});
			});

			parseData.mapSizes = objToDataURL(mapSizes);
			parseData.mapHeight = _.find(mapSizes, { value: mapHeight });
			parseData.mapWidth = _.find(mapSizes, { value: mapWidth });

			parseData.brush = view.get('brush');

			parseData.mapName = map.name;

			$node = $(view.tmpl['map-editor-tools'](parseData));

			$wrapper.empty();

			$wrapper.append($node);

			view.delegateEvents();

			if (data.open) {
				view.$el.find('.js-tab-button[data-tab-id="' + data.open + '"]').trigger('click');
			}

		},

		changeSize: function (e) {

			var view = this,
				map = view.get('map'),
				$this = $(e.currentTarget),
				value = $this.attr('data-value');

			map.size[$this.attr('data-group-name')] = parseInt(value, 10);
			view.drawMap();
			view.setSize();

			view.get('mover').setDefaultContainerState();

			view.reDrawUnits();
			view.reDrawBuildings();

		},

		reDrawUnits: function () {
			this.$el.find(this.selectors.unitsWrapper).empty();
			this.drawUnits();
		},

		reDrawBuildings: function () {

			this.$el.find(this.selectors.buildingWrapper).empty();
			this.drawBuildings();

		},

		setBrushType: function (e) {

			var view = this,
				$this = $(e.currentTarget),
				brush = view.get('brush');

			brush.type = $this.attr('data-brush-type');
			brush.form = '';

			view.updateTools({
				open: 'map-draw'
			});

		},

		setBrushColor: function (e) {

			var view = this,
				$this = $(e.currentTarget),
				brush = view.get('brush');

			brush.color = $this.attr('data-brush-color');

			view.updateTools({
				open: 'map-draw'
			});

		},

		setBrushForm: function (e) {

			var view = this,
				$this = $(e.currentTarget),
				brush = view.get('brush');

			brush.form = $this.attr('data-brush-form');

			view.updateTools({
				open: 'map-draw'
			});

		},

		saveMap: function () {

			var view = this,
				map = view.get('map'),
				endMap = view.util.copyJSON(map),
				maxX = map.size.width - 1,
				maxY = map.size.height - 1,
				buildings = map.buildings,
				units = map.units,
				getXYFromStringXY = view.util.getXYFromStringXY,
				terrain = map.terrain;

			endMap.units = [];
			endMap.buildings = [];
			endMap.terrain = {};

			_.each(terrain, function (type, xyStr) {

				var xy = getXYFromStringXY(xyStr);

				if ( xy.x > maxX || xy.y > maxY ) {
					return;
				}

				endMap.terrain[xyStr] = type;

			});

			_.each(buildings, function (building) {

				if ( building.x > maxX || building.y > maxY ) {
					return;
				}

				building = view.util.copyJSON(building);

				delete building.color;

				endMap.buildings.push(building);

			});

			_.each(units, function (unit) {

				if ( unit.x > maxX || unit.y > maxY ) {
					return;
				}

				unit = view.util.copyJSON(unit);

				delete unit.color;
				delete unit.id;

				endMap.units.push(unit);

			});


			console.log(JSON.stringify(endMap));





		},






		test: function () {

		}


	})


}(window));