
// TODO: don't use flyObject in super class

define('superview', ["libs/hash", "libs/animation" ], function( Hash, animation ) {

    var SuperView;
    var storage= require('plugins/localstorage').instance();

    var proto = {
        // el: '.loan-root',
        pageUrl: null,
       
        $root: null,
        $container: null,
        interval: null,

        initialize: function( request, appliction, viewname ){//request, appliction, viewname
            var me = this;
            me.$el.addClass('sub-viewport');
            me.id = _.uniqueId('viewport');
            me.$el.attr('id', 'id_' + this.id);
            me.viewname = viewname;

            //S: only for weichat
            /*storage.storeData({
                'inner': viewname,
                'time': 0
            }, 'flyObject');*/
            //E: only for weichat

            //添加自定义pageid
            if (me.pageid) me.$el.attr('page-id', this.pageid);

            me.viewdata = {};
            me.appliction = appliction;
            me.request = request;

            me.$el.attr('page-url', this.request.viewpath);

            try {
                me.onCreate();
            } catch (e) {
                console.log(e);
            }
        },
        /**
         * [ be called by the forInstance function ]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        _onload: function( lastViewName ){
            document.activeElement && document.activeElement.blur();
            var me = this;
            me.$root = me.$el;              //TODO: delete it. this is just for the previous code.
            $('body').scrollTop(0,0);
            this.loadHTML(lastViewName);

            try{
                me.onLoad(lastViewName);
            }catch(e){
                 console.log(e);
            }

            this.binding();

            // this.turning();
        },
        _onhide: function(id){
            this.off();
            this.$el.hide();

            this.onHide && this.onHide(id);
//          this.hideHeadWarning();
//          //this.hideNoHeadWarning(;)
//          this.hideWarning();
//          this.hideLoading();
//          this.hideWarning404();
//          this.hideToast();
//          this.hideConfirm();
//          this.hideMessage();
            this.clearPlugins();
        },
        _onshow: function(){
            //在快速前进或是返回时，viewport会莫名其妙丢失view
            //这里强制判断，不存在则强行插入。
            if (!this.viewport.find('#id_' + this.id).length) {
                this.viewport.append(this.$el);
            }

            this.$el.show();
        
        	document.activeElement && document.activeElement.blur();
        	window.scrollTo(0, 0);
        	try {
                this.onShow && this.onShow();
            } catch (e) {
                 console.log(e);
            }
            this._sendUbt();
        },
        onShow: function( argus ){ },//argus: means the last view's name 
        onHide: function( argus ){ },//argus: means the last view's name 
        
        onCreate: function( argus ){ },
        /**
         * [use the template function to make the dom and plug it into the container ]
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        onLoad: function( argus ){
            //TODO: me.mainTemplate(data).appendTo(me.router.$viewport)
        },
        binding: function( argus ){ },
        tie: function( eventName, selector, listener ){
            this.$root.on(eventName + '.viewEvents', selector, listener.bind(this));
        },
        loadHeader: function(){ },
        loadHTML: function(){ },

        /**
         * 跳转绝对地址的url
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        jump:function( url, replace ){
            if (replace) {
                window.location.replace(url);
            } else {
                window.location.href = url;
            }
        },
        /**
         * this.off();
         * @param  {[type]} name [description]
         * @return {[type]}      [description]
         */
        off: function( name ){
            this.$root.off( name||'.viewEvents' );
        },
		next: function (url, replace) {
			this.appliction.next.apply(null, arguments);
		},
		back: function (url) {
			this.appliction.back.apply(null, arguments);
		},
        
        _sendUbt: function(){},
        _sendGa: function(){},
        _sendKenshoo: function(){},
        _sendMarin: function(){},

        getGuid: function () {
        },
        /**
        * 获得url中查询字符串，类似于get的请求参数
        * @param name {String} 要查询参数的key
        * @return {String}
        * @demo
        * #ticketlist/?name=value
        * var v = this.getQuery('name');
        * console.log(v);//value;
        *
        */
        getQuery: function (name) {
            return this.request.query[name] || null;
        },
        //reset the scroll position to previous
        restoreScrollPos: function () {
            window.scrollTo(this.scrollPos.x, this.scrollPos.y);
        },
        setTitle: function (title) {
            document.title = title;
        },
        addClass: function(name){
        	this.$root.addClass(name);
        },
        removeClass: function(name){
        	this.$root.removeClass(name);
        },
        //global use
        clearPlugins: function(){
            clearInterval(this.interval);
            this.turned = true;
        }
    };

/*    var options = {
        viewName: '',
        template: '',    //template url 
        templates: [],      //templates inside. templates[0]为主框架

    };*/


// superView = new SuperView();
    SuperView = function(options){
    	
    	this.setProperties();
    	this.bindEvent();
    };
    
    SuperView.prototype = {
    	setProperties: function(){
		  //view搜索目录
		  this.viewRootPath = W.VIEWS_PATH;
		  //默认view
		  this.defaultView = 'index';
		  //请求对象
		  this.request;
		  //当前视图路径
		  this.viewpath;
		  //主框架
		  this.mainframe;
		  //视图框架
		  this.viewport;
		  //状态框架
		  this.statedom;
		  //当前视图
		  this.curView;
		  //最后访问视图视图
		  this.lastView;
		
		  //提供给视图访问Appliction的接口
		  this.inteface = {
//		    loadView: _.bind(this.loadView, this),
		    next: _.bind(this.next, this),
		    back: _.bind(this.back, this)
		  };
		  //结构是否创建好
		  this.isCreate = false;
		  //hash的监听状态
		  this.stopListening = false;
		
		  //资源
		  this.timeoutres;
		  //上一次hash
		  this.lastHash = '';
		  //上一次完整hash
		  this.lashFullHash = '';
		  //hash是否改变
		  this.isChangeHash = false;
		
		  this.animations = animation;
		  //是否使用动画，这个属性只能控制单次是否开启动画
		  this.isAnimat = true;
		
		  this.animatSwitch = true;
				
		  //向前动画名
		  this.animForwardName = 'slideleft';
		  this.animBackwardName = 'slideright';
		  this.animNoName = 'noAnimate';
		
		  //动画名
		  this.animatName = this.animNoName;
		  		
		  //视图集
		  this.views = new Hash();
		  //历史记录
		  this.history = [];
		  this.path = [];
		  this.query = {};
		  this.viewMapping = {};
    	},
    	bindEvent: function () {
	    	requirejs.onError = function (e) {
	    		if (e && e.requireModules) {
	    			for (var i = 0; i < e.requireModules.length; i++) {
	    				console.log('抱歉，当前的网络状况不给力，请刷新重试!');
	    				break;
					}
				}
			};
			$(window).bind('hashchange', _.bind(this.onHashChange, this));
			
			//首次必须执行该方法加载相关view
			this.onHashChange();
	    },
	    onHashChange: function () {
            var href = window.history.length;
            this.history.push(window.location.href);
	        //首次为false，不在监听时候才能触发_onHashChange 切换view
            if (!this.stopListening) {
                var url = decodeURIComponent(window.location.hash.replace(/^#+/i, '')).toLowerCase();
                this._onHashChange(url);
            }
	    },
        _onHashChange: function (url, isForward) {
            url = url.replace(/^#+/i, '');
            var req = this.parseHash(url);      //get all information from the url
            this.localObserver(req, isForward);
        },        
	    startObserver: function () {
	    	this.stopListening = false;
	    },	
	    endObserver: function () {
            this.stopListening = true;
	    },
	    lastUrl: function () {
            if (this.history.length < 2) {
                return document.referrer;
            }else {
                return this.history[this.history.length - 2];
            }
	    },
        //处理URLhash
        parseHash: function (hash) {
            var fullhash = hash,
            hash = hash.replace(/([^\|]*)(?:\|.*)?$/img, '$1'),
            h = /^([^?&|]*)(.*)?$/i.exec(hash),
            vp = h[1] ? h[1].split('!') : [],
            viewpath = (vp.shift() || '').replace(/(^\/+|\/+$)/i, ''),
            path = vp.length ? vp.join('!').replace(/(^\/+|\/+$)/i, '').split('/') : this.path,
            q = (h[2] || '').replace(/^\?*/i, '').split('&'),
            query = _.clone(this.query), y, qn;

            this.isChangeHash = !!(!this.lastHash && fullhash === this.lashFullHash) || !!(this.lastHash && this.lastHash !== hash);

            if (q) {
                for (var i = 0; i < q.length; i++) {
                    if (q[i]) {
                        y = q[i].split('=');
                        y[1] ? (qn = y.shift(), query[qn] = y.join('=')) : (query[y[0]] = '');
                    }
                }
            }

            this.lastHash = hash;
            this.lashFullHash = fullhash;
            return {
                viewpath: viewpath,
                path: path,
                query: query,
                root: location.pathname + location.search,
                fullhash: fullhash  //get has and the params which located after '?', for instance: 'backlist?triptype=1&cabinflag=1024'
            };
            /*{
                "viewpath": "backlist",
                "path": [],
                "query": {
                    "triptype": "1",
                    "cabinflag": "1024"
                },
                "root": "/webapp/flight/",
                "fullhash": "backlist?triptype=1&cabinflag=1024"
            }*/
        },
        //hashchange观察函数，处理url，动画参数
        localObserver: function (req, isForward) {
            this.animatName = isForward ? 'slideleft': 'slideright';

            this.request = req;
            this.viewpath = this.request.viewpath || this.defaultView;  //defaultView is index
            this.request.viewpath = this.viewpath;
            this.switchView(this.viewpath);
        },
        //根据id以及页面的类
        //定义view的turing方法，这里不是直接放出去，而是通过app接口放出，并会触发各个阶段的方法
        //注意，这里是传递id，有可能乱跳，
        switchView: function (path) {
        	
            var id = path;
            var curView = this.views.getItem(id);//TODO

            //切换前的当前view，马上会隐藏
            var lastView = this.curView;

            //如果当前view存在则触发其onHide事件，做资源清理
            //但是如果当前view就是 马上要访问的view的话，这里就不会触发他的onHide事件
            //所以lastview可能并不存在
            if (lastView && lastView != curView) {
                this.lastView = lastView;
            }

            //如果当前view存在，则执行onload事件
            if (curView) {
                //如果当前要跳转的view就是当前view的话便不予处理
                if (curView == this.curView && this.isChangeHash == false) {
                    return;
                }
                //因为初始化只会执行一次，所以每次需要重写request
                curView.request = this.request;
                //这里有一个问题，view与view之间并不需要知道上一个view是什么，下一个是什么，这个接口应该在app中
                this.curView = curView;

                var lastViewName = (lastView || curView).viewname;
                this.curView._onload(lastViewName);     //这里已经有turning 方法了
            } else {
                //重来没有加载过view的话需要异步加载文件
                //此处快速切换可能导致view文件未加载结束，而已经开始执行其它view的逻辑而没有加入dom结构
                this.loadView( path, function (View) {
                	var options = {
						viewName: id+''
					};
                    curView = SuperView.forInstance( {
                        'request': this.request,
                        'view': View
                    }, this.inteface, id );

                    this.views.push(id, curView);//保存至队列

                    //这个是唯一需要改变的
                    curView.turning = _.bind(function () {
                        this.createViewPort(curView);
                        curView.viewport = this.viewport;            //XXX:if it's used

                        //触发inView的show outView 的hide
                        this.startAnimation(function (inView, outView) {
                            $(".sub-viewport").hide(), inView.$el.show()
                        });
                    }, this);

                    this.createViewPort(curView);

                    this.curView = curView;
                    var lastViewName = (lastView || curView).viewname;

                    this.curView._onload(lastViewName);

                });
            }
        },
        //创建dom结构
        createViewPort: function () {
            if (this.isCreate) return;
            var html = [
            '<div class="main-frame">',
                '<div class="main-viewport"></div>',
                '<div class="main-state"></div>',
            '</div>'
            ].join('');
            this.mainframe = $(html);
            this.viewport = this.mainframe.find('.main-viewport');
            this.statedom = this.mainframe.find('.main-state');
            var container = $('#main');
            container.empty();
            container.append(this.mainframe);
            this.isCreate = true;

            //_onshow 里面会把 el 放到 viewport里面去
        },
        //动画相关参数，这里要做修改，给一个noAnimat
        startAnimation: function (callback) {
          var inView = this.curView;
          var outView = this.lastView;

          //在此记录outview的位置，解决记录位置不靠谱问题
          if (outView) {
            outView.scrollPos = {
              x: window.scrollX,
              y: window.scrollY
            };
          }

          //当非app中则不使用动画
          if (!this.animatSwitch) this.isAnimat = false;

          if (!this.isAnimat) this.animatName = this.animNoName;

          this.timeoutres = this.animations[this.animatName] && this.animations[this.animatName].call(this, inView, outView, callback, this);

          //此参数为一次性，调用一次后自动打开动画
          this.isAnimat = true;
        },
        //加载view
        loadView: function (path, callback) {
            var me = this;
            requirejs([this.buildUrl(path)], function (View) {
                callback && callback.call(me, View);
            });
        },       
        
        buildUrl: function (path) {
          var mappingPath = this.viewMapping[path];
          return mappingPath ? mappingPath : this.viewRootPath + path;
        },
        
        next: function (url, replace, isNotAnimat) {
	      url = url.toLowerCase();
	      if (isNotAnimat) this.isAnimat = false;
	      this.endObserver();
	
	      if (replace) {
	        window.location.replace(('#' + url).replace(/^#+/, '#'));
	      } else {
	        window.location.href = ('#' + url).replace(/^#+/, '#');
	      }
	
	      this._onHashChange(url, true);
	
	      setTimeout(_.bind(this.startObserver, this), 1);
	    },
	
	    back: function (url, isNotAnimat) {
	      if (isNotAnimat) this.isAnimat = false;
	
	      var referrer = this.lastUrl();
	      if (url && (!referrer || referrer.indexOf(url) !== 0)) {
	        window.location.hash = url;
	      } else {
	        url = this.request.query['refer'];
	        if (url) {
	          window.location.href = url;
	        } else {
	          history.back();
	        }
	      }
	    }
    	
    };
        /////////////////////////////////////////////
    
    /**
     * [ Use the name space for Class management ]
     * @param  {[type]} options [description]
     * @return {[type]}         [description]
     */
    SuperView.forInstance = function( ){

        var option = $.extend( {}, proto, arguments[0].view );

        var View = Backbone.View.extend( option );

        var opts = arguments[1];

        var names = arguments[2].split("."), c = window, l = names.length, i = 0;

        while (i < l) {
            c = (c[names[i]] = c[names[i++]] || new View( arguments[0].request, opts, arguments[2] ) );
        }
//      c._onload(opts);

        return c;
    };

	return SuperView;

});
