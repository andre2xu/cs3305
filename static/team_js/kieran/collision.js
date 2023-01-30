let canvas;
let context;        
let movedown = false;
let moveup = false;
let moveleft = false;
let moveright = false;
let fpsInterval = 100 / 30; 
let now;
let then = Date.now();
let player = {
    x : 40,
    y : 40 ,
    size : 10,
    change : 2
}; 

let wall_left = {
    x : 290,
    y : 0,
    width : 10,
    height : 220
};

let wall_right = {
    x : 0,
    y : 0,
    width : 10,
    height : 230
};

let wall_bottom = {
    x : 0,
    y : 220,
    width : 300,
    height : 10
};

let wall_top = {
    x : 0,
    y : 0,
    width : 290,
    height : 10
};

let wall = {    
    x : 100 ,
    y : 100,
    size : 10
};

let enemy = {
    x : 200 ,
    y : 100,
    size : 10,
    change : 1
};
                
document.addEventListener("DOMContentLoaded", init, false);
            
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    window.addEventListener("keydown", activate, false) 
    window.addEventListener("keyup", deactivate, false)       
    draw();
}
            
function draw() {
    window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "yellow";
   
    context.fillRect(wall.x, wall.y, wall.size, wall.size)
    

    context.fillStyle = "cyan";
    context.fillRect(player.x, player.y, player.size, player.size);

    context.fillStyle = "blue"
    context.fillRect(wall_left.x, wall_left.y, wall_left.width, wall_left.height)

    context.fillStyle = "blue"
    context.fillRect(wall_right.x, wall_right.y, wall_right.width, wall_right.height)

    context.fillStyle = "blue"
    context.fillRect(wall_bottom.x, wall_bottom.y, wall_bottom.width, wall_bottom.height)

    context.fillStyle = "blue"
    context.fillRect(wall_top.x, wall_top.y, wall_top.width, wall_top.height)

    context.fillStyle = "red"
    context.fillRect(enemy.x, enemy.y, enemy.size, enemy.size)

    if (player_collides_object(enemy)) {
        player.x = 40,

        player.y = 40
        return;
    }


    if (player_collides_edge(wall_top)) {
        player.y = player.y +10
       }

    if (player_collides_edge(wall_bottom)) {
        player.y = player.y -10
    }

    if (player_collides_edge(wall_left)) {
        player.x = player.x -10
    }

    if (player_collides_edge(wall_right)) {
        player.x = player.x +10
    }

    if (enemy_collides_edge(wall_top)) {
        enemy.y = enemy.y +10
       }

    if (enemy_collides_edge(wall_bottom)) {
        enemy.y = enemy.y -10
    }

    if (enemy_collides_edge(wall_left)) {
        enemy.x = enemy.x -10
    }

    if (enemy_collides_edge(wall_right)) {
        enemy.x = enemy.x +10
    }

    if (player_collides_object(wall)) {
        if(moveright === true){
            player.x = player.x - 3
        }

        if(moveup === true){
            player.y = player.y + 3 
        }

        if(movedown === true){
            player.y = player.y - 3
        }

        if(moveleft === true){
            player.x = player.x + 3
        }
        else if(player.x+player.size < wall.x + 2){
            player.x = player.x - 3
        }

        else if(player.x > wall.x + wall.size - 2){
            player.x = player.x + 3
        }

        else if(player.y + player.size < wall.y + 2){
            player.y = player.y - 3
        }

        else if(player.y > wall.y + wall.size - 2){
            player.y = player.y + 3
        }
    }

    else {
        player.change = 2
    }

    if (moveright) {
        player.x = player.x + player.change;
    }

    if (moveleft) {
        player.x = player.x - player.change;
    }

    if (moveup) {
        player.y = player.y - player.change;
    }

    if (movedown) {
        player.y = player.y + player.change;
    }
}

function activate (event) {
    let key = event.key;

    if (key === "ArrowLeft") {
        moveleft = true;
    }

    else if (key === "ArrowRight") {
        moveright = true;
    }

    else if (key === "ArrowUp") {
        moveup = true;
    }

    else if (key === "ArrowDown") {
        movedown = true;
    }
}

function deactivate (event) {
    let key = event.key;

    if (key === "ArrowLeft") {
        moveleft = false;
    }

    else if (key === "ArrowRight") {
        moveright = false;
    }

    else if (key === "ArrowUp") {
        moveup = false;
    }

    else if (key === "ArrowDown") {
        movedown = false;
    }
}
    function player_collides_edge(g) {
    if (player.x + player.size < g.x ||
        g.x + g.width < player.x || 
        player.y > g.y + g.height ||
        g.y > player.y + player.size) {
        return false;
        }

    else {
        return true;
    }
}

function player_collides_object(w) {
    if (player.x + player.size < w.x ||
        w.x + w.size < player.x || 
        player.y > w.y + w.size ||
        w.y > player.y + player.size) {
        return false;
        }

    else {
        return true;
    }
}

function enemy_collides_edge(g) {
    if (enemy.x + enemy.size < g.x ||
        g.x + g.width < enemy.x || 
        enemy.y > g.y + g.height ||
        g.y > enemy.y + enemy.size) {
        return false;
        }

    else {
        return true;
    }
}

function stop() {
    window.removeEventListener("keydown", activate, false);
    window.removeEventListener("keyup", deactivate ,false);
    enemy.change = 0;
}