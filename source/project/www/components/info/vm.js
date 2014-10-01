define(['ko', 'text!./view.html'], function(ko, html) {

    var _interval,
        _seconds,
        _debug = false;

    var _viewModel = {
        isVisible: ko.observable(false),
        player: ko.observable(null),

        show: function(item){
            if (item.id == 0) return;
            this.player(item);
            this.isVisible(true);
        },

        hide: function(){
            this.player(this.defaultPlayer);
        },

        init: function(defaultPlayer){
            this.defaultPlayer = defaultPlayer;
            this.hide();
        },

        test: function(){
            this.show({"id":5653333,"img":"https://pp.vk.me/c421118/v421118333/924b/C790w8WkLxE.jpg","name":"Anton Lapshin","score":15286,"goals":27,"miss":0,"exp":1,"last":1408680551237})
        }
    };

    function ViewModel() {
        return _viewModel;
    }

    return { viewModel: ViewModel, template: html };
});