define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        items: ko.observableArray([]),
        title: strings.choiceTitle,

        show: function(items){
            this.items(items);
            this.isVisible(true);
            return $.Deferred(function(defer){
                _defer = defer;
            });
        },

        ok: function(index){
            this.isVisible(false);
            _defer.resolve(index);
        },

        test: function(){
            var self = this;

            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            require(['plugins/options'], function(options){
                self.show(options.teams).then(function(index){
                    alert('Selected team is ' + index);
                })
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});