import * as checks from '../helpers/checks.js';

import {
    OBSTACLES,
    NON_PLAYER_ENTITIES
} from './collision.js';



export class Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        checks.checkIfInstance(texture, PIXI.Texture);
        checks.checkIfNumber(posX);
        checks.checkIfNumber(posY);
        checks.checkIfNumber(frameWidth);
        checks.checkIfNumber(frameHeight);

        this.sprite = new PIXI.Sprite(texture);
        this.spriteFrameWidth = frameWidth;
        this.spriteFrameHeight = frameHeight;

        this.sprite_container = new PIXI.Container();
        this.sprite_container.addChild(this.sprite);
        this.sprite_container.x = posX;
        this.sprite_container.y = posY;

        this.frameMask = null;
        this.frames = {};
        this.currentFrame = null;

        this.isFlippedHorizontally = false;
        this.isFlippedVertically = false;
    };



    // GETTERS
    getLeftPosX() {
        if (this.isFlippedHorizontally) {
            return this.sprite_container.x - this.spriteFrameWidth;
        }
        else {
            return this.sprite_container.x;
        }
    };

    getLeftPosY() {
        if (this.isFlippedVertically) {
            return this.sprite_container.y - this.spriteFrameHeight;
        }
        else {
            return this.sprite_container.y;
        }
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
};