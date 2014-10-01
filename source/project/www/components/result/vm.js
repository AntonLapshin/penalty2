define(['ko', 'text!./view.html', 'plugins/vk'], function(ko, html, vk) {

    var _viewModel = {
        isVisible: ko.observable(false),
        place: ko.observable(),
        goals: ko.observable(),
        team: ko.observable(null),
        score: ko.observable(),

        show: function(score, place, team, goals){
            this.score(score);
            this.place(place);
            this.team(team);
            this.goals(goals);
            this.isVisible(true);
        },

        invite: function(){
            vk.invite();
        },

        test: function(){
            var self = this;
            require(['plugins/options'], function(options){
                self.show(1000, 2, options.teams[2], 12);
            });
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});