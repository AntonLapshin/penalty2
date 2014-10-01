define(['ko', 'text!./view.html'], function(ko, html) {

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),

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
            this.show().then(function(){
                alert('back');
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});