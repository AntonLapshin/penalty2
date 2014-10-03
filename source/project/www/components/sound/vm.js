define(['ko', 'text!./view.html', 'plugins/audio'], function(ko, html, audio) {

    var _interval,
        _seconds,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),
        isMuted: ko.observable(false),

        show: function(){
            this.isVisible(true);
        },

        unmute: function(){
            audio.unmute();
            this.isMuted(false);
        },

        mute: function(){
            audio.mute();
            this.isMuted(true);
        },

        press: function(){
            if (audio.isMuted())
                this.unmute();
            else
                this.mute();
        },

        test: function(){
            var self = this;
            require(['plugins/loader'], function(loader){
                loader.load(loader.resources.ENGINE)
                    .then(function () {
                        self.show();
                        audio.play('stadium');
                    })
            });
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});