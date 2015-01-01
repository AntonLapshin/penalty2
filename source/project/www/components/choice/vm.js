define([
    'ko',
    'text!./view.html',
    'c/team/vm',
    'plugins/localization',
    'model/teams'
], function (ko, html, team, strings, teams) {

    var _defer;

    var _viewModel = {
        isVisible: ko.observable(false),
        items: ko.observableArray(teams),
        title: strings.choiceTitle,

        show: function () {
            this.isVisible(true);
            return $.Deferred(function (defer) {
                _defer = defer;
            });
        },

        ok: function (index) {
            this.isVisible(false);
            _defer.resolve(index);
        },

        test: function () {
            require(['plugins/loader'], function (loader) {
                loader.load(loader.resources.GAME).then(function () {
                });
            });

            this.show().then(function (index) {
                alert('Selected team is ' + index);
            })
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    var component = {viewModel: ViewModel, template: html};
    if (!ko.components.isRegistered('choice'))
        ko.components.register('choice', component);
    return component;
});