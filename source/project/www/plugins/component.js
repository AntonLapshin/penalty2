define(['ko'], function (ko) {

    var _viewModels = {};

    function ViewModel(name, viewModel, params){
        if (typeof viewModel === 'function'){
            this.name = name;
            this.isVisible = ko.observable(false);
            viewModel.call(this);
            _viewModels[name] = this;
            if (params)
                this.show(params);
            return this;
        }
        else{
            viewModel.name = name;
            viewModel.isVisible = ko.observable(false);
            _viewModels[name] = viewModel;
            return viewModel;
        }
    }

    function getViewModel(params, viewName, viewModel){
        var name = viewName + '+' + (params ? (typeof params.name === 'function' ? params.name() : params.name) || 'default' : 'default');
        if (_viewModels[name]){
            if (params && typeof viewModel === 'function')
                _viewModels[name].set(params);
            return _viewModels[name];
        }

        return new ViewModel(name, viewModel, params);
    }

    return {
        add: function(viewModel, html, name){
            var component = {
                viewModel: function (params) {
                    return getViewModel(params, name, viewModel);
                }, template: html
            };
            if (!ko.components.isRegistered(name))
                ko.components.register(name, component);

            return component.viewModel();
        }
    };
});