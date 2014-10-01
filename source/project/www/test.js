requirejs.config({
    paths: {
        physics: '//cdn.jsdelivr.net/physicsjs/0.6.0/physicsjs.full.min',
        tween: 'vendor/tween',
        howler: '//cdnjs.cloudflare.com/ajax/libs/howler/1.1.17/howler.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug',
        text: 'vendor/text',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        vk: '//vk.com/js/api/xd_connection'
    }
});

window.DEBUG = false;

require([
    'ko',
    'text',
    'plugins/loader',
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
    'components/game/vm',
    'components/scores/vm',
],
    function (ko, text, loader, timer, sound, info, member, top, team, load, intro, choice, instruction, tournament, match, result, game, scores) {
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
        ko.components.register('game', game);
        ko.components.register('scores', scores);

        ko.applyBindings({});

        loader.load(loader.resources.GAME).then(function(){
            //timer.viewModel().test();
            sound.viewModel().test();
            //info.viewModel().test();
            //member.viewModel().test(); is no need
            //top.viewModel().test();
            //team.viewModel().test(); is no need
            //load.viewModel().test();
            //intro.viewModel().test();
            //choice.viewModel().test();
            //instruction.viewModel().test();
            //tournament.viewModel().test();
            //match.viewModel().test();
            //result.viewModel().test();
            //scores.viewModel().test();
            //game.viewModel().test();
        });
    });

