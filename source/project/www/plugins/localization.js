define(['ko'], function(ko){

    var _language,
        _languages = { 'ru' : 0, 'en' : 1};

    var _strings =
    {
        choiceTitle:    ['Выбор команды',           'Choose the team'],
        turnPlayer:     ['Удар вашей команды',      'Your team beats'],
        turnComputer:   ['Удар соперника',          'Computer team beats'],
        goal:           ['Го-о-о-ол!',              'Gooooal!'],
        miss:           ['Промах!',                 'Miss!'],
        crossbar:       ['Штанга!',                 'Crossbar!'],
        scores:         ['Очки',                    'Scores'],
        goals:          ['Забитые голы',            'Goals'],
        exp:            ['Мастерство',              'Experience'],
        instructionTitle: ['Инструкция',            'Instruction'],
        rules1:         ['1. Для удара по мячу необходимо зажать левую кнопку мыши на мяче и потянуть в направлении удара, а затем отпустить.',
        '1. Start attack by pulling forward the arrow with your finger or mouse pressing on the ball.'],
        rules2:         ['2. Для выбора направления прыжка вратаря необходимо зажать левую кнопку мыши на голове вратаря и потянуть в направлении прыжка, а затем отпустить.',
        '2. Start defend by pulling forward the arrow with your finger or mouse pressing on the goalkeeper.'],
        rulesPenalty:   ['Правила пенальти',        'Penalty rules on wiki'],
        prev:           ['Назад',                   'Return'],
        header1:        ['Пенальти.',               'Penalty.'],
        header2:        ['Чемпионат мира по футболу 2014.',
        'Football Championship 2014.'],
        introDesc:      ['Сыграй за одну из любимых команд на чемпионате мира по футболу 2014 в Бразилии. Игра начнется со стадии плей-офф между вышедшими из группового этапа командами.',
        'Play for your favourite team on football championship 2014 in Brazil.'],
        btnStart:       ['Начать игру',             'Start game'],
        btnInstruction: ['Инструкция',              'Instruction'],
        firstTurn:      ['Право первого удара: ',   'Who turns the first? '],
        drawLot:        ['Кинуть жребий',           'Draw a lot'],
        titleResults:   ['Результаты чемпионата',   'Championship Results'],
        txtPlace:       ['Занятое место',           'Your place'],
        linkGroup:      ['Перейти в группу',        'Go to community'],
        linkInvite:     ['Пригласить друзей',       'Invite friends'],
        txtWin:         ['Победа!',                 'Win!'],
        txtDefeat:      ['Поражение',               'Defeat'],
        linkTopFriends: ['Топ друзей',              'Friends Top'],
        linkTopAll:     ['Общий топ',               'All Top'],
        txtGoRound:     ['Сыграть тур',             'Play Round'],
        txtTwistBall:   ['Закрутка мяча',           'Twist the ball'],

        teamBrazil:     ['Бразилия',                'Brazil'],
        teamMexico:     ['Мексика',                 'Mexico'],
        teamNetherlands:['Нидерланды',              'Netherlands'],
        teamChily:      ['Чили',                    'Chily'],
        teamRussia:     ['Россия',                  'Russia'],
        teamGreace:     ['Греция',                  'Greace'],
        teamCostaRica:  ['Коста-Рика',              'Costa-Rica'],
        teamUruguai:    ['Уругвай',                 'Uruguai'],
        teamFrance:     ['Франция',                 'France'],
        teamEkvador:    ['Эквадор',                 'Ekvador'],
        teamArgentina:  ['Аргентина',               'Argentina'],
        teamNigeria:    ['Нигерия',                 'Nigeria'],
        teamGermany:    ['Германия',                'Germany'],
        teamUSA:        ['США',                     'USA'],
        teamBelgium:    ['Бельгия',                 'Belgium'],
        teamAlgzir:     ['Алжир',                   'Algzir'],

        txtInvite:      ['Пригласить друга',        'Invite'],

        psychicText:    ['Помощь экстрасенса. Всего за 1 голос экстрасенс поможет угадать направление удара и прыжка противника в этой серии пенальти.',
        'Psychic help. Only for one vote Psychic can help you to guess direction of attack and goalkeeper throw in that match.'],

        psychicTextEnabled: ['В этом матче Вам помогает экстрасенс', 'In that match the Psychic helps you'],

        txtTimer:       ['До начала турнира',       'Time left'],
        txtTimerVote:   ['За 1 голос ты можешь начать новый турнир прямо сейчас',       'For 1 vote you can continue game right now']
    };


    var _localization = {

        getLanguage: function() { return _language; },
        setLanguage: function(language){
            _language = language;
            for (var name in _strings){
                if (!_strings.hasOwnProperty(name))
                    continue;

                if (this[name]){
                    this[name](
                        _strings[name][ _languages[_language] ]
                    );
                }
                else {
                    this[name] = ko.observable(
                        _strings[name][ _languages[_language] ]
                    );
                }
            }
        }

    };

    _localization.setLanguage(window.cfg.language);

    return _localization;
});