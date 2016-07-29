
define(function(){

    var Storage = {

        init: function(){
            var me = Storage;
            me.oStorage = null;

            //this.init();
            try {
                me.oStorage = window.localStorage ? window.localStorage : window.globalStorage[strDomain];
            } catch (err) {
                console.log(err.message ? err.message : err.toString()) ;
            }
            window.onstorage = me.storageHandler
        },
        setItem: function (key, value) {
            Storage.oStorage.setItem('CRF_'+ key, value) ;
        },
        getItem: function(key){
            return Storage.oStorage.getItem('CRF_'+ key);
        },
        removeItem: function(key){
            Storage.oStorage.removeItem('CRF_'+ key)
        },
        storageHandler: function(event){
            event.key;
            event.oldValue;
            event.newValue;
            event.url;
        },
        storeData: function(name, obj ){
            var loanObject = {};
            var storageName = 'CRF_' + (name||'loanObject');

            if( Storage.oStorage.getItem(storageName) ){
                loanObject = JSON.parse(Storage.oStorage.getItem(storageName));
            }

            loanObject = $.extend({}, loanObject, obj);

            Storage.oStorage.setItem(storageName, JSON.stringify(loanObject) );

            // alert(JSON.stringify(loanObject) );

            return loanObject;
        },
        instance: function(){
            Storage.init();

            window.Storage = window.Storage ||Storage;
            return Storage;
        }
    };

    return Storage;
});