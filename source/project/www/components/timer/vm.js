define([
    'ko',
    'text!./view.html',
    'jquery',
    'plugins/localization',
    'social/social'
], function (ko, html, $, strings, social) {

    var _interval,
        _seconds,
        _isBought = false;

    var _viewModel = {
        isVisible: ko.observable(),
        isPaymentEnabled: window.cfg.payments,
        value: ko.observable(''),
        txtTimer: strings.txtTimer,
        txtTimerVote: strings.txtTimerVote,

        setValue: function () {
            var min = Math.floor(_seconds / 60);
            var sec = Math.floor(_seconds % 60);
            if (sec < 10)
                sec = '0' + sec;
            this.value(min + ':' + sec);
        },

        test: function () {
            this.show(Date.now());
        },

        click: function () {
            var self = this;
            if (!this.isPaymentEnabled)
                return;
            social.showOrderBox().then(function () {
                self.isVisible(false);
                _isBought = true;
            })
        },

        show: function (last) {
            _isBought = false;

            if (_interval)
                return;

            var seconds = (Date.now() - last) / 1000,
                minutes = seconds / 60;
            if (minutes >= 10) {
                return;
            } else {
                var diff = 10 * 60 * 1000 - (Date.now() - last);
                _seconds = Math.floor(diff / 1000);
            }

            this.setValue();
            var self = this;
            _interval = setInterval(function () {
                _seconds--;
                self.setValue();
                if (_seconds === 0) {
                    self.isVisible(false);
                    clearInterval(_interval);
                }
            }, 1000);

            this.isVisible(true);
        },

        highlight: function () {
            if (_isBought) return false;

            if (!_seconds)
                return false;

            $('.timer')
                .animate({opacity: 1}, 200)
                .animate({color: 'red'}, 100)
                .animate({opacity: 0.3}, 500);

            return true;
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    var component = {viewModel: ViewModel, template: html};
    if (!ko.components.isRegistered('timer'))
        ko.components.register('timer', component);
    return component;
});