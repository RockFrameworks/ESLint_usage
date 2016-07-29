define(function(require) {

	var Util;
    var Storage= require('plugins/localstorage');

    var storage = Storage.instance();
	
	/**
     * make a ajax request
     * @param {string} method
     * @param {string} url
     * @param {object} params
     * @return {jQueryDeferred}
     */
    var fnAjax = function( method, url, params ){
        
        return $.ajax({
            url: CONSTANT.preUrl+ url,
            type: method,
            // headers:{
            // },
            data: (method=='get'?params.data:JSON.stringify(params.data) ),
            dataType : "json",       //'jsonp',
            // timeout: 5000,
            cache: false,
            contentType: "application/json;charset=UTF-8",
            success: function(data, status){
                params.success && params.success(data);
            },
            error: function(xhr, type, error_thrown){
            	
            },
            beforeSend:function(xhr){
            },
            complete:function(param){
            	
            }
        });
    };
    
	Util = {
		getUrlParams: function() {
			var url = location.search;
			var theRequest = {};
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for (var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		},
		createCallback : function(fn, argu) {
			var me = this;
			return function() {
				fn.call(me, arguments);
			};
		},
		require : function(url, fn) {
			var str = '';
			require( [url ], Util.createCallback(fn));
		},
		/**
		 * When create the module, get the doms from the template by one time.
		 * ids: [ 'id1', 'id2' ]. the classes of script/template based on $
		 * already loaded.
		 */
		getTemplateContains : function( url, ids, func ) {

            var obj = {},
                ctn = $('.fragement'),
                fn = function(argus ) {
    				ctn.append( argus[0] );
    				for ( var i in ids ) {
    					obj[ids[i]] = _.template($('.' + ids[i]).html());
    				}
                    func(obj);
                    ctn.html('');
    			};
			Util.require(url, fn);
		},
        /**
         * make a post request
         * @param {string} url
         * @param {object} params
         * @return {jQueryDeferred}
         */
        post: function( url,params ){
			return fnAjax( 'post', url, params );
        },

        /**
         * make a get request
         * @param {string} url
         * @param {object} params
         * @return {jQueryDeferred}
         */
        get: function(url, params){
        	return fnAjax( 'get', url, params );
        },
        put: function( url,params ){
            return fnAjax( 'put', url, params );
        },
        /**
         * specific: the dow of  .j_singlePopup and .j_singlePopup must be available.
         * @param {Object} viewPort
         */
        popUp: function (viewPort, msg) {
            var j_popupCtn = viewPort.find('.j_singlePopup .j_popupCtn');
            var j_singlePopup = viewPort.find('.j_singlePopup');
            try {
                if (j_singlePopup.scrollTo != undefined) {
                    j_singlePopup.scrollTo(0);
                }

            } catch (e) {

            }

            var bodyScrollY = document.body.scrollTop;
            var resetScrollFn = function (e) {
                document.body.scrollTop = bodyScrollY;
            };
            this.resetScrollFn = resetScrollFn;
            $(document).bind('scroll', this.resetScrollFn);

            j_popupCtn.html(msg);
            var parent = j_singlePopup.removeClass('js_hide').show().on('click', function () {
                $(this).addClass('js_hide');
                $(document).unbind('scroll', resetScrollFn);
            });
        },
        /**
         * 获取命名空间
         * @param {Object} name 
         * @param {Object} exec 执行的构造函数. 不需要 new来初始化
         */
        namespace: function (name, exec) {
            var names = name.split("."), c = window, l = names.length, i = 0;
            while (i < l) {
                c = (c[names[i]] = c[names[i++]] || {});
            }
            if (exec) {
                exec.call(c);
            } else {
                return c;
            }
        }
	};
	return Util;
});