
export class Pistol{
    constructor(texture,posX,posY){
        this.sprite = new PIXI.Sprite(texture);
        // this.posY = posY
        // this.posX = posX



    }

    load() {
        return this.sprite;
    }

    moveSprite(x, y) {
        this.sprite.x += x;
        this.sprite.y += y;
    };

    scaleSprite(scaleX, scaleY) {
        this.sprite.scale.set(scaleX,scaleY);
    };


    //WILL BE USEFUL LATER


    // flipHorizontally() {
    //     // adding/subtracting the frame width ensures that the sprite is still in the same x-position after the flip
    //
    //     if (this.isFlippedHorizontally) {
    //         this.sprite_container.scale.x = 1;
    //         this.sprite_container.x -= this.spriteFrameWidth;
    //
    //         this.isFlippedHorizontally = false;
    //     }
    //     else {
    //         this.sprite_container.scale.x = -1;
    //         this.sprite_container.x += this.spriteFrameWidth;
    //
    //         this.isFlippedHorizontally = true;
    //     }
    // };
    //
    // flipVertically() {
    //     // adding/subtracting the frame height ensures that the sprite is still in the same y-position after the flip
    //
    //     if (this.isFlippedVertically) {
    //         this.sprite_container.scale.y = 1;
    //         this.sprite_container.y -= this.spriteFrameHeight;
    //
    //         this.isFlippedVertically = false;
    //     }
    //     else {
    //         this.sprite_container.scale.y = -1;
    //         this.sprite_container.y += this.spriteFrameHeight;
    //
    //         this.isFlippedVertically = true;
    //     }
    // };
    //
    // getLeftPosX() {
    //     return this.sprite_container.x;
    // };
    //
    // getLeftPosY() {
    //     return this.sprite_container.y;
    // };
    //
    // getRightPosX() {
    //     if (this.isFlippedHorizontally) {
    //         return this.sprite_container.x;
    //     }
    //     else {
    //         return this.sprite_container.x + this.spriteFrameWidth;
    //     }
    // };
    //
    // getRightPosY() {
    //     if (this.isFlippedVertically) {
    //         return this.sprite_container.y;
    //     }
    //     else {
    //         return this.sprite_container.y + this.spriteFrameHeight;
    //     }
    // };

    setPosX(x) {
        this.sprite.x = x;
    };

    setPosY(y) {
        this.sprite.y = y;
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