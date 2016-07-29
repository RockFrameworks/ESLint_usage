/**
 *  
 */
define([], function() {

	var noticed = {
		onLoad : function(lasthash) {
			var me = this;
			me.turning();
		},

		binding : function() {
			var me = this;
			me.tie( 'click', '.j_pick', function(){
				me.next('whyme');
			} );
		},
		goBack : function(e) {
			this.back();
		},
		loadHTML : function() {
			var me = this;
			
			var POHTemp = $('.POHTemp').html();
			me.$el.html(POHTemp);
		}
	};

	return noticed;

});
