requirejs.config({
    shim: {
        'fb' : {
            exports: 'FB'
        }
    },
    paths: {
        physics: '//cdn.jsdelivr.net/physicsjs/0.6.0/physicsjs.full.min',
        tween: 'vendor/tween',
        howler: '//cdnjs.cloudflare.com/ajax/libs/howler/1.1.17/howler.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
//        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug',
        text: 'vendor/text',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        vk: '//vk.com/js/api/xd_connection',
        'fb': '//connect.facebook.net/en_US/all',
        //text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
    }
});

window.cfg = {
    debug: false,
    heroku: {
        vk: "https://penaltydb.herokuapp.com/",
        fb: "https://penaltydbfb.herokuapp.com/"
    },
    server: "heroku",
    social: "fb",
    lang: "en"
};

require([
        'jquery',
        'text',
        'lifecycle',
        'social/social',
        'social/' + window.cfg.social,
        'server/server',
        'server/' + window.cfg.server
    ],
    function ($,
              text,
              lifecycle,
              social,
              socialInstance,
              server,
              serverInstance
        ) {

        $.when.apply($, [social.init(socialInstance), server.init(serverInstance)])
            .then(function () {
                lifecycle.start();
            });
    });

