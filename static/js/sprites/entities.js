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
    __getMoveDirectionFromAngle__(angle) {
        checks.checkIfNumber(angle);

        if (angle >= -120 && angle <= -60) {
            return 'n';
        }
        else if (angle >= -150 && angle <= -120) {
            return 'nw';
        }
        else if ((angle >= -180 && angle <= -150) || (angle <= 180 && angle >= 150)) {
            return 'w';
        }
        else if (angle <= 150 && angle >= 120) {
            return 'sw';
        }
        else if (angle <= 120 && angle >= 60) {
            return 's';
        }
        else if (angle <= 60 && angle >= 30) {
            return 'se';
        }
        else if ((angle <= 30 && angle >= 0) || (angle <= 0 && angle >= -30)) {
            return 'e';
        }
        else if (angle <= -30 && angle >= -60) {
            return 'ne';
        }
    };

    __getEnemyXandYDistanceFromPlayer__(player) {
        checks.checkIfInstance(player, Player);

        const PLAYER_SPRITE = player.getSprite();
        const PLAYER_CENTER = player.getCenterCoordinates();
        const ENEMY_CENTER = this.getCenterCoordinates(); // relative to parent

        const ENEMY_X_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.x + PLAYER_SPRITE.x) - (ENEMY_CENTER.x + this.sprite_container.x);
        const ENEMY_Y_DISTANCE_FROM_PLAYER = (PLAYER_CENTER.y + PLAYER_SPRITE.y) - (ENEMY_CENTER.y + this.sprite_container.y);

        return {
            dx: ENEMY_X_DISTANCE_FROM_PLAYER,
            dy: ENEMY_Y_DISTANCE_FROM_PLAYER
        };
    };

    __getAngleToPlayer__(player) {
        /*
            -90
        -180    0
            90
        */

        const DISTANCES = this.__getEnemyXandYDistanceFromPlayer__(player);

        return Math.round(Math.atan2(DISTANCES.dy, DISTANCES.dx) * 180 / Math.PI);
    };



    // SETTERS
    __switchFrameToAngle__(angle) {
        if (angle >= -145 && angle <= -45) {
            this.switchFrame('n');
        }
        else if (angle >= -180 && angle < -145 || angle <= 180 && angle > 145 ) {
            this.switchFrame('w');
        }
        else if (angle <= 145 && angle > 45) {
            this.switchFrame('s');
        }
        else if (angle >= 0 && angle <= 45 || angle < 0 && angle > -45) {
            this.switchFrame('e');
        }
    };

    rotateToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);

        this.__switchFrameToAngle__(PLAYER_ANGLE_FROM_ENEMY);
    };

    moveToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);

        if (this.navigationMode === 0) {
            // going after player

            const DIRECTION = this.__getMoveDirectionFromAngle__(PLAYER_ANGLE_FROM_ENEMY);

            switch (DIRECTION) {
                case 'n':
                    const COLLISION_DETECTION = checkCollisionWithBottomEdgesOfObstacles(this);

                    if (COLLISION_DETECTION.status === false) {
                        this.moveSpriteNorth();
                    }
                    else if (COLLISION_DETECTION.status === true) {
                        this.navigationMode = 1;

                        this.objectCollidedWith = COLLISION_DETECTION.object;
                    }
                    break;
                case 'nw':
                    this.moveSpriteNorthWest();
                    break;
                case 'w':
                    this.moveSpriteWest();
                    break;
                case 'sw':
                    this.moveSpriteSouthWest();
                    break;
                case 's':
                    this.moveSpriteSouth();
                    break;
                case 'se':
                    this.moveSpriteSouthEast();
                    break;
                case 'e':
                    this.moveSpriteEast();
                    break;
                case 'ne':
                    this.moveSpriteNorthEast();
                    break;
            }
        }
        else if (this.navigationMode === 1) {
            // going around object

            const DISTANCES = this.__getEnemyXandYDistanceFromPlayer__(player);
            const DISTANCE_BETWEEN_ENEMY_AND_PLAYER = Math.round(Math.sqrt(Math.pow(DISTANCES.dx, 2) + Math.pow(DISTANCES.dy, 2)));

            const CLOSEST_DETOUR = this.objectCollidedWith.getClosestDetour(this);

            if (CLOSEST_DETOUR.distance < DISTANCE_BETWEEN_ENEMY_AND_PLAYER) {
                this.moveToDetour(CLOSEST_DETOUR);
            }
            else {
                this.navigationMode = 0;
            }
        }
    };

    moveToDetour(detour_data) {
        checks.checkIfObject(detour_data);

        const COORDINATES = detour_data.coordinates;
        const ANGLE_TO_DETOUR = Math.round(Math.atan2(COORDINATES.y, COORDINATES.x) * 180 / Math.PI);

        this.__switchFrameToAngle__(ANGLE_TO_DETOUR);
    };
};

export class Zombie extends Enemy {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.setSpeed(0.5);
    };
};
