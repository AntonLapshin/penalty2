define(['server/server', 'social/social'], function (server, social) {

    function getPlayers(ids, idScoreDic){
        var players = [];
        return social.getUsers(ids).then(function(users){
            var players = [];
            for(var i = 0; i < users.length; i++){
                players.push(newPlayer(users[i], idScoreDic[users[i].id]));
            }
            return players;
        });
    }

    function getIdScoreDic(ids, scores){
        var dic = {};
        for(var i = 0; i < ids.length; i++){
            dic[ids[i]] = scores[ids[i]] || 0;
        }
        return dic;
    }

    function parseScores(scores){
        var dic = {};
        for(var i = 0; i < scores.length; i++){
            dic[scores[i]._id] = scores[i];
        }
        return dic;
    }

    function newPlayer(user, score){
        user = user || {
            id: '0',
            img: social.getUnknowImg(),
            name: 'Пригласить друга'
        };

        score = score || {
            score: 0,
            goals: 0,
            miss: 0,
            exp: 0
        };

        return {
            id: user.id,
            img: user.img,
            name: user.name,
            score: score.score,
            goals: score.goals,
            miss: score.miss,
            exp: score.exp,
            last: score.last
        };
    }

    return {

        newPlayer: newPlayer,

        getOneUser: function(id){
            return social.getUsers(id).then(function(user){
                return $.Deferred(function(defer){
                    server.loadUsers(user)
                        .then(function(users){
                            defer.resolve(users[0]);
                        });
                });
            })
        },

        getTopUsers: function(){
            return server.loadTopUsers().then(function (users) {
                if (users.length == 0){
                    return [];
                }
                return social.getUsers(users);
            });
        },

        getFriendsUsers: function(){
            return social.getFriendsUsers().then(function(users){
                if (users.length === 0){
                    return [];
                }
                return server.loadUsers(users);
            });
        }
    };
});