//console.log(1);



const Application = PIXI.Application;

const app = new Application({
    transparent: true
});

document.body.appendChild(app.view);

//input setup
let keys = {};
let keysDiv;


//fit canvas to window
app.renderer.resize(window.innerWidth, window.innerHeight)
// blank canvas, to see canvas size, change to any other colour
app.renderer.background.color = 0xA3F8B6
// const loader = PIXI.Loader.shared;

// loader.add("tileset", "")
const playerTexture = PIXI.Texture.from("./static/assets/tile000.png")
const playerSprite = new PIXI.Sprite(playerTexture);
app.stage.addChild(playerSprite)
playerSprite.scale.x = 4;
playerSprite.scale.y = 4;

playerSprite.interactive = true;

app.ticker.add(gameLoop)


window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)
// playerSprite.on("mousedown", function() {
//     playerSprite.position.x +=100
// })
// keysDiv = document.querySelector



//controls setup 

// W = 87, A = 65, S = 83, D = 68
function keysDown(e) {
    console.log(e.keyCode)
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}


function gameLoop(){

    if (keys["87"]){
        playerSprite.y -= 10;
    }

    if (keys["65"]){
        playerSprite.x -= 10;
    }

    if (keys["83"]){
        playerSprite.y += 10;
    }

    if (keys["68"]){
        playerSprite.x += 10;
    }


}









// document.addEventListener("keydown", function(a){
//     if(a.key == ("ArrowLeft" && "ArrowDown"))
//         playerSprite.x -= 10
//         playerSprite.y += 10
//     if(a.key == "ArrowLeft")
//         playerSprite.x -= 20
//     if(a.key == "ArrowRight")
//         playerSprite.x += 20
//     if(a.key == "ArrowUp")
//         playerSprite.y -= 20
//     if(a.key == "ArrowDown")
//         playerSprite.y += 20
    
// })