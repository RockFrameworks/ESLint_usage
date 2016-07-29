/**
 */
define([], function() {
	var util = require('utility/util');
	var choose = {
		maskPinkTemp: '',
		onLoad : function(lasthash) {
			var me = this;
			var url = CONSTANT.templatePath('choose');
            var maintain = function(obj){
                var chooseTemp = obj.chooseTemp({});     
                me.maskPinkTemp =   obj.maskPinkTemp();
                me.$el.html(chooseTemp);
                me.turning();
            };
            util.getTemplateContains( url,
               ['chooseTemp', 'maskPinkTemp'], 
               maintain.bind(me) ); 
		},

		binding : function() {
			var me = this, flag=false;
			me.tie( 'click', '.j_close', function(){
				me.back('index');
			});
			
			me.tie( 'click', '.fansUl', function(e){
				if( e.target.className == 'icon facebook' ){
					window.open('https://www.facebook.com/profile.php?id=100003297571432');
					return;
				}
				if( e.target.tagName=='DIV' ){
					$(e.target).parent('.ctn').remove();
				}else if( e.target.tagName=='BUTTON' ){
					me.next('share?id=xxx');
				}
				if( (e.target.tagName =='LI'||e.target.tagName =='SPAN') && $(e.target).find('.ctn').length==0 ){
					me.$el.find('.ctn').remove();
					$(e.target).append(me.maskPinkTemp );
				}else{
					$(e.target).find('.ctn').remove();
				}
			});
		},
		goBack : function(e) {
			this.back();
		},
		loadHTML : function() {
			var me = this;
			
		}
	};

	return choose;

});
