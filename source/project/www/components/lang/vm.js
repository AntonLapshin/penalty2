define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    var _viewModel = {
        isVisible: ko.observable(false),
        isMuted: ko.observable(false),

        show: function(){
            this.isVisible(true);
        },

        en: function(){
            strings.language = 'en';
            strings.setLanguage();
        },

        ru: function(){
            strings.language = 'ru';
            strings.setLanguage();
        },

        test: function(){
            this.show();
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});