define(['ko', 'text!./view.html'], function(ko, html) {

    var testData = { power: 9, player: false, name: 'Бразилия', className: 'team-brazil' };

    function ViewModel(params) {
        var teamModel = params.value ? params.value : testData;
        if (typeof teamModel === 'function')
            teamModel = teamModel();
        this.position = !params.position ? 'left' : params.position;
        this.model = ko.observable(teamModel);
    }

    return { viewModel: ViewModel, template: html };
});