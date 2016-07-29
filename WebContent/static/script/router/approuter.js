
define(function(require) {

	var Util = require('utility/util');
	var SuperView = require('superview');

	new SuperView();

	var AppRouter = Backbone.Router.extend( {

		/**
		 * 
		 * default setting can be like this in initialize function;
		 */
		routes : { },
		
		initialize : function(options) {
			Util.router = this;
		},
		main : function() {
			var me = this;
			me.execute();
		},
		execute : function(callback, args) {
			var me = this;
			if (callback) callback.apply(this, args);
			return;
		}
	});

	return AppRouter;

});
