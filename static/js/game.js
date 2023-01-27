//to test, go to 127.0.0.1/game after running flask server


import {Pistol} from "./pistol.js";

const Application = PIXI.Application;

const app = new Application({
    transparent: true
});

document.body.appendChild(app.view);

//input setup
let keys = {};



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

const weaponTexture = PIXI.Texture.from("./static/assets/pistol1.png");
const weaponSprite = new Pistol(weaponTexture,0,0)

// const weaponSprite = new PIXI.Sprite(weaponTexture);
// weaponSprite.scale.x = 3.2
// weaponSprite.scale.y = 3.2
weaponSprite.scaleSprite(3.2,3.2)


window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)

weaponSprite.pistolSetPivot()


const crosshairTexture = PIXI.Texture.from("./static/assets/crosshair.png")
const crosshairSprite = new PIXI.Sprite(crosshairTexture)

crosshairSprite.scale.set(2,2)
app.stage.addChild(crosshairSprite)
// //controls setup

// W = 87, A = 65, S = 83, D = 68
function keysDown(e) {
    // console.log(e.keyCode)
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}


var globalMouseX;
var globalMouseY;
//tracks mouse 
document.onmousemove = function(e,GlobalMouseX,GlobalMouseY){


    // line
    // .moveTo(playerSprite.x +90,playerSprite.y +90)
    // .lineTo(e.clientX, e.clientY)

    weaponSprite.pistolRotateToMouse(e.clientY,e.clientX)

    crosshairSprite.x = e.clientX
    crosshairSprite.y = e.clientY


    globalMouseX = e.clientX
    globalMouseY = e.clientY


}



    app.stage.addChild(weaponSprite.load());

function gameLoop(){
    //up
    if (keys["87"]){
        playerSprite.y -= 10;
    }
    //left
    if (keys["65"]){
        playerSprite.x -= 10;
    }
    //down
    if (keys["83"]){
        playerSprite.y += 10;
    }
    //right
    if (keys["68"]){
        playerSprite.x += 10;
    }
    //TODO make pistol rotate only when playerSprite or mouse moves
    weaponSprite.pistolRotateToMouse(globalMouseY,globalMouseX)
    weaponSprite.pistolMoveToPlayer(playerSprite.x,playerSprite.y);
    }


