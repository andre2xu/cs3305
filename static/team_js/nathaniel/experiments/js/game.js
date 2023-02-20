// this file can be used to test the inventory class
import {Pistol} from "./pistol.js"
import {Inventory} from "./Inventory.js"
import {Item} from "./Item.js";

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
const playerTexture = PIXI.Texture.from("./assets/tile000.png")
const playerSprite = new PIXI.Sprite(playerTexture);
app.stage.addChild(playerSprite)
playerSprite.scale.x = 4;
playerSprite.scale.y = 4;

playerSprite.interactive = true;

app.ticker.add(gameLoop)

const weaponTexture = PIXI.Texture.from("./assets/pistol1.png");
const weaponSprite = new Pistol(weaponTexture)
const selectTexture = PIXI.Texture.from("./assets/selector.png")
const inventoryTexture = PIXI.Texture.from("./assets/hotbar.png")
const inventorySprite = new Inventory(inventoryTexture,(window.innerWidth/2) - 205,(window.innerHeight) - 80,selectTexture)
// const weaponSprite = new PIXI.Sprite(weaponTexture);
// weaponSprite.scale.x = 3.2
// weaponSprite.scale.y = 3.2
weaponSprite.scaleSprite(3.2,3.2)

// inventorySprite.changeSelItem(0)
window.addEventListener("keydown", keysDown)
window.addEventListener("keyup", keysUp)

weaponSprite.pistolSetPivot()


const crosshairTexture = PIXI.Texture.from("./assets/crosshair.png")
const crosshairSprite = new PIXI.Sprite(crosshairTexture)

crosshairSprite.scale.set(2,2)
app.stage.addChild(crosshairSprite)
// //controls setup

// W = 87, A = 65, S = 83, D = 68
function keysDown(e) {
    console.log(e.keyCode)
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}
const wpnInv = PIXI.Texture.from("./assets/pistol1.png")

var sampleItem = new Item(0,0,wpnInv,0,0)
var sampleItem2 = new Item(0,0,wpnInv,0,0)


// inventorySprite.addItem(wpnSprite)
// inventorySprite.addItem(wpnSprite2)
inventorySprite.addItem(sampleItem)
inventorySprite.addItem(sampleItem2)
var globalMouseX;
var globalMouseY;
//tracks mouse 
document.onmousemove = function(e){


    // line
    // .moveTo(playerSprite.x +90,playerSprite.y +90)
    // .lineTo(e.clientX, e.clientY)

    weaponSprite.pistolRotateToMouse(e.clientY,e.clientX)

    crosshairSprite.x = e.clientX
    crosshairSprite.y = e.clientY


    globalMouseX = e.clientX
    globalMouseY = e.clientY


}


    inventorySprite.scaleSprite(1.6,1.6)
    app.stage.addChild(weaponSprite.load());
    app.stage.addChild(inventorySprite.load())
function gameLoop(){
    //left arrow
    if (keys["37"]){
        inventorySprite.removeItem(1);
    }
    //up arrow
    if (keys["38"]){
        inventorySprite.useSelItem()
    }
    //right arrow
    if (keys["39"]){
        inventorySprite.addItemOnIndex(sampleItem2,1,0)
    }
    //right
    if (keys["68"]){
        playerSprite.x += 10;
    }
    //W
    if (keys["87"]){
        playerSprite.y -= 10;
    }
    //A
    if (keys["65"]){
        playerSprite.x -= 10;
    }
    //S
    if (keys["83"]){
        playerSprite.y += 10;
    }
    //D
    if (keys["68"]){
        playerSprite.x += 10;
    }

//keys 1-8
    if (keys["49"]){
        inventorySprite.changeSelItem(1)
    }
    if (keys["50"]){
        inventorySprite.changeSelItem(2)
    }
    if (keys["51"]){
        inventorySprite.changeSelItem(3)
    }
    if (keys["52"]){
        inventorySprite.changeSelItem(4)
    }
    if (keys["53"]){
        inventorySprite.changeSelItem(5)
    }
    if (keys["54"]){
        inventorySprite.changeSelItem(6)
    }
    if (keys["55"]){
        inventorySprite.changeSelItem(7)
    }
    if (keys["56"]){
        inventorySprite.changeSelItem(8)
    }
    //TODO make pistol rotate only when playerSprite or mouse moves
    weaponSprite.pistolRotateToMouse(globalMouseY,globalMouseX)
    weaponSprite.pistolMoveToPlayer(playerSprite.x,playerSprite.y);
    }



// keep this empty until the end

