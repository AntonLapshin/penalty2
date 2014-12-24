define(['ko', 'text!./view.html', 'plugins/viewmodel', 'social/social', 'components/info/vm'],
    function(ko, html, vm, social, info) {

    function ViewModel(params){
        this.user = ko.observable();
        this.show = function(user){
            this.user(user);
            this.isVisible(true);
        };
        this.click = function(){
            if (this.user().id == 0) // may be "0"
            {
                social.invite();
                return;
            }
            var url = social.getUserUrl(this.user().id);
            var win = window.open(url, '_blank');
            win.focus();
        };
        this.test = function(){
            var self = this;
            require(['controllers/users'], function (UsersController) {
                UsersController.getOneUser(1)
                    .then(function(user){
                        self.show(user);
                    });
            });
        };

        this.hover = function(item){
            info.viewModel().show(item.user());
        };

        this.out = function(){
            info.viewModel().hide();
        };
    }

    return { viewModel: function (params) {
        var ins = vm.getViewModel(params, 'member', ViewModel);
        if (params && params.user)
            ins.show(params.user);
        return ins;
    }, template: html, depend: 'info' };
});