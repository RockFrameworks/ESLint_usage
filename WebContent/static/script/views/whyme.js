/**
 */
define([], function() {
	var util = require('utility/util');
	var whyMe = {
		onLoad : function(lasthash) {
			var me = this;
			var url = CONSTANT.templatePath('whyme');
            var maintain = function(obj){
                var whymeTemp = obj.whymeTemp({});       
                me.$el.html(whymeTemp);
                me.turning();
            };
            util.getTemplateContains( url,
               ['whymeTemp'], 
               maintain.bind(me) ); 
		},

		binding : function() {
			var me = this;
			var emptyString = 'Drop a few line to make it personal…';
			me.tie( 'click', '.j_close', function(){
				me.back('index');
			} );
			me.tie( 'mouseover', '.j_personal', function(){
				var text = $(arguments[0].target).val() ;
				if( text == emptyString ){
					$(arguments[0].target).val('') ;
				}
			});
			me.tie( 'mouseout', '.j_personal', function(){
				var text = $(arguments[0].target).val() ;
				if( text == '' ){
					$(arguments[0].target).val( emptyString ) ;
				}
			});
			me.tie( 'click', '.j_why', function(){
				me.next('success');
			});
		},
		goBack : function(e) {
			this.back();
		},
		loadHTML : function() {
			var me = this;
		}
	};

	return whyMe;

});
