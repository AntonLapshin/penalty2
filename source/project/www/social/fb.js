define(['jquery', 'fb', 'plugins/format'], function ($, fb, format) {

    var APP_ID = '381019665399908';

    //var ID_GROUP = '71627954',
    //    PHOTO = 'photo-71627954_332801553',
    //    APP_URL = 'https://vk.com/app4446829',
    //    MESSAGE = 'Занятое место на чемпионате мира: {0}. Попробуй свои силы в послематчевых пенальти на чемпионате мира 2014 {1}';

    var PATHS = {
        GET_FRIENDS: '/me/friends?fields=name,picture.width(50).height(50)',
        GET_USERS: '?fields=name,picture.width(50).height(50)&ids={0}',
        GET_ME: 'me?fields=name,picture.width(50).height(50)'
    };

    function parseUser(data) {
        return { id: data.id, img: data.picture.data.url, name: data.name };
    }

    return {
        init: function () {
            return $.Deferred(function (defer) {
                FB.init({
                    appId : APP_ID
                });
                FB.login(function(){
                    defer.resolve();
                }, {
                    scope: 'user_friends,publish_actions'
                });
            })
        },

        getUserUrl: function (id) {
            return '//www.facebook.com/' + id;
        },

        getUnknowImg: function () {
            return '//fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/c15.0.50.50/p50x50/1379841_10150004552801901_469209496895221757_n.jpg?oh=42bb667fb563ed534944a33a8a6ddb70&oe=54FFCC33&__gda__=1427197980_25dc5798d0771c03aef7a074e8a38c99';
        },

        invite: function () {
            var options = {
                method: 'apprequests',
                message: 'Invite your friends'
            };
            FB.ui(options, function(response) { });
        },

        showOrderBox: function () {
            alert('showOrderBox');
            //return $.Deferred(function (defer) {
            //    VK.addCallback('onOrderSuccess', function (order_id) {
            //        defer.resolve();
            //    });
            //    VK.addCallback('onOrderFail', function () {
            //        defer.reject('fail');
            //    });
            //    VK.addCallback('onOrderCancel', function () {
            //        defer.reject('cancel');
            //    });
            //
            //    VK.callMethod('showOrderBox', {
            //        type: 'votes',
            //        votes: 1
            //    });
            //});
        },

        wallPost: function (place) {
            //FB.api('/me/feed', 'post', {message: 'Hello, world!'});
            alert('wallPost');
            defer.resolve(answer);
            return $.Deferred(function (defer) {
                VK.api('wall.post', { attachments: PHOTO, message: format(MESSAGE, place, APP_URL)}, function (answer) {
                    defer.resolve(answer);
                });
            });
        },

        getMe: function(){
            return $.Deferred(function (defer) {
                FB.api(PATHS.GET_ME, function(response){
                    if (!response){
                        defer.resolve([]);
                        return;
                    }
                    defer.resolve([parseUser(response)]);
                });
            });
        },

        getUsers: function (ids) {
            if (ids && ids.length === 1)
                return this.getMe();

            return $.Deferred(function (defer) {

                var users = [],
                    url = format(PATHS.GET_USERS, ids.join(','));

                FB.api(url, function(response){
                    if (!response){
                        defer.resolve([]);
                        return;
                    }
                    ids.forEach(function(id){
                        var user = response[id];
                        if (!user) return;
                        users.push(parseUser(user));
                    });
                    defer.resolve(users);
                });
            });
        },

        getFriendsUsers: function () {
            return $.Deferred(function (defer) {
                var users = [];
                FB.api(PATHS.GET_FRIENDS, function(response){
                    if (!response || !response.data || response.data.length === 0){
                        defer.resolve([]);
                        return;
                    }
                    response.data.forEach(function(user){
                        users.push(parseUser(user));
                    });
                    defer.resolve(users);
                });
            });
        }
    }
});