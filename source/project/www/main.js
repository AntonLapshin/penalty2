requirejs.config({
    paths: {
        physics: '//cdn.jsdelivr.net/physicsjs/0.6.0/physicsjs.full.min',
        tween: 'vendor/tween',
        jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-debug',
        text: 'vendor/text',
        lodash: '//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min',
        vk: '//vk.com/js/api/xd_connection'
        //text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'
        //ko: '//cdnjs.cloudflare.com/ajax/libs/knockout/3.2.0/knockout-min'
    }
});

window.DEBUG = false;

require([ 'jquery', 'text', 'vk', 'lifecycle'],
    function ($, text, vk, lifecycle) {
        VK.init(function () {
            lifecycle.start();
        }, function () {
        }, '5.21');
    });

