/**
 */
define([], function() {
	var util = require('utility/util');
	
	var view = {

		onLoad : function(lasthash) {
			var me = this;
			var url = CONSTANT.templatePath('success');
			// var fanName = util.getUrlParams().fanName;
			
            var maintain = function(obj){
                var successTemp = obj.successTemp({
                	fanName: '',
                	isResponse: lasthash=='whyme'
                });
                me.$el.html(successTemp);
                me.turning();
            };
            util.getTemplateContains( url,
               ['successTemp'], 
               maintain.bind(me) ); 
		},

		binding : function() {
			var me = this ;
			me.tie( 'click', '.j_got', function(){
				me.back();
			});
			me.tie( 'click', '.j_close', function(){
				me.back();
			});
		},
		goBack : function(e) {
			this.back();
		},
		loadHTML : function() {
			var me = this;
			
		}
	};

	return view;

});
