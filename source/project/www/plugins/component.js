define(['jquery', 'ko'], function ($, ko) {

    return {
        load: function (componentNames) {
            var self = this;
            if (typeof componentNames === 'string') {
                componentNames = [componentNames];
            }
            var defers = [];
            componentNames.forEach(function (componentName) {
                var defer = $.Deferred(function (defer) {
                    require(['components/' + componentName + '/vm'], function (component) {
                        if (ko.components.isRegistered(componentName)) {
                            defer.resolve(component);
                            return;
                        }
                        var container$ = $('#container');
                        if ($(componentName, container$).length === 0) {
                            container$.append($('<' + componentName + '/>'));
                        }
                        ko.components.register(componentName, component);
                        if (component.depend) {
                            if (typeof component.depend === 'string') {
                                component.depend = [component.depend];
                            }

                            var defers = [];
                            component.depend.forEach(function (depend) {
                                defers.push(self.load(depend));
                            });
                            $.when.apply($, defers)
                                .then(function () {
                                    defer.resolve(component);
                                });
                        }
                        else {
                            defer.resolve(component);
                        }
                    });
                });
                defers.push(defer);
            });
            return $.when.apply($, defers);
        },
        test: function (componentName) {
            return this.load(componentName)
                .then(function (component) {
                    ko.applyBindings({});
                    component.viewModel().test();
                });
        }
    }

});