define([
    'ko',
    'text!./view.html',
    'c/info/vm',
    'plugins/viewmodel',
    'social/social'
], function (ko, html, info, vm, social) {

    function ViewModel(params) {
        this.user = ko.observable();
        this.show = function (user) {
            this.user(user);
            this.isVisible(true);
        };
        this.click = function () {
            if (this.user().id == 0) // may be "0"
            {
                social.invite();
                return;
            }
            var url = social.getUserUrl(this.user().id);
            var win = window.open(url, '_blank');
            win.focus();
        };
        this.test = function () {
            var self = this;
            require(['controllers/users'], function (UsersController) {
                UsersController.getMe()
                    .then(function (user) {
                        self.show(user);
                    });
            });
        };

        this.hover = function (item) {
            info.viewModel().show(item.user());
        };

        this.out = function () {
            info.viewModel().hide();
        };
    }

    var component = {
        viewModel: function (params) {
            var ins = vm.getViewModel(params, 'member', ViewModel);
            if (params && params.user)
                ins.show(params.user);
            return ins;
        }, template: html
    };
    if (!ko.components.isRegistered('member'))
        ko.components.register('member', component);
    return component;
});