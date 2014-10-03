define(['ko', 'text!./view.html'], function (ko, html) {

    var _viewModel = {
        isVisible: ko.observable(false),
        twistvalue: ko.observable(0),

        show: function () {
            this.isVisible(true);
            //this.twistvalue(5);
        },

        hide: function(){
            this.isVisible(false);
        },

        test: function () {
            this.show();
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});