define(['ko', 'localization/languages'], function(ko, languages){

    var _strings = {
        language: window.cfg.lang,
        setLanguage: function(){
            for (var name in languages.strings){
                if (_strings[name]){
                    _strings[name](
                        languages.strings[name][ languages.languages[this.language] ]
                    );
                }
                else {
                    _strings[name] = ko.observable(
                        languages.strings[name][ languages.languages[this.language] ]
                    );
                }
            }
        }
    };

    _strings.setLanguage();

    return _strings;
});