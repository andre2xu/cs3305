
export class Pistol{
    constructor(texture){
        this.sprite = new PIXI.Sprite(texture);




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
