define(['templateMaster', 'fastclick', 'shim', 'router', 'device', 'log', 'app/home/home-view', 'app/page/page-view'], function (templateMaster, fastclick) {

	'use strict';

	templateMaster.init();

	fastclick.attach(window.document.body);

	return true;

});