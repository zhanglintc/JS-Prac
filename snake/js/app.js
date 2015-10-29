$(document).ready(function() {
    function rand( min, max ) {
    	if( max ) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
    	} else {
    		return Math.floor(Math.random() * (min + 1));
    	}
    }

    
    var game = {};
    game.speed  = 50; // snake spead
    game.Width  = 40; // x
    game.Height = 40; // y
    game.gridSize = game.Width*10+10;
    
    game.elem = [];
    
    var xxx = rand(0,game.Width);
    var yyy = rand(0,game.Height);
    game.elem[0]  = {x: xxx, y: yyy};

    game.score = 0;
    game.dlina = game.score;
    
    game.foodX = rand(0,game.Width);
    game.foodY = rand(0,game.Width);
     
    game.poleBuild = function () { // init Area
        var pole = new String();
        for (var y = 0; y < this.Height + 1; y++) {
            for (var x = 0; x < this.Width + 1; x++){
                pole += '<div class="board" id="xy_' + x + '_' + y + '"></div>';
            }
        }
        $("#body").append('<div style="width: ' + game.gridSize + '; height: ' + game.gridSize + '" class="pole">' + pole + '</div>');   
    }
     
    game.createFood = function (){  // egg create
        $("#xy_" + game.foodX + "_"+ game.foodY).addClass('food');
    }
    game.removeFood = function (){
        $(".food").first().removeClass('food');
    }
    
    
     
    game.move = function () {
    if (game.elem.length >= 1 && game.life==false) { // if snake length > 1
        for (var i = game.elem.length; i >= 1  ; i--){
                game.elem[i]  = {x: game.elem[i-1].x, y: game.elem[i-1].y}; // позначаємо координати елементів
                // координата останнього - має координату попередника.
                // перевизначаємо усі координати елементів змійки
        }
    }
   
          
    $("#xy_" + game.elem[0].x + "_"+ game.elem[0].y).addClass('snakeBody');
    $(".snakeHead").removeClass('snakeHead');

    $(".snakeBody").removeClass('snakeBody');  //// управління головою
            switch (game.sob) {
              case "left":
                if (game.elem[0].x > 0){
                game.elem[0].x--;
                game.life = false;
                }
                else {
                     
                    game.life = true
                }
                break
              case "up":
                if (game.elem[0].y > 0){
                game.elem[0].y--;
                game.life = false;
                }
                else game.life = true
                break
              case "right":
                if (game.elem[0].x < game.Width){
                game.elem[0].x++;
                game.life = false;
                }
                else game.life = true
                break
              case "down":
                if (game.elem[0].y < game.Height){
                game.elem[0].y++;
                game.life = false;
                }
                else game.life = true
                break
            }     
     
     
     for (var n = 0; n <= game.score; n++){ // малюємо усі квадрати змійки
     if (n==0){
        $("#xy_" + game.elem[n].x + "_"+ game.elem[n].y).addClass('snakeHead');
     }
     else {
            $("#xy_" + game.elem[n].x + "_"+ game.elem[n].y).addClass('snakeBody');
     }
     }  
     if (game.elem[0].x == game.foodX && game.elem[0].y == game.foodY){ /// коли яйце зїдене
        game.elem.push({x: 0, y: 0});
        $(".yaits").html(++game.score);
        game.removeFood();
        
        game.foodX = rand(0,game.Width);
        game.foodY = rand(0,game.Width);
        
        game.createFood();
     }
     
    }
    game.poleBuild(); // будуємо поле
    setInterval(game.move, game.speed);  // запускаємо квадрат
    game.createFood(); // запускаємо яйце
    
    $(window).keydown(function (e) { /// реагування на клавіши
            switch (e.keyCode) {  
              case 37:
               // if (game.sob!="right")
                game.sob = "left";
                break
              case 38:
               // if (game.sob!="down")
                game.sob = "up";
                break
              case 39:
                //if (game.sob!="left")
                game.sob = "right";
                break
              case 40:
                //if (game.sob!="up")
                game.sob = "down";
                break
            }
           })     
});