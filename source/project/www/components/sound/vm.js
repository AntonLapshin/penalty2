define(['ko', 'text!./view.html', 'plugins/audio'], function(ko, html, audio) {

    var _interval,
        _seconds,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),
        isEnabled: ko.observable(true),

        show: function(){
            this.isVisible(true);
        },

        on: function(){
            audio.on();
            this.isEnabled(true);
        },

        off: function(){
            audio.off();
            this.isEnabled(false);
        },

        press: function(){
            if (audio.isEnabled())
                this.off();
            else
                this.on();
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