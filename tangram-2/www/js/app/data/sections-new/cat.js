'use strict';
/*global window */

var section = {

	id: 'cats',
	name: 'cats',
	data: [

		// cat
		// 43
		{"name":"","hash":"e29d52","data":[[0,1.75,-135],[0,1.75,135],[0,1.25,135],[0,1.25,-135],[0.25,1.5,135],[0.25,1.5,-135],[0.25,1.5,45],[0.25,1.5,-45],[0.25,1,45],[0.25,1,-45],[0.5,0.75,-45],[0.5,0.75,45],[0.5,1.25,-45],[0.5,1.25,45],[0.25,1,-135],[0.25,1,135],[0.53033,1.823223,0],[0.53033,1.823223,-90],[0.176777,1.823223,180],[0.176777,1.823223,-90],[0.25,0,-135],[0.25,0,135],[0.75,0,45],[0.75,0,-45],[0.5,0.25,-135],[0.5,0.25,135],[0.5,0.25,45],[0.5,0.25,-45],[0.957107,2,135],[0.957107,2,45],[0.707107,1.75,-135],[0.707107,1.75,-45]]},
		{"name":"","hash":"6c80c8","data":[[0.707107,0.707107,90],[0.707107,0.707107,0],[0.353553,1.06066,0],[0.353553,1.06066,90],[0.353553,0.707107,0],[0.353553,0.707107,90],[0.353553,0.707107,-90],[0.353553,0.707107,180],[0.883883,0.78033,135],[0.883883,0.78033,45],[1.133883,1.03033,45],[1.133883,1.03033,135],[0.633883,1.03033,45],[0.633883,1.03033,135],[0.883883,0.78033,-45],[0.883883,0.78033,-135],[0.883883,1.28033,45],[0.883883,1.28033,-45],[0.633883,1.03033,-135],[0.633883,1.03033,-45],[0.883883,0.28033,-135],[0.883883,0.28033,135],[1.383883,0.28033,45],[1.383883,0.28033,-45],[1.133883,0.53033,-135],[1.133883,0.53033,135],[1.133883,0.53033,45],[1.133883,0.53033,-45],[0,0.353553,180],[0,0.353553,90],[0,0,-90],[0,0,0]]},
		{"name":"","hash":"c5ea0b","data":[[0.75,0.75,135],[0.75,0.75,45],[0.25,0.75,45],[0.25,0.75,135],[0.5,0.5,45],[0.5,0.5,135],[0.5,0.5,-45],[0.5,0.5,-135],[0.823223,0.926777,180],[0.823223,0.926777,90],[0.823223,1.28033,90],[0.823223,1.28033,180],[0.46967,0.926777,90],[0.46967,0.926777,180],[0.823223,0.926777,0],[0.823223,0.926777,-90],[0.823223,1.28033,0],[0.823223,1.28033,-90],[0.46967,1.28033,180],[0.46967,1.28033,-90],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[1.176777,1.28033,0],[1.176777,1.28033,90],[1.176777,0.926777,-90],[1.176777,0.926777,180]]},
		{"name":"","hash":"5dab29","data":[[1,0.896447,135],[1,0.896447,45],[0.5,0.896447,45],[0.5,0.896447,135],[0.75,0.646447,45],[0.75,0.646447,135],[0.75,0.646447,-45],[0.75,0.646447,-135],[1.603553,0.5,135],[1.603553,0.5,45],[1.853553,0.75,45],[1.853553,0.75,135],[1.353553,0.75,45],[1.353553,0.75,135],[1.603553,0.5,-45],[1.603553,0.5,-135],[0.926777,0.573223,180],[0.926777,0.573223,90],[1.28033,0.573223,0],[1.28033,0.573223,90],[1.603553,0,-135],[1.603553,0,135],[2.103553,0,45],[2.103553,0,-45],[1.853553,0.25,-135],[1.853553,0.25,135],[1.853553,0.25,45],[1.853553,0.25,-45],[0,0.396447,135],[0,0.396447,-135],[0.25,0.646447,45],[0.25,0.646447,-45]]},
		{"name":"","hash":"573b96","data":[[0.323223,0.396447,45],[0.323223,0.396447,-45],[0.323223,0.896447,-45],[0.323223,0.896447,45],[0.073223,0.646447,-45],[0.073223,0.646447,45],[0.073223,0.646447,-135],[0.073223,0.646447,135],[0,1.176777,0],[0,1.176777,-90],[0,0.823223,-90],[0,0.823223,0],[0.353553,1.176777,-90],[0.353553,1.176777,0],[0,1.176777,180],[0,1.176777,90],[0.5,0.676777,90],[0.5,0.676777,0],[0.5,0.323223,-90],[0.5,0.323223,0],[0.78033,0,-135],[0.78033,0,135],[1.28033,0,45],[1.28033,0,-45],[1.03033,0.25,-135],[1.03033,0.25,135],[1.03033,0.25,45],[1.03033,0.25,-45],[0.853553,0.323223,-90],[0.853553,0.323223,0],[0.5,0.323223,180],[0.5,0.323223,90]]},
		{"name":"","hash":"0bfeda","data":[[0,1.207107,-90],[0,1.207107,180],[0.353553,0.853553,180],[0.353553,0.853553,-90],[0.353553,1.207107,180],[0.353553,1.207107,-90],[0.353553,1.207107,90],[0.353553,1.207107,0],[0.353553,1.56066,180],[0.353553,1.56066,90],[0.353553,1.914214,90],[0.353553,1.914214,180],[0,1.56066,90],[0,1.56066,180],[0.353553,1.56066,0],[0.353553,1.56066,-90],[0.707107,0.853553,90],[0.707107,0.853553,0],[0.707107,0.5,-90],[0.707107,0.5,0],[0.457107,0,-135],[0.457107,0,135],[0.707107,0.25,45],[0.707107,0.25,-45],[0.707107,1.914214,180],[0.707107,1.914214,90],[0.707107,1.914214,0],[0.707107,1.914214,-90],[0.707107,0.25,-135],[0.707107,0.25,135],[0.957107,0,-45],[0.957107,0,45]]},
		{"name":"","hash":"465022","data":[[0.5,1,-135],[0.5,1,135],[0.5,0.5,135],[0.5,0.5,-135],[0.75,0.75,135],[0.75,0.75,-135],[0.75,0.75,45],[0.75,0.75,-45],[0.75,1.25,45],[0.75,1.25,-45],[1,1,-45],[1,1,45],[1,1.5,-45],[1,1.5,45],[0.75,1.25,-135],[0.75,1.25,135],[0.75,1.5,0],[0.75,1.5,-90],[0.396447,1.5,180],[0.396447,1.5,-90],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[1.176777,1.573223,0],[1.176777,1.573223,90],[1.176777,1.21967,-90],[1.176777,1.21967,180]]},
		// 44
		{"name":"","hash":"4a67aa","data":[[1.03033,0.78033,180],[1.03033,0.78033,90],[0.676777,0.426777,90],[0.676777,0.426777,180],[1.03033,0.426777,90],[1.03033,0.426777,180],[1.03033,0.426777,0],[1.03033,0.426777,-90],[0.676777,0.78033,0],[0.676777,0.78033,-90],[0.676777,0.426777,-90],[0.676777,0.426777,0],[1.03033,0.78033,-90],[1.03033,0.78033,0],[0.676777,0.78033,180],[0.676777,0.78033,90],[1.207107,0.707107,-135],[1.207107,0.707107,135],[1.457107,0.957107,45],[1.457107,0.957107,135],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[1.707107,0.707107,-45],[1.707107,0.707107,-135],[1.957107,0.957107,45],[1.957107,0.957107,135]]},
		{"name":"","hash":"a39264","data":[[0.582107,1.353553,-135],[0.582107,1.353553,135],[0.582107,0.853553,135],[0.582107,0.853553,-135],[0.832107,1.103553,135],[0.832107,1.103553,-135],[0.832107,1.103553,45],[0.832107,1.103553,-45],[0.90533,1.633883,-90],[0.90533,1.633883,180],[0.551777,1.633883,180],[0.551777,1.633883,-90],[0.90533,1.28033,180],[0.90533,1.28033,-90],[0.90533,1.633883,90],[0.90533,1.633883,0],[0.758883,0.426777,-90],[0.758883,0.426777,180],[0.758883,0.78033,90],[0.758883,0.78033,180],[0.93566,0,-135],[0.93566,0,135],[1.43566,0,45],[1.43566,0,-45],[1.18566,0.25,-135],[1.18566,0.25,135],[1.18566,0.25,45],[1.18566,0.25,-45],[0,1.93566,45],[0,1.93566,135],[0.25,1.68566,-45],[0.25,1.68566,-135]]},
		{"name":"","hash":"bca9b5","data":[[0.551777,0.90533,90],[0.551777,0.90533,0],[0.198223,1.258883,0],[0.198223,1.258883,90],[0.198223,0.90533,0],[0.198223,0.90533,90],[0.198223,0.90533,-90],[0.198223,0.90533,180],[0.551777,1.258883,-90],[0.551777,1.258883,180],[0.198223,1.258883,180],[0.198223,1.258883,-90],[0.551777,0.90533,180],[0.551777,0.90533,-90],[0.551777,1.258883,90],[0.551777,1.258883,0],[0.198223,0.551777,180],[0.198223,0.551777,-90],[0.551777,0.551777,0],[0.551777,0.551777,-90],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[0.90533,1.258883,0],[0.90533,1.258883,90],[0.90533,0.90533,-90],[0.90533,0.90533,180]]},
		{"name":"","hash":"137eb8","data":[[0.75,0.75,45],[0.75,0.75,-45],[0.75,1.25,-45],[0.75,1.25,45],[0.5,1,-45],[0.5,1,45],[0.5,1,-135],[0.5,1,135],[0.926777,0.676777,90],[0.926777,0.676777,0],[1.28033,0.676777,0],[1.28033,0.676777,90],[0.926777,1.03033,0],[0.926777,1.03033,90],[0.926777,0.676777,-90],[0.926777,0.676777,180],[1.28033,0.676777,-90],[1.28033,0.676777,180],[1.28033,1.03033,90],[1.28033,1.03033,180],[0,0.5,-135],[0,0.5,135],[0.5,0.5,45],[0.5,0.5,-45],[0.25,0.75,-135],[0.25,0.75,135],[0.25,0.75,45],[0.25,0.75,-45],[1.457107,0.25,-135],[1.457107,0.25,135],[1.707107,0,-45],[1.707107,0,45]]},
		{"name":"","hash":"11e20b","data":[[1.353553,0.883883,135],[1.353553,0.883883,45],[0.853553,0.883883,45],[0.853553,0.883883,135],[1.103553,0.633883,45],[1.103553,0.633883,135],[1.103553,0.633883,-45],[1.103553,0.633883,-135],[0.78033,0.353553,90],[0.78033,0.353553,0],[1.133883,0.353553,0],[1.133883,0.353553,90],[0.78033,0.707107,0],[0.78033,0.707107,90],[0.78033,0.353553,-90],[0.78033,0.353553,180],[0.426777,0.353553,-90],[0.426777,0.353553,180],[0.426777,0.707107,90],[0.426777,0.707107,180],[1.603553,0.133883,45],[1.603553,0.133883,-45],[1.133883,0,0],[1.133883,0,-90],[1.353553,0.383883,-135],[1.353553,0.383883,135],[1.353553,0.383883,45],[1.353553,0.383883,-45],[0,0.53033,-45],[0,0.53033,-135],[0.25,0.78033,45],[0.25,0.78033,135]]},
		{"name":"","hash":"ca0760","data":[[1,1.103553,135],[1,1.103553,45],[0.5,1.103553,45],[0.5,1.103553,135],[0.75,0.853553,45],[0.75,0.853553,135],[0.75,0.853553,-45],[0.75,0.853553,-135],[1.28033,0.78033,180],[1.28033,0.78033,90],[1.28033,1.133883,90],[1.28033,1.133883,180],[0.926777,0.78033,90],[0.926777,0.78033,180],[1.28033,0.78033,0],[1.28033,0.78033,-90],[1.28033,0.426777,0],[1.28033,0.426777,-90],[0.926777,0.426777,180],[0.926777,0.426777,-90],[1.103553,0,-135],[1.103553,0,135],[1.603553,0,45],[1.603553,0,-45],[1.353553,0.25,-135],[1.353553,0.25,135],[1.353553,0.25,45],[1.353553,0.25,-45],[0.25,0.853553,-45],[0.25,0.853553,45],[0,0.603553,-135],[0,0.603553,135]]},
		{"name":"","hash":"2132b7","data":[[0.75,1,135],[0.75,1,45],[0.25,1,45],[0.25,1,135],[0.5,0.75,45],[0.5,0.75,135],[0.5,0.75,-45],[0.5,0.75,-135],[1.03033,0.676777,180],[1.03033,0.676777,90],[1.03033,1.03033,90],[1.03033,1.03033,180],[0.676777,0.676777,90],[0.676777,0.676777,180],[1.03033,0.676777,0],[1.03033,0.676777,-90],[1.207107,0.75,-135],[1.207107,0.75,135],[1.457107,1,45],[1.457107,1,135],[0,0.25,-135],[0,0.25,135],[0.5,0.25,-45],[0.5,0.25,-135],[0.25,0.5,-135],[0.25,0.5,135],[0.25,0.5,45],[0.25,0.5,-45],[1.207107,0.25,-45],[1.207107,0.25,45],[0.957107,0,-135],[0.957107,0,135]]},
		// 45
		{"name":"","hash":"c0ea59","data":[[1.06066,0.707107,90],[1.06066,0.707107,0],[0.707107,1.06066,0],[0.707107,1.06066,90],[0.707107,0.707107,0],[0.707107,0.707107,90],[0.707107,0.707107,-90],[0.707107,0.707107,180],[0,0.707107,90],[0,0.707107,0],[0.353553,0.707107,0],[0.353553,0.707107,90],[0,1.06066,0],[0,1.06066,90],[0,0.707107,-90],[0,0.707107,180],[0.28033,1.03033,135],[0.28033,1.03033,45],[0.53033,0.78033,-45],[0.53033,0.78033,45],[1.06066,0.353553,0],[1.06066,0.353553,-90],[1.487437,0.53033,45],[1.487437,0.53033,-45],[1.237437,0.78033,-135],[1.237437,0.78033,135],[1.237437,0.78033,45],[1.237437,0.78033,-45],[0,0,180],[0,0,-90],[0,0.353553,90],[0,0.353553,0]]},
		{"name":"","hash":"612782","data":[[1.28033,0.957107,135],[1.28033,0.957107,45],[0.78033,0.957107,45],[0.78033,0.957107,135],[1.03033,0.707107,45],[1.03033,0.707107,135],[1.03033,0.707107,-45],[1.03033,0.707107,-135],[0.353553,0.78033,-90],[0.353553,0.78033,180],[0,0.78033,180],[0,0.78033,-90],[0.353553,0.426777,180],[0.353553,0.426777,-90],[0.353553,0.78033,90],[0.353553,0.78033,0],[0.78033,0.457107,-45],[0.78033,0.457107,-135],[0.53033,0.707107,135],[0.53033,0.707107,-135],[0.03033,0,-135],[0.03033,0,135],[0.53033,0,45],[0.53033,0,-45],[0.28033,0.25,-135],[0.28033,0.25,135],[0.28033,0.25,45],[0.28033,0.25,-45],[1.28033,0.457107,-45],[1.28033,0.457107,45],[1.03033,0.207107,-135],[1.03033,0.207107,135]]},
		{"name":"","hash":"3a979d","data":[[0.323223,0.853553,45],[0.323223,0.853553,-45],[0.323223,1.353553,-45],[0.323223,1.353553,45],[0.073223,1.103553,-45],[0.073223,1.103553,45],[0.073223,1.103553,-135],[0.073223,1.103553,135],[0,1.633883,0],[0,1.633883,-90],[0,1.28033,-90],[0,1.28033,0],[0.353553,1.633883,-90],[0.353553,1.633883,0],[0,1.633883,180],[0,1.633883,90],[0.5,0.78033,90],[0.5,0.78033,0],[0.5,0.426777,-90],[0.5,0.426777,0],[0.323223,0,-135],[0.323223,0,135],[0.823223,0,45],[0.823223,0,-45],[0.573223,0.25,-45],[0.573223,0.25,45],[0.573223,0.25,135],[0.573223,0.25,-135],[0.5,0.78033,-90],[0.5,0.78033,180],[0.853553,0.78033,0],[0.853553,0.78033,90]]},
		{"name":"","hash":"0955f3","data":[[0.707107,0.5,90],[0.707107,0.5,0],[0.353553,0.853553,0],[0.353553,0.853553,90],[0.353553,0.5,0],[0.353553,0.5,90],[0.353553,0.5,-90],[0.353553,0.5,180],[0.426777,1.03033,45],[0.426777,1.03033,-45],[0.676777,0.78033,-45],[0.676777,0.78033,45],[0.676777,1.28033,-45],[0.676777,1.28033,45],[0.426777,1.03033,-135],[0.426777,1.03033,135],[0,0.5,-90],[0,0.5,180],[0,0.853553,90],[0,0.853553,180],[0.883883,0.073223,-135],[0.883883,0.073223,135],[1.207107,0,-90],[1.207107,0,180],[0.853553,0.707107,-90],[0.853553,0.707107,180],[0.853553,0.707107,90],[0.853553,0.707107,0],[0.853553,0.353553,-90],[0.853553,0.353553,180],[1.207107,0.353553,0],[1.207107,0.353553,90]]},
		{"name":"","hash":"1eb487","data":[[1,0.5,135],[1,0.5,45],[0.5,0.5,45],[0.5,0.5,135],[0.75,0.25,45],[0.75,0.25,135],[0.75,0.25,-45],[0.75,0.25,-135],[0.75,0.75,-45],[0.75,0.75,-135],[0.5,0.5,-135],[0.5,0.5,-45],[1,0.5,-135],[1,0.5,-45],[0.75,0.75,135],[0.75,0.75,45],[0.573223,0.823223,0],[0.573223,0.823223,-90],[0.21967,0.823223,180],[0.21967,0.823223,-90],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[1,1,45],[1,1,135],[1.25,0.75,-45],[1.25,0.75,-135]]},
		{"name":"","hash":"138222","data":[[0.5,1.353553,-135],[0.5,1.353553,135],[0.5,0.853553,135],[0.5,0.853553,-135],[0.75,1.103553,135],[0.75,1.103553,-135],[0.75,1.103553,45],[0.75,1.103553,-45],[0.823223,1.633883,-90],[0.823223,1.633883,180],[0.46967,1.633883,180],[0.46967,1.633883,-90],[0.823223,1.28033,180],[0.823223,1.28033,-90],[0.823223,1.633883,90],[0.823223,1.633883,0],[0.323223,0.426777,-90],[0.323223,0.426777,180],[0.323223,0.78033,90],[0.323223,0.78033,180],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[0.323223,0.78033,0],[0.323223,0.78033,-90],[0.323223,1.133883,90],[0.323223,1.133883,180]]},
		{"name":"","hash":"716b95","data":[[1.603553,0.896447,135],[1.603553,0.896447,45],[1.103553,0.896447,45],[1.103553,0.896447,135],[1.353553,0.646447,45],[1.353553,0.646447,135],[1.353553,0.646447,-45],[1.353553,0.646447,-135],[0.5,0.5,135],[0.5,0.5,45],[0.75,0.75,45],[0.75,0.75,135],[0.25,0.75,45],[0.25,0.75,135],[0.5,0.5,-45],[0.5,0.5,-135],[0.823223,0.573223,180],[0.823223,0.573223,90],[1.176777,0.573223,0],[1.176777,0.573223,90],[0,0,-135],[0,0,135],[0.5,0,45],[0.5,0,-45],[0.25,0.25,-135],[0.25,0.25,135],[0.25,0.25,45],[0.25,0.25,-45],[2.103553,0.896447,135],[2.103553,0.896447,45],[1.853553,0.646447,-135],[1.853553,0.646447,-45]]},

		{"name":"","hash":"81578a","data":[[0.5,0.853553,135],[0.5,0.853553,45],[0,0.853553,45],[0,0.853553,135],[0.25,0.603553,45],[0.25,0.603553,135],[0.25,0.603553,-45],[0.25,0.603553,-135],[1.103553,0.75,135],[1.103553,0.75,45],[1.353553,1,45],[1.353553,1,135],[0.853553,1,45],[0.853553,1,135],[1.103553,0.75,-45],[1.103553,0.75,-135],[0.573223,0.676777,180],[0.573223,0.676777,90],[0.926777,0.676777,0],[0.926777,0.676777,90],[0.146447,0,-135],[0.146447,0,135],[0.646447,0,45],[0.646447,0,-45],[0.396447,0.25,-135],[0.396447,0.25,135],[0.396447,0.25,45],[0.396447,0.25,-45],[1.603553,0.75,-45],[1.603553,0.75,-135],[1.853553,1,45],[1.853553,1,135]]},
		{"name":"","hash":"4577bc","data":[[1,0.875,135],[1,0.875,45],[0.5,0.875,45],[0.5,0.875,135],[0.75,0.625,45],[0.75,0.625,135],[0.75,0.625,-45],[0.75,0.625,-135],[1.603553,0.771447,135],[1.603553,0.771447,45],[1.853553,1.021447,45],[1.853553,1.021447,135],[1.353553,1.021447,45],[1.353553,1.021447,135],[1.603553,0.771447,-45],[1.603553,0.771447,-135],[1.073223,0.698223,180],[1.073223,0.698223,90],[1.426777,0.698223,0],[1.426777,0.698223,90],[0.375,0,-135],[0.375,0,135],[0.875,0,45],[0.875,0,-45],[0.625,0.25,-135],[0.625,0.25,135],[0.625,0.25,45],[0.625,0.25,-45],[0.25,0.625,-135],[0.25,0.625,-45],[0,0.875,135],[0,0.875,45]]},
		{"name":"","hash":"41124a","data":[[0.707107,0.323223,0],[0.707107,0.323223,-90],[1.06066,0.676777,-90],[1.06066,0.676777,0],[0.707107,0.676777,-90],[0.707107,0.676777,0],[0.707107,0.676777,180],[0.707107,0.676777,90],[1.06066,0.323223,180],[1.06066,0.323223,90],[1.06066,0.676777,90],[1.06066,0.676777,180],[0.707107,0.323223,90],[0.707107,0.323223,180],[1.06066,0.323223,0],[1.06066,0.323223,-90],[1.414214,0.676777,90],[1.414214,0.676777,0],[1.414214,0.323223,-90],[1.414214,0.323223,0],[1.34099,0,-135],[1.34099,0,135],[1.84099,0,45],[1.84099,0,-45],[1.59099,0.25,-135],[1.59099,0.25,135],[1.59099,0.25,45],[1.59099,0.25,-45],[0,0.676777,90],[0,0.676777,180],[0.353553,0.676777,0],[0.353553,0.676777,-90]]}


	]

};

export default section;
