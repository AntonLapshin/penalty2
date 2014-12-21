define(['ko', 'text!./view.html', 'plugins/localization', 'plugins/component', 'model/teams'],
    function (ko, html, strings, component, teams) {

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

    return { viewModel: ViewModel, template: html, depend: ['team'] };
});