define(function(){

    var _socialNetwork;

    return {

        SOCIAL_NETWORKS: { vk: 'vk' },

        init: function(name){
            return $.Deferred(function(defer){
                require(['plugins/' + name], function(socialNetwork){
                    _socialNetwork = socialNetwork;
                    _socialNetwork.init().then(function(){
                        defer.resolve();
                    });
                });
            });
        },

        invite: function () {
            _socialNetwork.invite();
        },

        getUserUrl: function(id){
            return _socialNetwork.getUserUrl(id);
        },

        getUnknowImg: function(){
            return _socialNetwork.getUnknowImg();
        },

        wallPost: function(place){
            return _socialNetwork.wallPost(place);
        },

        getUsers: function (ids) {
            return _socialNetwork.getUsers(ids);
        },

        getFriendsUsers: function () {
            return _socialNetwork.getFriendsUsers();
        },

        isUserInGroup: function (id) {
            return _socialNetwork.isUserInGroup(id);
        }
    }
});