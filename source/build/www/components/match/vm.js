define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    function random(min, max) {
        return (Math.random() * (max - min) + min) | 0
    }

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        isBallotVisible: ko.observable(true),
        isBeginVisible: ko.observable(false),

        teamA: ko.observable(-1),
        teamB: ko.observable(-1),
        firstTeam: ko.observable(-1),
        teams: null,
        firstTurn: strings.firstTurn,
        drawLot: strings.drawLot,
        btnStart: strings.btnStart,

        show: function (teams, teamA, teamB) {
            this.teams = teams;
            this.isBallotVisible(true);
            this.isBeginVisible(false);

            // Clear all teams for recreate them in a new match.
            this.firstTeam(-1);
            this.teamA(-1);
            this.teamB(-1);

            this.teamA(teamA);
            this.teamB(teamB);

            this.isVisible(true);

            return $.Deferred(function(defer){
                _defer = defer;
            });
        },

        beginGame: function () {
            this.isVisible(false);
            _defer.resolve(this.firstTeam());
        },

        ballot: function () {
            this.isBeginVisible(true);
            this.isBallotVisible(false);
            this.firstTeam(random(0, 2) === 0 ? this.teamA() : this.teamB());
        },

        test: function(){
            var self = this;

            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            require(['plugins/options'], function(options){
                self.show(options.teams, 1, 2).then(function(firstTeam){
                    alert('First turn team is ' + firstTeam);
                })
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});