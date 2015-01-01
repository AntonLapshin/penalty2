define(['ko', 'text!./view.html', 'plugins/localization', 'social/social'], function (ko, html, strings, social) {

    var _viewModel = {
        isVisible: ko.observable(false),
        isPaymentEnabled: window.cfg.payments,

        textVisible: ko.observable(false),
        text: strings.psychicText,

        isEnabled: ko.observable(false),
        textEnabled: strings.psychicTextEnabled,

        show: function () {
            this.isVisible(true);
            this.isEnabled(false);
        },

        buy: function(){
            if (this.isEnabled() === true)
                return;

            var self = this;
            social.showOrderBox().then(function(){
                self.isEnabled(true);
                if (self.onHired)
                    self.onHired();
            });
        },

        onHired: null,

        hover: function(){
            this.textVisible(true);
        },

        out: function(){
            this.textVisible(false);
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