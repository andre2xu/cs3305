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



    // GETTERS
    getSpeed() {
        return this.movementOffset;
    };



    // SETTERS
    setSpeed(speed) {
        checks.checkIfNumber(speed);

        this.movementOffset = speed;
    };

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
        let player_sprite_parent = this.sprite_container.parent;

        let corrected_offsetX = PLAYER_CENTER.x + player_sprite_parent.x;
        let corrected_offsetY = PLAYER_CENTER.y + player_sprite_parent.y;

        while (player_sprite_parent.parent !== null) {
            player_sprite_parent = player_sprite_parent.parent;

            corrected_offsetX += player_sprite_parent.x;
            corrected_offsetY += player_sprite_parent.y;
        }

        const MOUSE_X_DISTANCE_FROM_PLAYER = window.mouseX - corrected_offsetX;
        const MOUSE_Y_DISTANCE_FROM_PLAYER = window.mouseY - corrected_offsetY;
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

export class Enemy extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        NON_PLAYER_ENTITIES.push(this);
    };



    // SETTERS
    rotateToPlayer(player) {
        checks.checkIfInstance(player, Player);

        const PLAYER_SPRITE = player.getSprite();
        const PLAYER_CENTER = player.getCenterCoordinates();
        const ZOMBIE_CENTER = this.getCenterCoordinates(); // relative to parent

        const ZOMBIE_X_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.x + PLAYER_SPRITE.x) - (ZOMBIE_CENTER.x + this.sprite_container.x);

        const ZOMBIE_Y_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.y + PLAYER_SPRITE.y) - (ZOMBIE_CENTER.y + this.sprite_container.y);

        const ZOMBIE_ANGLE_FROM_PLAYER = Math.round(Math.atan2(ZOMBIE_Y_DISTANCE_FROM_PLAYER, ZOMBIE_X_DISTANCE_FROM_PLAYER) * 180 / Math.PI);

        /*
            -90
        -180    0
            90
        */

        if (ZOMBIE_ANGLE_FROM_PLAYER >= -145 && ZOMBIE_ANGLE_FROM_PLAYER <= -45) {
            this.switchFrame('n');
        }
        else if (ZOMBIE_ANGLE_FROM_PLAYER >= -180 && ZOMBIE_ANGLE_FROM_PLAYER < -145 || ZOMBIE_ANGLE_FROM_PLAYER <= 180 && ZOMBIE_ANGLE_FROM_PLAYER > 145 ) {
            this.switchFrame('w');
        }
        else if (ZOMBIE_ANGLE_FROM_PLAYER <= 145 && ZOMBIE_ANGLE_FROM_PLAYER > 45) {
            this.switchFrame('s');
        }
        else if (ZOMBIE_ANGLE_FROM_PLAYER >= 0 && ZOMBIE_ANGLE_FROM_PLAYER <= 45 || ZOMBIE_ANGLE_FROM_PLAYER < 0 && ZOMBIE_ANGLE_FROM_PLAYER > -45) {
            this.switchFrame('e');
        }
    };
};

export class Zombie extends Enemy {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};
