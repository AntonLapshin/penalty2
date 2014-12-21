define(['ko', 'text!./view.html', 'plugins/localization'], function (ko, html, strings) {

    var _viewModel = {
        isVisible: ko.observable(false),
        twistvalue: ko.observable(0),
        txtTwistBall: strings.txtTwistBall,

        show: function () {
            this.isVisible(true);
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