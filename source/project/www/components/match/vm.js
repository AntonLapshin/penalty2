define(['ko', 'text!./view.html'], function(ko, html) {

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

        show: function (teams, teamA, teamB) {
            this.teams = teams;
            this.firstTeam(-1);
            this.isBallotVisible(true);
            this.isBeginVisible(false);
            this.isVisible(true);
            this.teamA(teamA);
            this.teamB(teamB);

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