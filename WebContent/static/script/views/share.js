/**
 */
define([], function() {
	var util = require('utility/util');
	
	var view = {

		onLoad : function(lasthash) {
			var me = this;
			var url = CONSTANT.templatePath('share');
			
            var maintain = function(obj){
                var shareTemp = obj.shareTemp({});     
                me.$el.html(shareTemp);
                me.turning();
            };
            util.getTemplateContains( url,
               ['shareTemp'], 
               maintain.bind(me) ); 
		},

		binding : function() {
			var me = this;
			me.tie( 'click', '.j_send', function(){
				me.next('success');
			} );
			me.tie( 'click', '.j_close', function(){
				me.next('');
			} );
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
