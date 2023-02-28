import * as checks from '../helpers/checks.js';
import { Objects } from './objects.js';
import { Gun } from './weapons.js';



export function ammoCache(gun) {
    checks.checkIfInstance(gun, Gun);

    gun.addMaxAmmo(60);
};



export const INTERACTABLES = [];

export class Interactable extends Objects{
    constructor(texture, posX, posY, frameWidth, frameHeight, price, isPaidOnlyOnce, onUse) {
        super(texture, posX, posY, frameWidth, frameHeight);

        checks.checkIfNumber(price);
        checks.checkIfBoolean(isPaidOnlyOnce);
        checks.checkIfFunction(onUse);



        this.price = price;

        this.isPaidOnlyOnce = isPaidOnlyOnce; // flag to differ between interactables that only need to be paid once (e.g. doors), and those that need to be repeatedly paid for (e.g. ammo cache)

        this.onUse = onUse // function to be executed when user interacts

        this.isActive = false;

        this.areaOfEffect = 20; // adds extra area for the interactble range
    };



    // GETTERS
    playerIsNearInteractable(player) {
        checks.checkIfInstance(player);

        const PLAYER_CENTER = this.player.getCenterCoordinates();

        const PLAYER_INSIDE_LR_EDGES = PLAYER_CENTER.x > (this.getLeftPosX() - this.areaOfEffect) && PLAYER_CENTER.x < (this.getRightPosX() + this.areaOfEffect);

        const PLAYER_INSIDE_TB_EDGES = PLAYER_CENTER.y > (this.getLeftPosY() - this.areaOfEffect) && PLAYER_CENTER.y < (this.getRightPosY() + this.areaOfEffect);

        if (PLAYER_INSIDE_LR_EDGES && PLAYER_INSIDE_TB_EDGES) {
            this.isActive = true;
        }
        else {
            this.isActive = false;
        }
    };



    // SETTERS
    // onInteract(){
    //     if (this.player.currentPoints >= this.price && this.isActive) {
    //         if (this.isPaidOnlyOnce) {
    //             this.price = 0;
    //             this.isPaidOnlyOnce = false;
    //         }

    //         this.player.points -= this.price;
    //         this.onUse();
    //     }
    //     else {
    //         console.log("Not enough points!") //todo: make this a popup text
    //     }
    // };
};
