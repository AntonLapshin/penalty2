define(['ko', 'text!./view.html'], function(ko, html) {

    var _interval,
        _seconds,
        _defer,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),

        header1: 'Пенальти.',
        header2: 'Чемпионат мира по футболу 2014.',
        desc: 'Сыграй за одну из любимых команд на чемпионате мира по футболу 2014 в Бразилии. Игра начнется со стадии плей-офф между вышедшими из группового этапа командами.',

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