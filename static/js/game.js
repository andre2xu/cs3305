//to test, go to 127.0.0.1/game after running flask server



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
const weaponTexture2 = PIXI.Texture.from("./static/assets/pistol2.png");

const weaponSprite = new PIXI.Sprite(weaponTexture); 
weaponSprite.scale.x = 3.2
weaponSprite.scale.y = 3.2
app.stage.addChild(weaponSprite)
window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)

// weaponSprite.anchor.set(0.1,0.5)
weaponSprite.pivot.x = 9
weaponSprite.pivot.y = 19


const crosshairTexture = PIXI.Texture.from("./static/assets/crosshair.png")
const crosshairSprite = new PIXI.Sprite(crosshairTexture)

crosshairSprite.scale.set(2,2)
app.stage.addChild(crosshairSprite)


const gra = PIXI.Graphics;

// const rect = new gra();
// rect.beginFill(0x000000)
// rect.drawRect(weaponSprite.pivot.x,weaponSprite.pivot.y,100,100)
// rect.endFill();
// app.stage.addChild(rect)
// //controls setup 

// W = 87, A = 65, S = 83, D = 68
function keysDown(e) {
    // console.log(e.keyCode)
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

//tracks mouse
const line = new gra();
line.lineStyle(5, 0xFFEA00,1)
document.onmousemove = function(e){
    
    
    // line
    // .moveTo(playerSprite.x +90,playerSprite.y +90)
    // .lineTo(e.clientX, e.clientY)

    weaponSprite.rotation = Math.atan2(e.clientY - playerSprite.y,e.clientX - playerSprite.x)
    crosshairSprite.x = e.clientX
    crosshairSprite.y = e.clientY



}



    app.stage.addChild(line)

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
//up
    if (keys["38"]){
        weaponSprite.rotation += 0.1;
    }
    //left
    if (keys["37"]){
        // weaponSprite.setTexture = weaponTexture
        // playerSprite.x -= 10;
        // weaponTexture = PIXI.Texture.from("./static/assets/pistol1.png")
    }
    //down
    if (keys["40"]){
        weaponSprite.rotation -= 0.1;
    }
    //right
    if (keys["39"]){
        // weaponSprite.setTexture = playerTexture
        weaponSprite.texture = weaponTexture2;
    }


    weaponSprite.x = playerSprite.x  +90
    weaponSprite.y = playerSprite.y +90
    // console.log(weaponSprite.pivot)

}
