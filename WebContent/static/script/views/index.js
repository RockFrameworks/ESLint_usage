/**
 */
define(['utility/util'], function(util) {

	var Index = {
		pageid : 1,
		onCreate : function() {
			//this.render();
			console.log('index on create-');
		},

		onLoad : function(lasthash) {
			var me = this;
			me.turning();			
		},

		binding : function() {
			var me = this;
			me.tie( 'click', '.j_poh', me.goNext );
		},
		goNext : function(viewname) {
			var me = this;
			me.next('noticed');
		},
		goBack : function(e) {
			this.back();
		},
		loadHTML : function() {
			var me = this;
			var indexTemp = $('.indexTemp').html();
			me.$el.html(indexTemp);
		}
	};

	return Index;

});
