define(['model/teams', 'plugins/ajax', 'plugins/players'], function (teams, ajax, players) {

    return {
        teams: teams,
        goals: -1,
        miss: -1,
        place: -1,

        init: function (playerTeamIndex) {
            this.teams[playerTeamIndex].isPlayer = true;
            this.goals = 0;
            this.miss = 0;
        },

        save: function () {
            return ajax.callAjax('upsert', {
                id: this.player.id,
                score: this.player.score,
                goals: this.player.goals,
                miss: this.player.miss,
                exp: this.player.exp
            });
        },

        load: function () {
            var self = this;
            return players.getOnePlayer(undefined)
                .then(function (player) {
                    self.player = player;
                });
        },

        upgrade: function () {
            this.player.goals += this.goals;
            this.player.miss += this.miss;
            this.player.exp += 1;
            this.exp += 1;
        }
    }
});