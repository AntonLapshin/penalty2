define(['ko', 'text!./view.html'], function(ko, html) {

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        items: ko.observableArray([]),

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