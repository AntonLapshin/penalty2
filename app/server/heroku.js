define(['jquery', 'plugins/ajax'], function ($, ajax) {

    return {
        init: function () {
            return $.Deferred(function (defer) {
                defer.resolve();
            })
        },

        loadUsers: function(users){
            return ajax.callAjax('scores', { ids: users })
        },

        loadTopUsers: function(){
            return ajax.callAjax('top', null);
        },

        saveUser: function(userSetExp){
            return ajax.callAjax('upsert', userSetExp);
        }
    }
});