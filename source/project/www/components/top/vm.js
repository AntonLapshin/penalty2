define([
    'ko',
    'text!./view.html',
    'controllers/users',
    'model/user',
    'localization/strings'
], function (ko, html, UsersController, User, strings) {

    var MAX_VISIBLE_PLAYERS = 9;

    function sortRule(a, b) {
        return b.score - a.score;
    }

    var _viewModel = {
        isVisible: ko.observable(false),

        myself: null,
        users: ko.observableArray(),
        visibleUsers: ko.observableArray(),
        page: ko.observable(0),
        linkTopFriends: strings.linkTopFriends,
        linkTopAll: strings.linkTopAll,

        show: function (myself) {
            this.myself = myself;
            this.toFriendsTop();
            this.isVisible(true);
        },

        setVisibleUsers: function (users) {
            users = [this.myself].concat(users);
            users.sort(sortRule);
            users.forEach(function (user, index) {
                user.place = index;
            });
            this.users(users);

            var result = [];
            for (var i = this.page() * MAX_VISIBLE_PLAYERS, j = 0; i < this.users().length && j < MAX_VISIBLE_PLAYERS; i++, j++) {
                result.push(this.users()[i]);
            }
            this.visibleUsers(result);
        },

        toAllTop: function () {
            this.getUsers(UsersController.getTopUsers);
        },

        toFriendsTop: function () {
            this.getUsers(UsersController.getFriendsUsers);
        },

        getUsers: function (method) {
            var self = this;
            method().then(function (users) {
                self.setVisibleUsers(users);
            });
        },

        test: function () {
            var self = this;

            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            UsersController.getOneUser(1)
                .then(function (user) {
                    self.show(user);
                });
        }
    };

    var _self = _viewModel;

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});