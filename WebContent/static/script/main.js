/**
 * Global configuration here: require config,
 *
 */
var W = window;

W.ISWEICHAT = false;

W.BASEURL = 'script/';

W.VIEWS_PATH = 'views/';
W.LIB_PATH = 'libs/';
W.ROUTER_PATH = 'router/';
W.TEMPLATE_PATH = 'templates/';

W.CONSTANT = {
	viewPath : function(name) {
		return W.VIEWS_PATH + name;
	},
	//templatePath('onSale.html'),
	templatePath : function(name) {
		return 'text!' + W.TEMPLATE_PATH + name + '.html';
	},
	LoadLength : 20,
	seconds : 60
};

require.config({
	baseUrl : W.BASEURL,
	shim : {
		_ : {
			exports : '_'
		},
		B : {
			deps : ['_', '$', 'text'],
			exports : 'Backbone'
		},
		App : {
			deps : ['B']
		},
		SuperView : {
			deps : ['utility/Util'],
			exports : 'SuperView'
		}
	},
	paths : {
		'text' : '../script/framework/text',
		superview : W.VIEWS_PATH + 'superview',
		approuter : W.ROUTER_PATH + 'approuter'
	},
	urlArgs : window.VERSION,
	waitSeconds : 30
});

require(['approuter'], function() {

	// var SuperView = require('superview');
	// new SuperView();
	var router = new AppRouter();
	Backbone.history.start();
}); 