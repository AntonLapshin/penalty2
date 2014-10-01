define(['jquery', 'plugins/loader', 'lodash'], function ($, loader) {

    var VOLUME = 0.5,
        _enabled = true;

    return {
        play: function (name) {
            if (!_enabled) return;
            var file = loader.getFile(name);
            if (file && file.audio$) {
                file.audio$[0].volume = VOLUME;
                file.audio$[0].play();
            }
        },

        isEnabled: function(){
            return _enabled;
        },

        on: function(){
            _enabled = true;
        },

        off: function(){
            _enabled = false;
            this.stop();
        },

        stop: function () {
            var files = loader.getAllFiles();
            files.forEach(function(file){
                if (file && file.audio$)
                    file.audio$[0].pause();
            });
        }
    };
});