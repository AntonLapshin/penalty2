define(['jquery', 'vk', 'plugins/format'], function ($, vk, format) {

    var ID_GROUP = '71627954',
        PHOTO = 'photo-71627954_332801553',
        APP_URL = 'https://vk.com/app4446829',
        MESSAGE = 'Занятое место на чемпионате мира: {0}. Попробуй свои силы в послематчевых пенальти на чемпионате мира 2014 {1}';


    function srcToHttps(src) {
        if (src.indexOf('http://cs') === -1) {
            return src.replace('http://', 'https://');
        }
        return "https://pp.vk.me/c" + src.replace("http://cs", "").replace(".vk.me", "");
    }

    function parseUser(data) {
        return { id: data.uid || data.id, img: srcToHttps(data.photo_50), name: data.first_name + ' ' + data.last_name };
    }

    return {
        init: function(){
            return $.Deferred(function(defer){
                VK.init(function(){
                    VK.init(function () {
                        defer.resolve();
                    }, function () {
                    }, '5.21');
                })
            })
        },

        getUserUrl: function(id){
            return 'https://vk.com/id' + id;
        },

        getUnknowImg: function(){
            return '//vk.com/images/deactivated_50.gif';
        },

        invite: function () {
            VK.callMethod('showInviteBox');
        },

        wallPost: function(place){
            return $.Deferred(function(defer){
                VK.api('wall.post', { attachments: PHOTO, message: format(MESSAGE, place, APP_URL)}, function (answer) {
                    defer.resolve(answer);
                });
            });
        },

        getUsers: function (ids) {
            return $.Deferred(function(defer){
                function handler(data){
                    if (data.error)
                        defer.resolve([]);
                    var users = [];
                    data.response.forEach(function (userData) {
                        users.push(parseUser(userData));
                    });
                    defer.resolve(users);
                }
                if (window.DEBUG)
                    handler({"response":[{"id":1,"first_name":"AAA","last_name":"BBB","photo_50":"http://cs421118.vk.me/v421118333/924b/C790w8WkLxE.jpg"}]});
                else VK.api('users.get', { user_ids: ids, fields: 'photo_50', name_case: 'Nom' }, handler);
            });
        },

        getFriendsUsers: function () {
            return $.Deferred(function(defer){
                VK.api('friends.getAppUsers', function (data) {
                    defer.resolve(data.response)
                });
            });
        },

        isUserInGroup: function (id) {
            return $.Deferred(function(defer){
                VK.api('groups.isMember', { user_id: id, group_id: ID_GROUP }, function (data) {
                    defer.resolve(data.response.member === 1);
                });
            });
        }
    }
});