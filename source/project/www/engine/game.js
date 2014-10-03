define([
    'physics',
    'engine/viewport',
    'engine/background',
    'engine/ball',
    'engine/objects',
    //'engine/camera',
    'engine/Points',
    'engine/arrow',
    'engine/goalkeeper',
    'engine/bullet',
    'engine/collisions',
    'plugins/audio',
    'components/twist/vm'
],
    function (Physics, viewport, background, ball, objects, //camera,
              Points, arrow, goalkeeper, bullet, collisions, audio, twist) {

        var WIDTH = 700,
            HEIGHT = 800;

        var _defer,
            _world;

        function _setWorldState(state) {
            _world.state = state;
            _defer.notify(state);
        }

        return{

            start: function (round, isAttack) {
                _world.round = round;
                _world.isAttack = isAttack;
                if (isAttack)
                    twist.viewModel().show();
                Physics.util.ticker.start();
                audio.play('stadium');
                //camera.toPoint(Points.PenaltyCamera);
                ball.toStart();
                goalkeeper.toStart();
                _setWorldState('start');
            },

            stop: function (delay) {
                setTimeout(function () {
                    audio.stop();
                    Physics.util.ticker.stop();
                }, delay);
            },

            load: function () {
                return $.Deferred(function(defer){
                    _defer = defer;
                    viewport.init(WIDTH, HEIGHT)
                        .then(function (world) {
                            _world = world;

                            background.init(world, WIDTH, HEIGHT);
                            ball.init(world);
                            goalkeeper.init(world);
                            objects.init(world);
                            arrow.init(world);
                            //camera.init(world, WIDTH, HEIGHT, 2512, 2250);
                            bullet.init(world);
                            collisions.init(world);

                            world.on('arrow:ready', function () {
                                world.ball.twist = twist.viewModel().twistvalue();
                                _setWorldState('strike');
                                audio.play('strike');
                                twist.viewModel().hide();
                                ball.strike(arrow.strikeVector);
                                goalkeeper.jump(arrow.strikeVector, ball.getRandomVector());
                            });

                            world.on('ball:crossbar', function () {
                                _setWorldState('crossbar');
                                audio.play('miss');
                            });

                            world.on('ball:hand', function () {
                                _setWorldState('hand');
                                audio.play('miss');
                                goalkeeper.catch();
                            });

                            world.on('goal', function () {
                                _setWorldState('goal');
                                audio.play('goal');
                            });

                            world.on('ball:stop', function () {
                                _setWorldState('end');
                            });
                            _defer.notify('loaded');
                        });
                });
            }
        };
    })
;
