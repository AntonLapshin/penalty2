window.cfg = {
    debug: false,
    payments: true,
    publish: true,
    server: "https://penaltydb.herokuapp.com/",
    language: "ru"
};

requirejs.config({
    shim: {
        'fb': {
            exports: 'FB'
        }
    },
    paths: {
        tween: 'lib/tween',
        text: 'lib/text',
        physics: '//cdn.jsdelivr.net/physicsjs/0.6.0/physicsjs.full.min',
        howler: '//cdnjs.cloudflare.com/ajax/libs/howler/1.1.17/howler.min',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        //ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug',
        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        vk: '//vk.com/js/api/xd_connection',
        fb: '//connect.facebook.net/en_US/all',
        c: 'components/'
    }
});

require([
    'ko',
    'jquery',
    'text',
    'social/social',
    'social/vk',
    'server/server',
    'server/heroku'
], function (ko,
             $,
             text,
             social,
             socialInstance,
             server,
             serverInstance) {
    $.when.apply($, [social.init(socialInstance), server.init(serverInstance)])
        .then(function () {
            $('*').on('selectstart', function () {
                return false;
            });
            var search = window.location.search,
                testComponentName = search.length > 0 ? search.substring(1) : null;
            if (window.cfg.debug === true && testComponentName) {
                require(['c/' + testComponentName + '/vm'], function (component) {
                    window.stopSpinner();
                    ko.applyBindings({});
                    component.test();
                });
            }
            else {
                require(['lifecycle']);
            }
        });
});

