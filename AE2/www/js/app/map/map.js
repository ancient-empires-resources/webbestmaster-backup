/*jslint white: true, nomen: true */
(function (win) {

	"use strict";
	/*global console, alert, window, document */
	/*global */

	win.APP.map = {
		squareSize: {
			min: 24,
			max: 96, // 192
			default: 48 // 24 * 2
		},
		maxCanvasSize: 4194304, // 2048 * 2048
		scaleImage: function (img, scale) {

			var imgWidth = img.width,
				imgHeight = img.height,
				srcCanvas,
				srcCtx,
				srcData,
				dstCanvas,
				dstCtx,
				offset,
				x, y, r, g, b, a;

			srcCanvas = document.createElement('canvas');
			srcCanvas.width = imgWidth;
			srcCanvas.height = imgHeight;

			srcCtx = srcCanvas.getContext('2d');
			srcCtx.drawImage(img, 0, 0);
			srcData = srcCtx.getImageData(0, 0, img.width, img.height).data;

			dstCanvas = document.createElement('canvas');
			dstCanvas.width = imgWidth * scale;
			dstCanvas.height = imgHeight * scale;
			dstCtx = dstCanvas.getContext('2d');

			offset = 0;
			for (y = 0; y < imgHeight; y += 1) {
				for (x = 0; x < imgWidth; x += 1) {
					r = srcData[offset];
					offset += 1;
					g = srcData[offset];
					offset += 1;
					b = srcData[offset];
					offset += 1;
					a = srcData[offset] / 100;
					offset += 1;
					dstCtx.fillStyle = 'rgba(' + [r, g, b, a].join(',') + ')';
					dstCtx.fillRect(x * scale, y * scale, scale, scale);
				}
			}

			return dstCanvas.toDataURL();

		},
		allColors: ['blue', 'red', 'green', 'black', 'gray'],
		playerColors: ['blue', 'red', 'green', 'black'],
		playerTypes: ['player', 'cpu', 'none'],
		money: [500, 750, 1000, 1500, 2000],
		unitsLimits: [10, 15, 20, 25],
		terrainTypes: ['bridge-1', 'bridge-2', 'forest-1', 'forest-2', 'hill-1', 'road-1', 'stone-1', 'stone-2', 'terra-1', 'terra-2', 'terra-3', 'terra-4', 'terra-5', 'water-1', 'water-2', 'water-3'],
		mapSizes: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
		getTypeByTileName: function (tileName) {
			return tileName.replace(/\-\d+$/,'');
		},

		terra: {
			pathResistance: 1,
			defence: 5
		},
		road: {
			pathResistance: 1,
			defence: 0
		},
		bridge: {
			pathResistance: 1,
			defence: 0
		},
		hill: {
			pathResistance: 2,
			defence: 10
		},
		forest: {
			pathResistance: 2,
			defence: 10
		},
		stone: {
			pathResistance: 3,
			defence: 15
		},
		water: {
			pathResistance: 4,
			flowPathResistance: 1,
			defence: 0
		},

		// db
		db: {

			name: 'AE2DB',
			version: '1',
			description: 'AE2 DB',
			size: 1024 * 1024 * 20, // 1024 x 1024 x 20 = 1MB x 20 = 20MB
			db: false, // field for db
			skirmishMaps: 'skirmish',
			missionMaps: 'mission',
			savedGame: 'savedGame',

			init: function () {

				var dbMaster = this,
					db = openDatabase(dbMaster.name, dbMaster.version, dbMaster.description, dbMaster.size);

				dbMaster.db = db;

				// create tablet if needed
				db.transaction(function(tx) {

					var missionDeferred = $.Deferred(),
						skirmishDeferred = $.Deferred();

					$.when(missionDeferred, skirmishDeferred).done(function () {
						dbMaster.prepareDefaultMap();
					});

					//tx.executeSql('DROP TABLE IF EXISTS ' + dbMaster.missionMaps); // TODO: comment this for production

					tx.executeSql('CREATE TABLE IF NOT EXISTS ' + dbMaster.missionMaps + ' (jsMapKey TEXT, info TEXT, map TEXT)', [], function () {
						missionDeferred.resolve();
					}, function (e) {
						log(e);
					});

					tx.executeSql('CREATE TABLE IF NOT EXISTS ' + dbMaster.skirmishMaps + ' (jsMapKey TEXT, info TEXT, map TEXT)', [], function () {
						skirmishDeferred.resolve();
					}, function (e) {
						log(e);
					});

					//tx.executeSql('DROP TABLE IF EXISTS ' + dbMaster.savedGame); // TODO: comment this for production

					tx.executeSql('CREATE TABLE IF NOT EXISTS ' + dbMaster.savedGame + ' (date TEXT, name TEXT, game TEXT)', [], null, null);

				});

			},

			prepareDefaultMap: function () {

				var maps = win.APP.maps,
					dbMaster = this,
					db = dbMaster.db;

				_.each(maps, function (map, jsMapKey) {
					db.transaction(function (tx) {
						tx.executeSql('SELECT * FROM ' + map.type + ' WHERE jsMapKey=?', [jsMapKey], function (tx, results) {
							if (results.rows.length) {
								delete win.APP.maps[jsMapKey];
								return;
							}
							dbMaster.insertMap(map, jsMapKey);
						});
					});
				});

			},

			insertMap: function (map, jsMapKey) { // map

				var maps = win.APP.maps,
					dbMaster = this,
					db = dbMaster.db,
					info;

				info = JSON.parse(JSON.stringify(map));

				delete info.units;
				delete info.buildings;
				delete info.terrain;

				db.transaction(function(tx) {
					tx.executeSql('INSERT INTO ' + map.type + ' (jsMapKey, info, map) values(?, ?, ?)', [jsMapKey, JSON.stringify(info), JSON.stringify(map)], null, null);
				});

				delete maps[jsMapKey];

			},

			removeMap: function (data) {

				var dbMaster = this,
					db = dbMaster.db,
					type = data.type,
					jsMapKey = data.jsMapKey,
					deferred = $.Deferred();

				db.transaction(function (tx) {
					tx.executeSql('DELETE FROM ' + type + ' WHERE jsMapKey = ?', [jsMapKey], function () {
						deferred.resolve();
					}, function () {
						deferred.resolve();
					});
				});

				return deferred.promise();

			},

			removeSave: function (name) {

				var dbMaster = this,
					db = dbMaster.db,
					deferred = $.Deferred();

				db.transaction(function (tx) {
					tx.executeSql('DELETE FROM ' + dbMaster.savedGame + ' WHERE name = ?', [name], function () {
						deferred.resolve();
					}, function () {
						deferred.resolve();
					});
				});

				return deferred.promise();

			},

			getMapsInfo: function (data) {

				data = data || {};

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db,
					mapsInfo = {};

				data.type = data.type || dbMaster.skirmishMaps;

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM ' + data.type + ' ORDER BY jsMapKey ASC', [], function (tx, results) {
						var i, len, row;
						for (i = 0, len = results.rows.length; i < len; i += 1) {
							row = results.rows.item(i);
							mapsInfo[row.jsMapKey] = JSON.parse(row.info);
						}
						deferred.resolve(mapsInfo);
					});
				});

				return deferred.promise();

			},

			getMapInfo: function (data) {

				data = data || {};

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db;

				data.type = data.type || dbMaster.skirmishMaps;

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM ' + data.type + ' WHERE jsMapKey=?', [data.jsMapKey], function (tx, results) {

						var row = results.rows.item(0),
							mapInfo = JSON.parse(row.info);

						deferred.resolve(mapInfo);

					});
				});

				return deferred.promise();

			},

			getMap: function (data) {

				data = data || {};

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db;

				data.type = data.type || dbMaster.skirmishMaps;

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM ' + data.type + ' WHERE jsMapKey=?', [data.jsMapKey], function (tx, results) {

						var row = results.rows.item(0),
							map = JSON.parse(row.map);

						deferred.resolve(map);

					});
				});

				return deferred.promise();

			},

			openMap: function (openMaps) {

				var dbMaster = this;

				_.each(openMaps, function (mapData) {
					dbMaster.getMap(mapData).then(function (map) {
						map.isOpen = true;
						dbMaster.removeMap(mapData).then(function () {
							dbMaster.insertMap(map, mapData.jsMapKey);
						});
					});
				});

			},

			setMapDone: function (mapData) {

				var dbMaster = this,
					difficultLevel = win.APP.info.get('difficult');

				dbMaster.getMap(mapData).then(function (map) {

					map.isDone = true;
					map['isDoneByDifficult_' + difficultLevel] = true;

					dbMaster.removeMap(mapData).then(function () {
						dbMaster.insertMap(map, mapData.jsMapKey);
					});

				});

			},

			saveGame: function (date, name, data) {

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db;

				_.each(data.map, function (value, key) {
					if ( !/briefing/i.test(key) ) { // save briefing only
						return;
					}
					_.each(value, function (briefing) {
						// detect onShow
						if (briefing.onShow && briefing.onShow.context && briefing.onShow.default_context) {
							briefing.onShow.context = briefing.onShow.default_context;
						}

						// detect onHide
						if (briefing.onHide && briefing.onHide.context && briefing.onHide.default_context) {
							briefing.onHide.context = briefing.onHide.default_context;
						}
					});
				});

				dbMaster
					.removeSave(name)
					.then(function () {
						db.transaction(function(tx) {
							tx.executeSql('INSERT INTO ' + dbMaster.savedGame + ' (date, name, game) values(?, ?, ?)', [date, name, JSON.stringify(data)], function () {
								deferred.resolve();
							}, null);
						});
					});

				return deferred.promise();

			},

			getSavedGames: function () {

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db,
					saves = [];

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM ' + dbMaster.savedGame + ' ORDER BY date DESC', [], function (tx, results) {
						var i, len, row;
						for (i = 0, len = results.rows.length; i < len; i += 1) {
							row = results.rows.item(i);
							saves.push(row.name);
						}
						deferred.resolve(saves);
					});
				});

				return deferred.promise();

			},

			getSavedGame: function (gameName) {

				var dbMaster = this,
					deferred = $.Deferred(),
					db = dbMaster.db;

				db.transaction(function (tx) {
					tx.executeSql('SELECT * FROM ' + dbMaster.savedGame + ' WHERE name=?', [gameName], function (tx, results) {
						deferred.resolve(results.rows.item(0));
					});
				});

				return deferred.promise();

			}

		}

	};

}(window));