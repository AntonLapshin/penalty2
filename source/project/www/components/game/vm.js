define(['ko', 'text!./view.html', 'engine/game', 'components/scores/vm'], function (ko, html, game, scores) {

    $('*').on('selectstart', function () {
        return false;
    });

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        isVisibleMeta: ko.observable(false),
        text: ko.observable(''),

        show: function (teamA, teamB, moveTeamAB, playerTeamAB) {
            scores.viewModel().show(teamA, teamB, moveTeamAB);
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
                        showMessage(playerTeamAB === scores.viewModel().getMoveTeamAB() ? 'Удар вашей команды' : 'Удар соперника');
                        break;
                    case 'goal':
                        game.stop(1500);
                        showMessage('Гол!', function () {
                            result(true);
                        });
                        break;
                    case 'end':
                        game.stop(0);
                        showMessage('Промах', function () {
                            result(false);
                        });
                        break;
                    case 'crossbar':
                        showMessage('Штанга!');
                        break;
                }
            }

            function result(isGoal) {
                var text = scores.viewModel().next(isGoal);

                if (!text){
                    game.start(scores.viewModel().getRound(), playerTeamAB === scores.viewModel().getMoveTeamAB());
                    return;
                }

                showMessage(text, function () {
                    self.isVisible(false);
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
                    self.show(options.teams[0], options.teams[1], 'A', 'B').
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

    return { viewModel: ViewModel, template: html };
});