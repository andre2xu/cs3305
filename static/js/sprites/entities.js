import * as checks from '../helpers/checks.js';
import { Sprite } from './base/base.js';
import { NON_PLAYER_ENTITIES } from '../core/collision.js';

import {
    checkCollisionWithBottomEdgesOfObstacles,
    checkCollisionWithLeftEdgesOfObstacles,
    checkCollisionWithRightEdgesOfObstacles,
    checkCollisionWithTopEdgesOfObstacles
} from '../core/collision.js';



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

    moveSpriteNorth() {
        this.moveSprite(0, -this.movementOffset);
    };

    moveSpriteNorthWest() {
        this.moveSprite(-this.movementOffset, -this.movementOffset);
    };

    moveSpriteNorthEast() {
        this.moveSprite(this.movementOffset, -this.movementOffset);
    };

    moveSpriteWest() {
        this.moveSprite(-this.movementOffset, 0);
    };

    moveSpriteEast() {
        this.moveSprite(this.movementOffset, 0);
    };

    moveSpriteSouth() {
        this.moveSprite(0, this.movementOffset);
    };

    moveSpriteSouthWest() {
        this.moveSprite(-this.movementOffset, this.movementOffset);
    };

    moveSpriteSouthEast() {
        this.moveSprite(this.movementOffset, this.movementOffset);
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

        this.navigationMode = 0; // 0 = going after player | 1 = going around object
        this.objectCollidedWith = null;

        NON_PLAYER_ENTITIES.push(this);
    };



    // GETTERS
    __getAngleToPlayer__(player) {
        checks.checkIfInstance(player, Player);

        /*
            -90
        -180    0
            90
        */

        const PLAYER_SPRITE = player.getSprite();
        const PLAYER_CENTER = player.getCenterCoordinates();
        const ENEMY_CENTER = this.getCenterCoordinates(); // relative to parent

        const ENEMY_X_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.x + PLAYER_SPRITE.x) - (ENEMY_CENTER.x + this.sprite_container.x);

        const ENEMY_Y_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.y + PLAYER_SPRITE.y) - (ENEMY_CENTER.y + this.sprite_container.y);

        return Math.round(Math.atan2(ENEMY_Y_DISTANCE_FROM_PLAYER, ENEMY_X_DISTANCE_FROM_PLAYER) * 180 / Math.PI);
    };



    // SETTERS
    rotateToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);

        if (PLAYER_ANGLE_FROM_ENEMY >= -145 && PLAYER_ANGLE_FROM_ENEMY <= -45) {
            this.switchFrame('n');
        }
        else if (PLAYER_ANGLE_FROM_ENEMY >= -180 && PLAYER_ANGLE_FROM_ENEMY < -145 || PLAYER_ANGLE_FROM_ENEMY <= 180 && PLAYER_ANGLE_FROM_ENEMY > 145 ) {
            this.switchFrame('w');
        }
        else if (PLAYER_ANGLE_FROM_ENEMY <= 145 && PLAYER_ANGLE_FROM_ENEMY > 45) {
            this.switchFrame('s');
        }
        else if (PLAYER_ANGLE_FROM_ENEMY >= 0 && PLAYER_ANGLE_FROM_ENEMY <= 45 || PLAYER_ANGLE_FROM_ENEMY < 0 && PLAYER_ANGLE_FROM_ENEMY > -45) {
            this.switchFrame('e');
        }
    };

    moveToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);

        if (this.navigationMode === 0) {
            // going after player

            const PLAYER_N = PLAYER_ANGLE_FROM_ENEMY >= -120 && PLAYER_ANGLE_FROM_ENEMY <= -60;

            const PLAYER_NW = PLAYER_ANGLE_FROM_ENEMY >= -150 && PLAYER_ANGLE_FROM_ENEMY <= -120;

            const PLAYER_W = (PLAYER_ANGLE_FROM_ENEMY >= -180 && PLAYER_ANGLE_FROM_ENEMY <= -150) || (PLAYER_ANGLE_FROM_ENEMY <= 180 && PLAYER_ANGLE_FROM_ENEMY >= 150);

            const PLAYER_SW = PLAYER_ANGLE_FROM_ENEMY <= 150 && PLAYER_ANGLE_FROM_ENEMY >= 120;

            const PLAYER_S = PLAYER_ANGLE_FROM_ENEMY <= 120 && PLAYER_ANGLE_FROM_ENEMY >= 60;

            const PLAYER_SE = PLAYER_ANGLE_FROM_ENEMY <= 60 && PLAYER_ANGLE_FROM_ENEMY >= 30;

            const PLAYER_E = (PLAYER_ANGLE_FROM_ENEMY <= 30 && PLAYER_ANGLE_FROM_ENEMY >= 0) || (PLAYER_ANGLE_FROM_ENEMY <= 0 && PLAYER_ANGLE_FROM_ENEMY >= -30);

            const PLAYER_NE = PLAYER_ANGLE_FROM_ENEMY <= -30 && PLAYER_ANGLE_FROM_ENEMY >= -60;



            if (PLAYER_N) {
                const COLLISION_DETECTION = checkCollisionWithBottomEdgesOfObstacles(this);

                if (COLLISION_DETECTION.status === false) {
                    this.moveSpriteNorth();
                }
                else {
                    this.navigationMode = 1;

                    this.objectCollidedWith = COLLISION_DETECTION.object;
                }
            }
            else if (PLAYER_NW) {
                this.moveSpriteNorthWest();
            }
            else if (PLAYER_W) {
                this.moveSpriteWest();
            }
            else if (PLAYER_SW) {
                this.moveSpriteSouthWest();
            }
            else if (PLAYER_S) {
                this.moveSpriteSouth();
            }
            else if (PLAYER_SE) {
                this.moveSpriteSouthEast();
            }
            else if (PLAYER_E) {
                this.moveSpriteEast();
            }
            else if (PLAYER_NE) {
                this.moveSpriteNorthEast();
            }
        }
        else if (this.navigationMode === 1) {
            // going around object

            const PLAYER_SPRITE = player.getSprite();
            const PLAYER_CENTER = player.getCenterCoordinates();
            const ENEMY_CENTER = this.getCenterCoordinates(); // relative to parent

            const ENEMY_X_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.x + PLAYER_SPRITE.x) - (ENEMY_CENTER.x + this.sprite_container.x);
            const ENEMY_Y_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.y + PLAYER_SPRITE.y) - (ENEMY_CENTER.y + this.sprite_container.y);

            const DISTANCE_BETWEEN_ENEMY_AND_PLAYER = Math.round(Math.sqrt(Math.pow(ENEMY_X_DISTANCE_FROM_PLAYER, 2) + Math.pow(ENEMY_Y_DISTANCE_FROM_PLAYER, 2)));



        }
    };
};

export class Zombie extends Enemy {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.setSpeed(0.5);
    };
};
