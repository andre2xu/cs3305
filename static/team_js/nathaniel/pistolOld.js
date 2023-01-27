import { Sprite } from "./sprites.js";
// turns out you can't really import methods in javascript without using prototypes...
//and you can only have prototypes with function style class...
// so i just copy pasted the methods lmao
export class Pistol extends Sprite{
    constructor(texture,posX,posY){
        super(texture,posX ,posY );


    }

    load() {
        return this.sprite_container;
    }

    addMask(x, y, frameWidth, frameHeight) {
        const MASK = new PIXI.Graphics();
        MASK.beginFill('black');
        MASK.drawRect(x, y, frameWidth, frameHeight);
        MASK.endFill();

        this.sprite.mask = MASK;
        this.sprite_container.addChild(MASK);

        this.spriteFrameWidth = w;
        this.spriteFrameHeight = h;
    };

    moveSprite(x, y) {
        this.sprite_container.x += x;
        this.sprite_container.y += y;
    };

    resizeSprite(w, h) {
        this.sprite_container.width = w;
        this.sprite_container.height = h;
    };

    flipHorizontally() {
        // adding/subtracting the frame width ensures that the sprite is still in the same x-position after the flip

        if (this.isFlippedHorizontally) {
            this.sprite_container.scale.x = 1;
            this.sprite_container.x -= this.spriteFrameWidth;

            this.isFlippedHorizontally = false;
        }
        else {
            this.sprite_container.scale.x = -1;
            this.sprite_container.x += this.spriteFrameWidth;

            this.isFlippedHorizontally = true;
        }
    };

    flipVertically() {
        // adding/subtracting the frame height ensures that the sprite is still in the same y-position after the flip

        if (this.isFlippedVertically) {
            this.sprite_container.scale.y = 1;
            this.sprite_container.y -= this.spriteFrameHeight;

            this.isFlippedVertically = false;
        }
        else {
            this.sprite_container.scale.y = -1;
            this.sprite_container.y += this.spriteFrameHeight;

            this.isFlippedVertically = true;
        }
    };

    getLeftPosX() {
        return this.sprite_container.x;
    };

    getLeftPosY() {
        return this.sprite_container.y;
    };

    getRightPosX() {
        if (this.isFlippedHorizontally) {
            return this.sprite_container.x;
        }
        else {
            return this.sprite_container.x + this.spriteFrameWidth;
        }
    };

    getRightPosY() {
        if (this.isFlippedVertically) {
            return this.sprite_container.y;
        }
        else {
            return this.sprite_container.y + this.spriteFrameHeight;
        }
    };

    setPosX(x) {
        this.sprite_container.x = x;
    };

    setPosY(y) {
        this.sprite_container.y = y;
    };

    setSpriteFrameDimensions(w, h) {
        this.spriteFrameWidth = w;
        this.spriteFrameHeight = h;
    };
    //sets rotation to match where he mouse pointer is
    //needs to be inside the onmousemove function
    pistolRotateToMouse(mouseY,mouseX) {
        this.sprite.rotation = Math.atan2(mouseY - this.sprite.y,mouseX - this.sprite.x)
    }
    //moves pistol to player model + a offset so the pistol is in the sprite's hand
    pistolMoveToPlayer(playerXPos,playerYPos){
        this.setPosX(playerXPos + 90)
        this.setPosY(playerYPos + 90)
    }
    //might be useful to have in general Sprite class
    pistolSetPivot(){
        this.sprite.pivot.x = 9
        this.sprite.pivot.y = 19

    }



}