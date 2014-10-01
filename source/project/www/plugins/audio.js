define(['jquery', 'plugins/loader', 'lodash', 'howler'], function ($, loader) {

    var VOLUME = 0.5,
        _enabled = true;

    return {

        play: function (name) {
            if (!_enabled) return;

            var file = loader.getFile(name);
            if (!(file && file.audio))
                return;

            file.audio.volume = VOLUME;
            file.audio.play();
        },

        isEnabled: function(){
            return !Howler._muted;
        },

        on: function(){
            Howler.unmute();
        },

        off: function(){
            Howler.mute();
        }
    };
});