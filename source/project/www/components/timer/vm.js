define(['ko', 'text!./view.html', 'jquery'], function(ko, html, $) {

    var _interval,
        _seconds;

    var _viewModel = {
        isVisible: ko.observable(),
        value: ko.observable(''),

        setValue: function(){
            var min = Math.floor(_seconds / 60);
            var sec = Math.floor(_seconds % 60);
            if (sec < 10)
                sec = '0' + sec;
            this.value(min + ':' + sec);
        },

        test: function(){
            this.show(Date.now());
        },

        show: function(last){
            if (window.DEBUG) return;

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
            _interval = setInterval(function(){
                _seconds--;
                self.setValue();
                if (_seconds === 0){
                    self.isVisible(false);
                    clearInterval(_interval);
                }
            }, 1000);

            this.isVisible(true);
        },

        highlight: function(){
            if (window.DEBUG) return false;

            if (!_seconds)
                return false;

            $('#timer')
                .animate({ opacity: 1 }, 200)
                .animate({ color: 'red' }, 100)
                .animate({ opacity: 0.3 }, 500);

            return true;
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});