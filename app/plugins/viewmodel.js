define(['ko'], function (ko) {

    var _viewModels = {};

    function ViewModel(name, constructor){
        this.name = name;
        this.isVisible = ko.observable(false);

        constructor.call(this);

        _viewModels[name] = this;
    }

    return {
        getViewModel: function(params, viewName, constructor){
            var name = viewName + '+' + (params ? (typeof params.name === 'function' ? params.name() : params.name) || 'default' : 'default');
            if (_viewModels[name])
                return _viewModels[name];

            return new ViewModel(name, constructor);
        },
        observe: function(dependance, observed){
            dependance(observed());
            observed.subscribe(function (newValue) {
                dependance(newValue);
            });
        }
    };
});