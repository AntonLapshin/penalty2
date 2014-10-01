define(function () {

    var PHOTO = 'photo-71627954_332801553',
        APP_URL = 'https://vk.com/app4446829',
        MESSAGE = 'Занятое место на чемпионате мира: {0}. Попробуй свои силы в послематчевых пенальти на чемпионате мира 2014 {1}';

    return {
        start: function () {
            require([
                'ko',
                'plugins/loader',
                'plugins/options',
                'plugins/vk',
                'plugins/format',
                'components/timer/vm',
                'components/sound/vm',
                'components/info/vm',
                'components/member/vm',
                'components/top/vm',
                'components/team/vm',
                'components/load/vm',
                'components/intro/vm',
                'components/choice/vm',
                'components/instruction/vm',
                'components/tournament/vm',
                'components/match/vm',
                'components/result/vm',
                'components/scores/vm',
                'components/game/vm'
            ],
                function (ko, loader, options, vk, format, timer, sound, info, member, top, team, load, intro, choice, instruction, tournament, match, result, scores, game) {

                    ko.components.register('timer', timer);
                    ko.components.register('sound', sound);
                    ko.components.register('info', info);
                    ko.components.register('member', member);
                    ko.components.register('top', top);
                    ko.components.register('team', team);
                    ko.components.register('load', load);
                    ko.components.register('intro', intro);
                    ko.components.register('choice', choice);
                    ko.components.register('instruction', instruction);
                    ko.components.register('tournament', tournament);
                    ko.components.register('match', match);
                    ko.components.register('result', result);
                    ko.components.register('scores', scores);
                    ko.components.register('game', game);

                    ko.applyBindings({});

                    loader.load(loader.resources.GAME)
                        .then(function () {
                            return options.load();
                        })
                        .then(function () {
                            info.viewModel().init(options.player);
                            timer.viewModel().show(options.player.last);
                            sound.viewModel().show();
                            return top.viewModel().load(options.player);
                        })
                        .then(function () {
                            //todo: play soundtrack
                            return intro.viewModel().show();
                        })
                        .progress(function (type) {
                            if (type === 'rules') {
                                info.viewModel().isVisible(false);
                                intro.viewModel().isVisible(false);
                                instruction.viewModel().show()
                                    .then(function () {
                                        intro.viewModel().isVisible(true);
                                    });
                                return;
                            }

                            if (timer.viewModel().highlight())
                                return;

                            intro.viewModel().isVisible(false);
                            //options.save();
                            info.viewModel().isVisible(false);
                            top.viewModel().isVisible(false);

                            var _playerTeamIndex,
                                _firstTeamIndex,
                                _firstTeamAB,
                                _playerTeamAB;

                            choice.viewModel().show(options.teams)
                                .then(function (playerTeamIndex) {
                                    _playerTeamIndex = playerTeamIndex;
                                    options.init(playerTeamIndex);
                                    return tournament.viewModel().show(options.teams, playerTeamIndex);
                                })
                                .progress(function (type, args) {
                                    if (type === 'end') {
                                        var place = args;
                                        options.upgrade();
                                        var score = (17 - place) * 1000 + options.goals * 10 + options.player.exp * 15 + options.player.goals;
                                        if (score > options.player.score)
                                            options.player.score = score;
                                        //options.save();
                                        vk.wallPost('photo-71627954_332801553', format(MESSAGE, place, APP_URL)).then(
                                            function () {
                                                top.viewModel().isVisible(true);
                                                top.viewModel().sort();
                                                result.viewModel().show();
                                            }
                                        );
                                        return;
                                    }
                                    // --------------------------------------------------------------------- NEW MATCH
                                    match.viewModel().show(options.teams, args.pair.teamA, args.pair.teamB)
                                        .then(function (firstTeamIndex) {
                                            _firstTeamIndex = firstTeamIndex;
                                            return $.when.apply($, [
                                                loader.load(loader.resources.ENGINE, function(percent) {
                                                    load.viewModel().onPercentChanged(percent);
                                                }),
                                                load.viewModel().show('Начать игру')
                                            ]);
                                        })
                                        .then(function () {
                                            _firstTeamAB = _firstTeamIndex === args.pair.teamA ? 'A' : 'B';
                                            _playerTeamAB = _playerTeamIndex === args.pair.teamA ? 'A' : 'B';

                                            return game.viewModel().show(
                                                options.teams[args.pair.teamA],
                                                options.teams[args.pair.teamB],
                                                _firstTeamAB,
                                                _playerTeamAB
                                            );
                                        })
                                        .then(function(goalsA, goalsB){
                                            args.goalsA = goalsA;
                                            args.goalsB = goalsB;
                                            if (_playerTeamAB == 'A'){
                                                options.goals += goalsA;
                                                options.miss += goalsB;
                                            }
                                            tournament.viewModel().matchEnded(args)
                                        })
                                })
                        })
                });
        }
    };
});