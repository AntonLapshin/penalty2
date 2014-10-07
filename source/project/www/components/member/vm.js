define(['ko', 'text!./view.html', 'plugins/social', 'components/info/vm'], function(ko, html, social, info) {

    var testData = {"id":5653333,"img":"https://pp.vk.me/c421118/v421118333/924b/C790w8WkLxE.jpg","name":"Anton Lapshin","score":15286,"goals":27,"miss":0,"exp":1,"last":1408680551237};

    function ViewModel(params){
        var player = params.value ? params.value : testData;
        var self = this;

        this.player = ko.observable();
        this.score = ko.observable(0);

        this.onClick = function(){
            if (self.player().id == 0) // may be "0"
            {
                social.invite();
                return;
            }
            var url = social.getUserUrl(self.player().id);
            var win = window.open(url, '_blank');
            win.focus();
        };

        this.set = function(player){
            self.player(player);
            self.score(player.score);
        };

        if (player)
            this.set(player);

        this.hover = function(item){
            info.viewModel().show(item.player());
        };

        this.out = function(){
            info.viewModel().hide();
        };
    }

    return { viewModel: ViewModel, template: html };
});