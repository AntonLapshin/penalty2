define(function(){

    var _server,
        _resuests = {
            loadTopUsers: {
                lastDateTime: 0,
                data: null,
                timeout: 5 * 1000 * 60
            }
        };

    return {

        init: function(server){
            _server = server;
            return server.init();
        },

        loadUsers: function(users){
            return _server.loadUsers(users);
        },

        loadTopUsers: function(){
            if (Date.now() - _resuests.loadTopUsers.lastDateTime > _resuests.loadTopUsers.timeout)
                return _server.loadTopUsers();

            return $.Deferred(function(defer){
                defer.resolve(_resuests.loadTopUsers.data);
            });
        },

        saveUser: function(userSetExp){
            return _server.saveUser(userSetExp);
        }
    }
});