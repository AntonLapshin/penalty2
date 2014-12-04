define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        title: strings.instructionTitle,
        rules1: strings.rules1,
        rules2: strings.rules2,
        rulePenalty: strings.rulePenalty,
        prev: strings.prev,

        show: function(){
            this.isVisible(true);
            return $.Deferred(function(defer){
                _defer = defer;
            });
        },

        back: function(){
            var self = this;
            setTimeout(function(){
                self.isVisible(false);
                _defer.resolve();
            }, 300);
        },

        test: function(){

            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            this.show().then(function(){
                console.log('back');
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});