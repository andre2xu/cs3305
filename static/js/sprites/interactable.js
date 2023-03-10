import * as checks from '../helpers/checks.js';
import { Player } from './entities.js';
import { Objects } from './objects.js';
import { Gun } from './weapons.js';


export const INTERACTABLES = [];


export class Interactable extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.areaOfEffect = 20; // adds extra area for the interactble range
    };




    // GETTERS
    playerIsNearInteractable(player) {
        checks.checkIfInstance(player, Player);

        const PLAYER_CENTER = player.getCenterCoordinates();

        const PLAYER_INSIDE_LR_EDGES = PLAYER_CENTER.x > (this.getLeftPosX() - this.areaOfEffect) && PLAYER_CENTER.x < (this.getRightPosX() + this.areaOfEffect);

        const PLAYER_INSIDE_TB_EDGES = PLAYER_CENTER.y > (this.getLeftPosY() - this.areaOfEffect) && PLAYER_CENTER.y < (this.getRightPosY() + this.areaOfEffect);

        if (PLAYER_INSIDE_LR_EDGES && PLAYER_INSIDE_TB_EDGES) {
            return true;
        }
        return false;
    };




    // SETTERS
    setAreaOfEffect(value) {
        checks.checkIfNumber(value);

        this.areaOfEffect = value;
    };



};

export class AmmoCache extends Interactable {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
        this.pointCost = 500
    };



    // SETTERS
    resupply(gun) {
        checks.checkIfInstance(gun, Gun);

        gun.addMaxAmmo(gun.getMaxAmmo());

        gun.playReloadSound();


    };


};


export class UpgradeBench extends Interactable {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
        this.pointCost = 1000
    };

    upgradeGun(gun,option){
        checks.checkIfInstance(gun, Gun);
        //true = upgrade ammo, false = upgrade damage
        if (option){
            gun.increaseMaxAmmo(10)
            gun.increaseClipCapacity(3)
        } else {
            gun.increaseDamage(10)
        }

    }





}

