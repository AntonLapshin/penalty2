define(['plugins/ajax', 'plugins/social'], function (ajax, social) {

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

        getOnePlayer: function(id){
            var user,
                score;

            return social.getUsers(id).then(function(res1){
                user = res1[0];
                return ajax.callAjax('scores', { ids: user.id });
            }).then(function(res2){
                score = res2.length === 1 ? res2[0] : null;
                return newPlayer(user, score);
            });
        },

        getTopPlayers: function(){
            return ajax.callAjax('top', null).then(function (scores) {
                if (scores.length == 0){
                    return [];
                }
                var ids = [];
                var idScoreDicFromDb = parseScores(scores);
                for (var i = 0; i < scores.length; i++) {
                    ids.push(scores[i]._id);
                }
                var idsText = ids.join(',');
                var idScoreDic = getIdScoreDic(ids, idScoreDicFromDb);
                return getPlayers(idsText, idScoreDic);
            });
        },

        getFriendsPlayers: function(){
            return social.getFriendsUsers().then(function(ids){
                if (ids.length === 0){
                    return [];
                }
                return ajax.callAjax('scores', { ids: ids }).then(function(scores){
                    var idScoreDicFromDb = parseScores(scores);
                    var idsText = ids.join(',');
                    var idScoreDic = getIdScoreDic(ids, idScoreDicFromDb);
                    return getPlayers(idsText, idScoreDic);
                });
            });
        }
    };
});