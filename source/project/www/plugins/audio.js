define(['jquery', 'plugins/loader', 'lodash', 'howler'], function ($, loader) {

    var VOLUME = 0.5,
        _enabled = true;

    return {

        play: function (name) {
            if (!_enabled) return;
            if (Howler._muted)
                this.unmute();

            var file = loader.getFile(name);
            if (!(file && file.audio))
                return;

            file.audio.volume = VOLUME;
            file.audio.play();
        },

        isEnabled: function(){
            return _enabled;
        },

        mute: function(){
            Howler.mute();
        },

        unmute: function(){
            Howler.unmute();
        },

        on: function(){
            this.unmute();
            _enabled = true;
        },

        off: function(){
            this.mute();
            _enabled = false;
        }
    };
});