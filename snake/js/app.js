$(document).ready(function() {
    function rand( min, max ) {
    	if( max ) {
    		return Math.floor(Math.random() * (max - min + 1)) + min;
    	} else {
    		return Math.floor(Math.random() * (min + 1));
    	}
    }

    
    var zmeyka = {};
    zmeyka.speed = 50; // snake spead
    zmeyka.xx = 60; // x
    zmeyka.yy = 60; // y
    zmeyka.polesize = zmeyka.xx*10+10;
    
    zmeyka.elem = [];
    
    var xxx = rand(0,zmeyka.xx);
    var yyy = rand(0,zmeyka.yy);
    zmeyka.elem[0]  = {x: xxx, y: yyy};

    zmeyka.score = 0;
    zmeyka.dlina = zmeyka.score;
    
    zmeyka.yayx = rand(0,zmeyka.xx);
    zmeyka.yayy = rand(0,zmeyka.xx);
     
    zmeyka.poleBuild = function () { // init Area
        var pole = new String();
        for (var y = 0; y < this.yy + 1; y++) {
            for (var x = 0; x < this.xx + 1; x++){
                pole += '<div class="kvadrat" id="xy_' + x + '_' + y + '"></div>';
            }
        }
        $("#body").append('<div style="width: ' + zmeyka.polesize + '; height: ' + zmeyka.polesize + '" class="pole">' + pole + '</div>');   
    }
     
    zmeyka.yaytsoBuild = function (){  // egg create
        $("#xy_" + zmeyka.yayx + "_"+ zmeyka.yayy).addClass('yaytso');
    }
    zmeyka.yaytsoUnBuild = function (){
        $(".yaytso").first().removeClass('yaytso');
    }
    
    
     
    zmeyka.move = function () {
    if (zmeyka.elem.length >= 1 && zmeyka.trevoga==false) { // if snake length > 1
        for (var i = zmeyka.elem.length; i >= 1  ; i--){
                zmeyka.elem[i]  = {x: zmeyka.elem[i-1].x, y: zmeyka.elem[i-1].y}; // позначаємо координати елементів
                // координата останнього - має координату попередника.
                // перевизначаємо усі координати елементів змійки
        }
    }
   
          
    $("#xy_" + zmeyka.elem[0].x + "_"+ zmeyka.elem[0].y).addClass('zmeya');
    $(".zmeyakrasna").removeClass('zmeyakrasna');

    $(".zmeya").removeClass('zmeya');  //// управління головою
            switch (zmeyka.sob) {
              case "left":
                if (zmeyka.elem[0].x > 0){
                zmeyka.elem[0].x--;
                zmeyka.trevoga = false;
                }
                else {
                     
                    zmeyka.trevoga = true
                }
                break
              case "up":
                if (zmeyka.elem[0].y > 0){
                zmeyka.elem[0].y--;
                zmeyka.trevoga = false;
                }
                else zmeyka.trevoga = true
                break
              case "right":
                if (zmeyka.elem[0].x < zmeyka.xx){
                zmeyka.elem[0].x++;
                zmeyka.trevoga = false;
                }
                else zmeyka.trevoga = true
                break
              case "down":
                if (zmeyka.elem[0].y < zmeyka.yy){
                zmeyka.elem[0].y++;
                zmeyka.trevoga = false;
                }
                else zmeyka.trevoga = true
                break
            }     
     
     
     for (var n = 0; n <= zmeyka.score; n++){ // малюємо усі квадрати змійки
     if (n==0){
        $("#xy_" + zmeyka.elem[n].x + "_"+ zmeyka.elem[n].y).addClass('zmeyakrasna');
     }
     else {
            $("#xy_" + zmeyka.elem[n].x + "_"+ zmeyka.elem[n].y).addClass('zmeya');
     }
     }  
     if (zmeyka.elem[0].x == zmeyka.yayx && zmeyka.elem[0].y == zmeyka.yayy){ /// коли яйце зїдене
        zmeyka.elem.push({x: 0, y: 0});
        $(".yaits").html(++zmeyka.score);
        zmeyka.yaytsoUnBuild();
        
        zmeyka.yayx = rand(0,zmeyka.xx);
        zmeyka.yayy = rand(0,zmeyka.xx);
        
        zmeyka.yaytsoBuild();
     }
     
    }
    zmeyka.poleBuild(); // будуємо поле
    setInterval(zmeyka.move, zmeyka.speed);  // запускаємо квадрат
    zmeyka.yaytsoBuild(); // запускаємо яйце
    
    $(window).keydown(function (e) { /// реагування на клавіши
            switch (e.keyCode) {  
              case 37:
               // if (zmeyka.sob!="right")
                zmeyka.sob = "left";
                break
              case 38:
               // if (zmeyka.sob!="down")
                zmeyka.sob = "up";
                break
              case 39:
                //if (zmeyka.sob!="left")
                zmeyka.sob = "right";
                break
              case 40:
                //if (zmeyka.sob!="up")
                zmeyka.sob = "down";
                break
            }
           })     
});