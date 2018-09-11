(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('components/symfony-form')) :
	typeof define === 'function' && define.amd ? define(['exports', 'components/symfony-form'], factory) :
	(factory((global.symfonyForm = {}),global.form));
}(this, (function (exports,form) { 'use strict';

	form = form && form.hasOwnProperty('default') ? form['default'] : form;



	exports.default = form;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
