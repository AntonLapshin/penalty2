window.cfg = {
    debug: false,
    payments: false,
    publish: false,
    heroku: {
        vk: "https://penaltydb.herokuapp.com/",
        fb: "https://penaltydbfb.herokuapp.com/"
    },
    server: "heroku",
    social: "fb",
    language: "en"
};

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
        ko: window.cfg.debug ? '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug' : '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        text: 'vendor/text',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        vk: '//vk.com/js/api/xd_connection',
        fb: '//connect.facebook.net/en_US/all'
    }
});

require([
        'jquery',
        'text',
        'social/social',
        'social/' + window.cfg.social,
        'server/server',
        'server/' + window.cfg.server
    ],
    function ($,
              text,
              social,
              socialInstance,
              server,
              serverInstance
        ) {

        $.when.apply($, [social.init(socialInstance), server.init(serverInstance)])
            .then(function () {
                $('*').on('selectstart', function () {
                    return false;
                });
                var search = window.location.search,
                    testComponentName = search.length > 0 ? search.substring(1) : null;
                if (window.debug === true && testComponentName){
                    require(['plugins/component'], function(component){
                        component.test(testComponentName)
                            .then(window.stopSpinner);
                    });
                }
                else{
                    require(['lifecycle'], function(lifecycle){
                        lifecycle();
                    });
                }
            });
    });

