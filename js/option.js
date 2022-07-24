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
            {str:'тренировка с тренером 2 часа',price:280,addParam:[10,0,0]}, 
        ]        
    },
    {
        name:arrNameBuilding[1],// арена
        nameLocal:"арена",
        list: [{str:'турнир для новичков',price:10,reward:100},
            {str:'турнир для любителей',price:20,reward:300},
            {str:'турнир для профессионалов',price:45,reward:1000},
            {str:'турнир для мастеров',price:80,reward:5000}, 
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
    {name:"Victor", power:20,endurance:8,speedMove:20,},

    {name:"Sasha", power:18,endurance:15,speedMove:15,},
    {name:"Fred", power:15,endurance:28,speedMove:13,},
    {name:"Nikola", power:20,endurance:28,speedMove:10,},

    {name:"Artur", power:40,endurance:60,speedMove:30,},
    {name:"Vadim", power:45,endurance:40,speedMove:50,},
    {name:"Nike", power:60,endurance:50,speedMove:70,},

    {name:"harry", power:95,endurance:90,speedMove:100,},
    {name:"Thomas", power:100,endurance:90,speedMove:90,},
    {name:"Oskar", power:95,endurance:95,speedMove:95,}, 
    {name:"Jack", power:100,endurance:100,speedMove:100,},



];