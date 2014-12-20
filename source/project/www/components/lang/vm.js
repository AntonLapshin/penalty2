define(['ko', 'text!./view.html', 'localization/strings'], function(ko, html, strings) {

    var _viewModel = {
        isVisible: ko.observable(false),
        lang: ko.observable(window.cfg.lang),

        show: function(){
            this.isVisible(true);
        },

        en: function(){
            strings.language = 'en';
            this.lang('en');
            strings.setLanguage();
        },

        ru: function(){
            strings.language = 'ru';
            this.lang('ru');
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