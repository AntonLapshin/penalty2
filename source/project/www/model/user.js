define(['ko', 'social/social'], function (ko, social) {

    function User(id, img, name, score, goals, exp){
        this.id = id || 0;
        this.img = img || social.getUnknowImg();
        this.name = name || 'Пригласить друга';
        this.score = ko.observable(score || 0);
        this.goals = ko.observable(goals || 0);
        this.exp = ko.observable(exp || 0);
    }

    return User;
});