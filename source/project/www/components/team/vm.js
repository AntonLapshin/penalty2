define(['ko', 'text!./view.html', 'plugins/viewmodel'], function(ko, html, vm) {

    function ViewModel(params) {
        this.team = ko.observable();
        this.position = ko.observable('left');

        this.show = function(team, position){
            this.team(team);
            this.position(position ? position : 'left');
            this.isVisible(true);
        };

        this.test = function(){
            var self = this;
            require(['model/teams'], function(teams){
                self.show(teams[0]);
            });
        };
    }

    return { viewModel: function (params) {
        var ins = vm.getViewModel(params, 'team', ViewModel);
        if (params && params.team)
            ins.show(typeof params.team === 'function' ? params.team() : params.team, params.position);
        return ins;
    }, template: html };
});