'use strict';
/*global window */

import mediator from './services/mediator';

// init all librares
import shim from './lib/shim';
import _ from './lib/lodash';
import $ from './lib/jbone';
import Deferred from './lib/deferred';
import Backbone from './lib/backbone';
import fastclick from './lib/fastclick';
//import doT from './lib/dot';
import Swiper from './lib/swiper';

// init all services
import info from './services/info';
import device from './services/device';
import androidAds from './services/android-ads';
import lang from './services/lang';
import log from './services/log';
import tm from './services/template-master';
import util from './services/util';

// init sound players
import sm from './sound/sound-master';

import router from './app/router/router';

import BaseView from './app/view/core/base';
import hintMaster from './app/view/core/hint';
import popupMaster from './app/view/core/popup';

// todo: - test - enable fast click
new fastclick(window.document.body); // test it decide

(function back() {

	var win = window;

	if ( win.location.hash ) {
		win.history.back();
		return win.setTimeout(back, 50);
	}

	Deferred.installInto($);

	win.$ = win.jQuery = win.jquery = $;

	BaseView.prototype.initStatic();

	Backbone.history.start();

	win.setTimeout(androidAds.showAd, 3e3);

}());