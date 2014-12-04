define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    var _interval,
        _seconds,
        _defer,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),

        header1: strings.header1,
        header2: strings.header2,
        desc: strings.introDesc,
        btnStart: strings.btnStart,
        btnInstruction: strings.btnInstruction,

        show: function(){
            this.isVisible(true);
            return $.Deferred(function(defer){
                _defer = defer;
            })
        },

        start: function(){
            var self = this;
            setTimeout(function(){
                _defer.notify('start');
            }, 300);
        },
        rules: function(){
            var self = this;
            setTimeout(function(){
                _defer.notify('rules');
            }, 300);
        },

        test: function(){
            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            this.show().progress(function(result){
                alert(result);
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});