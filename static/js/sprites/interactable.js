import {Objects} from "./objects.js";
// import * as checks from "../helpers/checks.js";
// import {Player} from "./entities";


export class Interactable extends Objects{

    constructor(texture, posX, posY, frameWidth, frameHeight,price,isPaidOnlyOnce,onUse,player) {
        super(texture, posX, posY, frameWidth, frameHeight);
        this.price = price
        this.isPaidOnlyOnce = isPaidOnlyOnce //flag to differ betweensuff that only needs to be paid once (doors) or stuff that needs to be repeatedly paid for
        this.onUse = onUse //function to be executed when user interacts
        this.player = player
        this.isActive = false
        this.areaOfEffect = 20 // adds extra area for the interactble range
        

    };

    onInteract(){


        console.log(this.isActive)
        if (this.player.currentPoints >= this.price && this.isActive){
            if (this.isPaidOnlyOnce){
                this.price = 0
                this.isPaidOnlyOnce = false
            }

            this.player.points -= this.price
            this.onUse()
        }else {
            console.log("Not enough points!") //todo: make this a popup text
        }




    }


    playerIsNearInteractable() {
        // checks.checkIfInstance(player, Player);

        const PLAYER_CENTER = this.player.getCenterCoordinates();

        if (PLAYER_CENTER.x > this.getLeftPosX()-this.areaOfEffect && PLAYER_CENTER.x < this.getRightPosX()+this.areaOfEffect && PLAYER_CENTER.y > this.getLeftPosY()-this.areaOfEffect && PLAYER_CENTER.y < this.getRightPosY()+this.areaOfEffect) {
            this.isActive = true;
        }else {

            this.isActive = false;
        }
        };

    
    

}

export function ammoCache(gun) {
    gun.addMaxAmmo(60)

}