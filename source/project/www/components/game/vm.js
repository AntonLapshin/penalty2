define([
    'ko',
    'text!./view.html',
    'c/scores/vm',
    'c/psychic/vm',
    'c/twist/vm',
    'engine/game',
    'plugins/localization'
], function (ko, html, scores, psychic, twist, game, strings) {

    $('*').on('selectstart', function () {
        return false;
    });

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        isVisibleMeta: ko.observable(false),
        text: ko.observable(''),

        show: function (teamA, teamB, moveTeamAB, playerTeamAB) {
            scores.viewModel().show(teamA, teamB, playerTeamAB, moveTeamAB);
            psychic.viewModel().show();

            var self = this;

            function showMessage(text, next) {
                self.text(text);
                self.isVisibleMeta(true);
                setTimeout(function () {
                    self.isVisibleMeta(false);
                    if (next != undefined)
                        next();
                }, 2000);
            }

            function eventHandler(state) {
                switch (state) {
                    case 'loaded':
                        self.isVisible(true);
                        game.start(scores.viewModel().getRound(), playerTeamAB === scores.viewModel().getMoveTeamAB());
                        break;
                    case 'start':
                        self.isVisible(true);
                        showMessage(playerTeamAB === scores.viewModel().getMoveTeamAB() ? strings.turnPlayer() : strings.turnComputer());
                        break;
                    case 'goal':
                        game.stop(1500);
                        showMessage(strings.goal(), function () {
                            result(true);
                        });
                        break;
                    case 'end':
                        game.stop(0);
                        showMessage(strings.miss(), function () {
                            result(false);
                        });
                        break;
                    case 'crossbar':
                        showMessage(strings.crossbar());
                        break;
                }
            }

            function result(isGoal) {
                if (window.cfg.debug){
                    self.isVisible(false);
                    scores.viewModel().isVisible(false);
                    psychic.viewModel().isVisible(false);
                    _defer.resolve(1, 0);
                    return;
                }
                var text = scores.viewModel().next(isGoal);

                if (!text){
                    game.start(scores.viewModel().getRound(), playerTeamAB === scores.viewModel().getMoveTeamAB());
                    return;
                }

                showMessage(text, function () {
                    self.isVisible(false);
                    psychic.viewModel().isVisible(false);
                    scores.viewModel().isVisible(false);
                    _defer.resolve(scores.viewModel().goalsA(), scores.viewModel().goalsB());
                });
            }

            game.load().progress(eventHandler);

            return $.Deferred(function (defer) {
                _defer = defer;
            });
        },

        test: function () {
            var self = this;
            require(['plugins/options', 'plugins/loader'], function (options, loader) {
                loader.load(loader.resources.ENGINE).then(function () {
                    self.show(options.teams[0], options.teams[1], 'B', 'A').
                        then(function (goals1, goals2) {
                            alert(goals1 + ' : ' + goals2);
                        });
                });
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    var component = {viewModel: ViewModel, template: html};
    if (!ko.components.isRegistered('game'))
        ko.components.register('game', component);
    return component;
});