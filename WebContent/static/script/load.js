var DEBUG_MODE = 0;

/**
 */
try {
	var checkURL = function() {
		if (localStorage.getItem('_debug') == 1) {
			DEBUG_MODE = 1;
		}

		var a = location.search.split('&');
		for (var i in a) {
			if (a[i].indexOf('debug') > -1) {//match: "?debug=1 || debug"
				DEBUG_MODE = 1;
				localStorage.setItem('_debug', '1');
			} else {
				DEBUG_MODE = 0;
				localStorage.setItem('_debug', '0');
			}

			if (a[i].indexOf('maintain') > -1) {//match:'?maintain=1'
				switch( a[i].split('=')[1] ) {
				case '1':
					localStorage.clear();
					break;
				}
			}
		}
	}();
} catch(e) {
	console.log(e, 'in load.js');
}

// DEBUG_MODE = 1;		//TODO: delete it before published online
window.VERSION = '' + ( DEBUG_MODE ? new Date().valueOf() : '20160622');

var addScript = function(url) {
	var script = document.createElement('script');
	script.setAttribute('src', url);
	document.getElementsByTagName('body')[0].appendChild(script);
};

$(function() {
	$('link').attr('href', function(n, v) {
		return v.replace('.css', ('.css?v=' + window.VERSION));
	});
});

addScript('./script/main.js?v=' + window.VERSION);
