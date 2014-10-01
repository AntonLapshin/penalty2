define(['ko', 'text!./view.html', 'jquery'], function(ko, html, $) {

    var _interval,
        _seconds,
        _defer,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),
        isLoaded: ko.observable(false),
        percent: ko.observable(0),
        buttonName: ko.observable('Начать'),

        show: function(buttonName){
            this.percent(0);
            this.isVisible(true);
            this.isLoaded(false);
            this.buttonName(buttonName);
            var self = this;
            return $.Deferred(function(defer){
                _defer = defer;
            });
        },

        onPercentChanged: function(percent){
            this.percent(percent);
            if (percent === 100)
                this.isLoaded(true);
        },

        start: function(){
            this.isVisible(false);
            _defer.resolve();
        },

        test: function(){
            this.show('Test').then(function(){
                alert('Finish');
            });

            var p = 0;
            var self = this;
            function go(){
                self.onPercentChanged(p);
                if (p < 100)
                    window.setTimeout(go, 10);
                p++;
            }

            go();
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});