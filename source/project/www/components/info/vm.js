define(['ko', 'text!./view.html', 'plugins/localization'], function(ko, html, strings) {

    var _viewModel = {
        isVisible: ko.observable(false),
        user: ko.observable(null),
        scores: strings.scores,
        goals: strings.goals,
        exp: strings.exp,

        show: function(item){
            if (item.id == 0) return;
            this.user(item);
            this.isVisible(true);
        },

        hide: function(){
            this.user(this.defaultUser);
        },

        init: function(defaultUser){
            this.defaultUser = defaultUser;
            this.hide();
        },

        test: function(){
            var self = this;
            require(['controllers/users'], function (UsersController) {
                UsersController.getOneUser(1)
                    .then(function(users){
                        self.show(users);
                    });
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});