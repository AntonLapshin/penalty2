define([
    'ko',
    'text!./view.html',
    'plugins/localization'
], function (ko, html, strings) {

    var _viewModel = {
        isVisible: ko.observable(false),
        lang: ko.observable(window.cfg.lang),

        show: function () {
            this.isVisible(true);
        },

        en: function () {
            this.lang('en');
            strings.setLanguage('en');
        },

        ru: function () {
            this.lang('ru');
            strings.setLanguage('ru');
        },

        test: function () {
            this.show();
        }
    };

    function ViewModel(params) {
        return _viewModel;
    }

    var component = {viewModel: ViewModel, template: html};
    if (!ko.components.isRegistered('lang'))
        ko.components.register('lang', component);
    return component;
});