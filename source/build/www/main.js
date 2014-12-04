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
        //text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
        //ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
    }
});

window.DEBUG = true;

require([
        'jquery',
        'text',
        'lifecycle',
        'social/social',
        'social/test',
        'social/vk',
        'server/server',
        'server/test',
        'server/heroku',
    ],
    function ($,
              text,
              lifecycle,
              social,
              socialTest,
              vk,
              server,
              serverTest,
              heroku
        ) {

        var socialInstance = window.DEBUG ? socialTest : vk,
            serverInstance = window.DEBUG ? serverTest : heroku;

        $.when.apply($, [social.init(socialInstance), server.init(serverInstance)])
            .then(function () {
                lifecycle.start();
            });
    });

