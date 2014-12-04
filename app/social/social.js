define(function(){

    var _socialNetwork;

    return {

        init: function(socialNetwork){
            _socialNetwork = socialNetwork;
            return _socialNetwork.init();
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