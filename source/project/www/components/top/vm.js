define(['ko', 'text!./view.html', 'plugins/players', 'components/member/vm'], function(ko, html, players, member) {

    var MAX_PLAYERS = 10;

    function sortRule(a, b) {
        return b.score - a.score;
    }

    var _viewModel = {
        isVisible: ko.observable(false),
        isLoaded: ko.observable(false),

        myself: null,
        players: ko.observableArray(),
        allTop: [],
        friendsTop: [],

        load: function (myself) {
            this.myself = myself;
            this.players.push(myself);
            for (var i = 0; i < MAX_PLAYERS; i++) {
                this.players.push(players.newPlayer());
            }
            this.toFriendsTop();
        },

        setVisiblePlayers: function (players) {
            players.sort(sortRule);
            this.players(players);
            if (this.isLoaded() === false) {
                var self = this;
                setTimeout(function () {
                    self.isLoaded(true);
                    if (self.isVisible() === false)
                        self.isVisible(true);
                }, 100);
            }
        },

        sort: function () {
            this.setVisiblePlayers(this.players());
        },

        toAllTop: function () {
            if (this.allTop.length !== 0) {
                this.setVisiblePlayers(this.allTop);
                return;
            }

            var self = this;

            players.getTopPlayers().then(function (players) {
                for (var i = 0; i < MAX_PLAYERS; i++) {
                    if (players[i])
                        players[i].place = i;

                    self.allTop.push(players[i] ? players[i] : players.newPlayer());
                }
                self.setVisiblePlayers(self.allTop);
            });
        },

        toFriendsTop: function () {
            if (this.friendsTop.length !== 0) {
                this.setVisiblePlayers(this.friendsTop);
                return;
            }

            var self = this;

            players.getFriendsPlayers().then(function (result) {
                self.friendsTop.push(self.myself);
                for (var i = 1; i < MAX_PLAYERS - 1; i++) {
                    self.friendsTop.push(result[i] ? result[i] : players.newPlayer());
                }
                self.setVisiblePlayers(self.friendsTop);
            });
        },

        test: function(){
            this.setVisiblePlayers([{"id":253300936,"img":"https://pp.vk.me/c618421/v618421936/12aa1/RTXvKzOd65E.jpg","name":"Mikha Pogodin","score":19811,"goals":1274,"miss":0,"exp":166,"place":0},{"id":60981233,"img":"https://pp.vk.me/c306409/v306409233/3581/UAvmuA-GaBo.jpg","name":"Denis Shevchenko","score":17238,"goals":498,"miss":0,"exp":38,"place":1},{"id":128954165,"img":"https://pp.vk.me/c6011/v6011165/464/9qbDEij68Uc.jpg","name":"Valentin Cherny","score":17143,"goals":508,"miss":0,"exp":31,"place":2},{"id":30436043,"img":"https://pp.vk.me/c620823/v620823043/190fc/LJjNunV8d7c.jpg","name":"Anton Chaldaev","score":16836,"goals":323,"miss":0,"exp":33,"place":3},{"id":189462609,"img":"https://pp.vk.me/c407822/v407822609/b820/bWlD4bP140g.jpg","name":"Andrey Moerchuk","score":16736,"goals":250,"miss":0,"exp":29,"place":4},{"id":43065119,"img":"https://pp.vk.me/c616030/v616030119/17bb4/-Mf2RNRB04k.jpg","name":"Marsel Khakimov","score":16709,"goals":250,"miss":0,"exp":29,"place":5},{"id":140340700,"img":"https://pp.vk.me/c619420/v619420700/b913/i5LtaPd0NCg.jpg","name":"Andriy Rozman","score":16629,"goals":289,"miss":0,"exp":10,"place":6},{"id":169565629,"img":"https://pp.vk.me/c619116/v619116629/17703/4Und2nzDjzI.jpg","name":"Danik Boychuk","score":16602,"goals":212,"miss":0,"exp":12,"place":7},{"id":202248005,"img":"https://pp.vk.me/c614726/v614726005/202ac/f9GMc_cX_CY.jpg","name":"Kristian Gitsba","score":16592,"goals":127,"miss":0,"exp":21,"place":8},{"id":138225721,"img":"https://pp.vk.me/c319424/v319424721/df64/VjDpInEQtuM.jpg","name":"Pavel Taratynov","score":16551,"goals":490,"miss":0,"exp":76,"place":9}]);
        }
    };

    function ViewModel(){
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});