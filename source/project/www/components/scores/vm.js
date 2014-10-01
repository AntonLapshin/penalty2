define(['ko', 'text!./view.html'], function (ko, html) {

    var _step,
        _moveTeamAB,
        _round;

    function random(min, max) {
        return (Math.random() * (max - min) + min) | 0
    }

    var _viewModel = {
        isVisible: ko.observable(false),
        teamA: ko.observable(null),
        teamB: ko.observable(null),
        goalsA: ko.observable(0),
        goalsB: ko.observable(0),
        rounds: ko.observableArray([]),

        getRound: function(){
            return this.rounds.length;
        },

        getMoveTeamAB: function(){
            return _moveTeamAB;
        },

        newRound: function(){
            _round = {
                A: ko.observable('none'),
                B: ko.observable('none')
            };
            this.rounds.push(_round);
        },

        show: function (teamA, teamB, firstTeamAB) {
            _moveTeamAB = firstTeamAB;
            _step = 1;

            this.rounds = ko.observableArray([]);

            this.isVisible(true);
            this.teamA(teamA);
            this.teamB(teamB);

            this.newRound();
            _round[_moveTeamAB]('move');
        },

        next: function (isGoal) {
            _round[_moveTeamAB](isGoal ? 'goal' : 'miss');
            if (_step % 2 === 0){
                this.newRound();
            }
            if (isGoal) {
                if (_moveTeamAB === 'A')
                    this.goalsA(this.goalsA() + 1);
                else
                    this.goalsB(this.goalsB() + 1);
            }
            if (_step >= 10 && _step % 2 === 0 && Math.abs(this.goalsA() - this.goalsB()) > 0) {
                var text = _moveTeamAB == 'A' ?
                    this.goalsA() > this.goalsB() ? 'Победа!' : 'Поражение' :
                    this.goalsA() > this.goalsB() ? 'Поражение' : 'Победа!';

                return text;
            }
            _step++;
            _moveTeamAB = _moveTeamAB === 'A' ? 'B' : 'A';
            _round[_moveTeamAB]('move');
            return null;
        },

        test: function () {
            var self = this;
            require(['plugins/options'], function (options) {
                self.show(options.teams[2], options.teams[3], 'A');
                var interval = setInterval(function () {
                    var result = self.next(random(0, 2) === 1);
                    if (result){
                        clearInterval(interval);
                        alert('result');
                    }
                }, 1000)
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});