define(['jquery', 'ko'], function($, ko){

    return {
        load: function(componentName){
            var self = this;
            return $.Deferred(function(defer){
                require(['components/' + componentName + '/vm'], function(component){
                    if (!ko.components.isRegistered(componentName)){
                        var container$ = $('#container');
                        if ($(componentName, container$).length === 0) {
                            container$.append($('<' + componentName + '/>'));
                        }
                        ko.components.register(componentName, component);
                        if (component.depend){
                            var defers = [];
                            component.depend.forEach(function(depend){
                                defers.push(self.load(depend));
                            });
                            $.when.apply($, defers)
                                .then(function(arg1, arg2){
                                    defer.resolve(component);
                                });
                        }
                        else{
                            defer.resolve(component);
                        }
                    }
                    else{
                        defer.resolve(component);
                    }
                });
            });
        },
        test: function(componentName){
            return this.load(componentName)
                .then(function(component){
                    ko.applyBindings({});
                    component.viewModel().test();
                });
        }
    }

});