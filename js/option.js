option = [
    {
        downHitPanch:20,// урон удара прямой рукой
        downHitKick:10,// урон удара ногой прямой
        downHitKickUp:50,// урон удара ногой вверх

        downEnergyKickRival:20,// понизить энергию при ударе ногой вперед у сопернирка

        downEnergyPanch:5,// понизить энергию при ударе рукой у себя
        downEnergyKick:7,// понизить энергию при ударе ногой вперед у себя
        downEnergyKickUp:10, // понизить энергию при ударе ногой вверх у себя


    },
    {
    }
];
var arrNameBuilding=['rockingChair','arena','nightClub',
                     "stadium",'martialSection'];
var optionCity=[
    {
        name:arrNameBuilding[0],// качалка
        nameLocal:"тренажерный зал",
        list: [{str:'тренироваться самому 1 час',price:10,addParam:[1,0,0]},
            {str:'тренироваться самому 2 часа',price:20,addParam:[2,0,0]},
            {str:'тренировка с тренером 1 час',price:45,addParam:[5,0,0]},
            {str:'тренировка с трениром 2 часа',price:280,addParam:[10,0,0]}, 
        ]        
    },
    {
        name:arrNameBuilding[1],// арена
        nameLocal:"арена",
        list: [{str:'турнир для новичков',price:10},
            {str:'турнир для любителей',price:20},
            {str:'турнир для профессионалов',price:45},
            {str:'турнир для мастеров',price:80}, 
        ]        
    },
    {
        name:arrNameBuilding[2],// ночной клуб
        nameLocal:"ночной клуб",
        list: [{str:'работать вышибалой 1 час',price:10},
            {str:'работать вышибалой 2 часа ',price:20},
            {str:'работать вышибалой 4 часа',price:45},
            {str:"работать вышибалой всю ночь",price:80}, 
        ]        
    },
    {
        name:arrNameBuilding[3],// стадион
        nameLocal:"стадио",
        list: [{str:'бегать 20 минут',price:10,addParam:[0,1,0]},
            {str:'бегать 40 минут',price:20,addParam:[0,2,0]},
            {str:'бегать 1 час',price:45,addParam:[0,3,0]},
            {str:'бегать 1.5 часа',price:80,addParam:[0,5,0]}, 
        ]        
    },
    {
        name:arrNameBuilding[4],// секция боевых исскуств
        nameLocal:"секция",
        list: [{str:'занимать с мастером 30 минут',price:10,addParam:[0,0,1]},
            {str:'занимать с мастером 1 час',price:20,addParam:[0,0,2]},
            {str:'заниматься с мастером 1.5 часа',price:45,addParam:[0,0,5]},
            {str:'заниматься с мастером 2 часа',price:80,addParam:[0,0,8]}, 
        ]        
    },
        
];
var optionHuman=[
    {name:"Brad", power:10,endurance:8,speedMove:15,},
    {name:"Maks", power:15,endurance:18,speedMove:3,},
    {name:"Victor", power:20,endurance:8,speedMove:15,},
];