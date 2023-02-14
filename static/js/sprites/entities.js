import * as checks from '../helpers/checks.js';
import { Sprite } from './base/base.js';
import { NON_PLAYER_ENTITIES } from '../core/collision.js';

export class Entity extends Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.movementOffset = 5;
        this.events = {
            move: null
        };
    };



    // SETTERS
    moveSprite(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        if (this.events['move'] !== null) {
            this.events['move']({
                old_posX: this.sprite_container.x,
                old_posY: this.sprite_container.y,
                new_posX: this.sprite_container.x + x,
                new_posY: this.sprite_container.y + y,
                currentFrame: this.currentFrame
            });
        } 

        this.sprite_container.x += x;
        this.sprite_container.y += y;
    };
};

export class Player extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };



    // SETTERS
    rotateToMouse() {
        const PLAYER_CENTER = this.getCenterCoordinates(); // relative to parent

        const CORRECTED_CENTER_X = PLAYER_CENTER.x + this.sprite_container.parent.x + this.sprite_container.parent.parent.x;
        const CORRECTED_CENTER_Y = PLAYER_CENTER.y + this.sprite_container.parent.y + this.sprite_container.parent.parent.y;

        const MOUSE_X_DISTANCE_FROM_PLAYER = window.mouseX - CORRECTED_CENTER_X;
        const MOUSE_Y_DISTANCE_FROM_PLAYER = window.mouseY - CORRECTED_CENTER_Y;
        const MOUSE_ANGLE_FROM_PLAYER = Math.round(Math.atan2(MOUSE_Y_DISTANCE_FROM_PLAYER, MOUSE_X_DISTANCE_FROM_PLAYER) * 180 / Math.PI);

        /*
            -90
        -180    0
            90
        */

        if (MOUSE_ANGLE_FROM_PLAYER >= -145 && MOUSE_ANGLE_FROM_PLAYER <= -45) {
            this.switchFrame('n');
        }
        else if (MOUSE_ANGLE_FROM_PLAYER >= -180 && MOUSE_ANGLE_FROM_PLAYER < -145 || MOUSE_ANGLE_FROM_PLAYER <= 180 && MOUSE_ANGLE_FROM_PLAYER > 145 ) {
            this.switchFrame('w');
        }
        else if (MOUSE_ANGLE_FROM_PLAYER <= 145 && MOUSE_ANGLE_FROM_PLAYER > 45) {
            this.switchFrame('s');
        }
        else if (MOUSE_ANGLE_FROM_PLAYER >= 0 && MOUSE_ANGLE_FROM_PLAYER <= 45 || MOUSE_ANGLE_FROM_PLAYER < 0 && MOUSE_ANGLE_FROM_PLAYER > -45) {
            this.switchFrame('e');
        }
    };
};
