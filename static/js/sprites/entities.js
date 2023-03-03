import * as checks from '../helpers/checks.js';
import { Sprite } from './base/base.js';
import { NON_PLAYER_ENTITIES } from '../core/collision.js';
import { Item } from '../sprites/base/base.js';
import { updatePlayerHealthStatus } from '../core/hud.js';

import {
    showDeathScreen,
    hideDeathScreen
} from '../core/death_screen.js';

import {
    toggleCrosshair,
    Weapon,
    Gun
} from './weapons.js';

import {
    Obstacle,
    ObstacleFill
} from '../sprites/objects.js';

import {
    checkCollisionWithBottomEdgesOfObstacles,
    checkCollisionWithLeftEdgesOfObstacles,
    checkCollisionWithRightEdgesOfObstacles,
    checkCollisionWithTopEdgesOfObstacles
} from '../core/collision.js';
import {SOUND_ASSETS_FOLDER} from "../helpers/urls";



export class Entity extends Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.movementOffset = 5;

        this.events = {
            move: [],
            onChangeFrame: []
        };

        this.itemInstance = null;
        this.equippedItem = null;



        this.addEvent('onChangeFrame', () => {
            if (this.itemInstance !== null) {
                this.sprite_container.removeChild(this.equippedItem);

                if (this.itemInstance instanceof Weapon) {
                    this.__renderWeapon__(this.itemInstance, this.currentFrame);
                }
            }
        });
    };



    // GETTERS
    __renderWeapon__(weapon, frame) {
        checks.checkIfInstance(weapon, Weapon);
        checks.checkIfString(frame);

        if (frame === 'n' || frame === 'nl' || frame === 'nr') {
            this.equippedItem = weapon.loadNorth();

            this.sprite_container.addChildAt(this.equippedItem, 0);

            return;
        }
        else if (frame === 's' || frame === 'sl' || frame === 'sr') {
            this.equippedItem = weapon.loadSouth();
        }
        else if (frame === 'w' || frame === 'wl' || frame === 'wr') {
            this.equippedItem = weapon.loadWest();
        }
        else if (frame === 'e' || frame === 'el' || frame === 'er') {
            this.equippedItem = weapon.loadEast();
        }

        this.sprite_container.addChild(this.equippedItem);
    };

    getSpeed() {
        return this.movementOffset;
    };



    // SETTERS
    equip(item) {
        checks.checkIfInstance(item, Item);

        this.itemInstance = item;

        if (item instanceof Weapon) {
            this.__renderWeapon__(item, this.currentFrame);
        }
    };

    unequip() {
        this.sprite_container.removeChild(this.equippedItem);

        this.itemInstance = null;
        this.equippedItem = null;
    };

    showDamage() {
        this.sprite.tint = 0xff0000;
    };

    hideDamage() {
        this.sprite.tint = this.original_tint;
    };

    setSpeed(speed) {
        checks.checkIfNumber(speed);

        this.movementOffset = speed;
    };

    moveSprite(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.sprite_container.x += x;
        this.sprite_container.y += y;



        const EVENT = this.events['move'];

        if (EVENT !== undefined && EVENT !== null) {
            const EVENT_CALLBACKS = EVENT;
            const NUM_OF_CALLBACKS = EVENT_CALLBACKS.length;

            for (let i=0; i < NUM_OF_CALLBACKS; i++) {
                EVENT_CALLBACKS[i]({
                    currentFrame: this.currentFrame
                });
            }
        } 
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

        this.health = 100;
        this.invincibility = false;
        this.currentPoints = 1000;



        let reset_to_idle_timer = null;

        this.addEvent('move', (event) => {
            clearTimeout(reset_to_idle_timer);

            reset_to_idle_timer = setTimeout(() => {
                this.rotateToMouse(); // resets player sprite to the idle frame
            }, 100);



            // moving animation for hands
            if (new Date().getMilliseconds() % 2 === 0) {
                if (event.currentFrame === 's' || event.currentFrame === 'sr') {
                    this.switchFrame('sl');
                }
                else if (event.currentFrame === 'sl') {
                    this.switchFrame('sr');
                }
                else if (event.currentFrame === 'e' || event.currentFrame === 'er') {
                    this.switchFrame('el');
                }
                else if (event.currentFrame === 'w' || event.currentFrame === 'wr') {
                    this.switchFrame('wl');
                }
                else if (event.currentFrame === 'wl') {
                    this.switchFrame('wr');
                }
                else if (event.currentFrame === 'e' || event.currentFrame === 'er') {
                    this.switchFrame('el');
                }
                else if (event.currentFrame === 'el') {
                    this.switchFrame('er');
                }
                else if (event.currentFrame === 'n' || event.currentFrame === 'nr') {
                    this.switchFrame('nl');
                }
                else if (event.currentFrame === 'nl') {
                    this.switchFrame('nr');
                }
            }
        });
    };



    // GETTERS
    isInvincible() {
        return this.invincibility;
    };

    getHealth() {
        return this.health;
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

    activateInvincibility() {
        this.invincibility = true;

        setTimeout(() => {
            this.invincibility = false;

            this.hideDamage();
        }, 1000);
    };

    setHealth(health) {
        checks.checkIfNumber(health);

        this.health = health;
    };

    increaseHealth(value) {
        checks.checkIfNumber(value);

        this.health += value;

        if (this.health > 100) {
            this.health = 100;
        }

        updatePlayerHealthStatus(this.health);
    };

    decreaseHealth(value) {
        checks.checkIfNumber(value);

        this.health -= value;

        this.showDamage();
        updatePlayerHealthStatus(this.health);

        if (this.health < 0) {
            this.health = 0;
        }

        if (this.health === 0) {
            this.sprite.parent.removeChild(this.sprite); // un-renders player

            showDeathScreen();
        }
    };
};

export class Enemy extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.navigationMode = 0;
        this.objectCollidedWith = null;
        this.edgeCollidedWith = null;
        this.detourChosen = null;
        this.detourPointIndex = 0;
        this.isDead = false

        NON_PLAYER_ENTITIES.push(this);



        this.sprite_container.interactive = true;

        this.sprite_container.on('mousedown', (event) => {
            event.stopPropagation();

            if (window.HOTBAR !== undefined && window.HOTBAR !== null) {
                const SELECTED_ITEM = window.HOTBAR.getSelItem();

                if (SELECTED_ITEM instanceof Gun) {
                    SELECTED_ITEM.fire();

                    if (SELECTED_ITEM.ammoLoaded > 0) {
                        this.decreaseHealth(SELECTED_ITEM.getDamage());

                        this.showDamage();

                        setTimeout(() => {
                            this.hideDamage();
                        }, 500);
                    }
                }
            }
        });

        this.sprite_container.on('mousemove', () => {
            toggleCrosshair(this.sprite_container);
        });
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

    getClosestDetour(object, edge) {
        if (object instanceof Obstacle === false && object instanceof ObstacleFill === false) {
            return; // silently fail
        }

        checks.checkIfString(edge);
        edge = edge.toLowerCase();

        if (edge !== 'bottom' && edge !== 'top' && edge !== 'left' && edge !== 'right') {
            throw ReferenceError("Edge can only be one of the following: top, bottom, left, right");
        }

        const ALL_DETOURS = object.getDetours(edge);

        const ENTITY_CENTER = this.getCenterCoordinates();

        let closestDetour = null;
        let previousDistance = null;
        const NUM_OF_DETOURS = ALL_DETOURS.length;

        for (let i=0; i < NUM_OF_DETOURS; i++) {
            const START_OF_DETOUR = ALL_DETOURS[i][0];

            const DISTANCE = Math.round(Math.sqrt(Math.pow(ENTITY_CENTER.x - START_OF_DETOUR.x, 2) + Math.pow(ENTITY_CENTER.y - START_OF_DETOUR.y, 2)));

            if (closestDetour === null || DISTANCE < previousDistance) {
                closestDetour = ALL_DETOURS[i];
                previousDistance = DISTANCE;
            }
        }

        if (closestDetour !== null) {
            return [...closestDetour];
        }
        else {
            return null;
        }
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

    stopFollowingPlayerAndMoveAroundObject(collision_data) {
        checks.checkIfObject(collision_data);

        if (collision_data.object instanceof Obstacle === false && collision_data.object instanceof ObstacleFill === false) {
            throw TypeError("Object must be an obstacle.");
        }

        if (collision_data.edge === undefined) {
            throw SyntaxError("Collision data is missing edge information.");
        }

        checks.checkIfString(collision_data.edge);

        this.navigationMode = 1;
        this.objectCollidedWith = collision_data.object;
        this.edgeCollidedWith = collision_data.edge;
    };

    stopFollowingDetourAndChasePlayerAgain(player) {
        checks.checkIfInstance(player, Player);

        this.detourChosen = null;
        this.detourPointIndex = 0;

        this.navigationMode = 0;
        this.objectCollidedWith = null;
        this.edgeCollidedWith = null;

        this.__switchFrameToAngle__(this.__getAngleToPlayer__(player));
    };

    moveToPlayer(player) {
        const PLAYER_ANGLE_FROM_ENEMY = this.__getAngleToPlayer__(player);

        if (this.navigationMode === 0) {
            // going after player

            const DIRECTION = this.__getMoveDirectionFromAngle__(PLAYER_ANGLE_FROM_ENEMY);

            const BEC = checkCollisionWithBottomEdgesOfObstacles(this);
            const TEC = checkCollisionWithTopEdgesOfObstacles(this);

            if (DIRECTION === 'e' || DIRECTION === 'ne' || DIRECTION === 'se') {
                const LEC = checkCollisionWithLeftEdgesOfObstacles(this);

                switch (DIRECTION) {
                    case 'e':
                        if (LEC.status === false) {
                            this.moveSpriteEast();
                        }
                        else if (LEC.status === true) {
                            this.stopFollowingPlayerAndMoveAroundObject(LEC);
                        }
                        break;
                    case 'ne':
                        if (BEC.status === false && LEC.status === false) {
                            this.moveSpriteNorthEast();
                        }
                        break;
                    case 'se':
                        if (TEC.status === false && LEC.status === false) {
                            this.moveSpriteSouthEast();
                        }
                        break;
                }
            }
            else if (DIRECTION === 'w' || DIRECTION === 'nw' || DIRECTION === 'sw') {
                const REC = checkCollisionWithRightEdgesOfObstacles(this);

                switch (DIRECTION) {
                    case 'w':
                        if (REC.status === false) {
                            this.moveSpriteWest();
                        }
                        else if (REC.status === true) {
                            this.stopFollowingPlayerAndMoveAroundObject(REC);
                        }
                        break;
                    case 'nw':
                        if (BEC.status === false && REC.status === false) {
                            this.moveSpriteNorthWest();
                        }
                        break;
                    case 'sw':
                        if (TEC.status === false && REC.status === false) {
                            this.moveSpriteSouthWest();
                        }
                        break;
                }
            }
            else if (DIRECTION === 'n') {
                if (BEC.status === false) {
                    this.moveSpriteNorth();
                }
                else if (BEC.status === true) {
                    this.stopFollowingPlayerAndMoveAroundObject(BEC);
                }
            }
            else if (DIRECTION === 's') {
                if (TEC.status === false) {
                    this.moveSpriteSouth();
                }
                else if (TEC.status === true) {
                    this.stopFollowingPlayerAndMoveAroundObject(TEC);
                }
            }



            // deals damage to player on contact
            if (player.isInvincible() === false && player.getHealth() > 0 && this.sprite.alpha >= 1) {
                const DIFFERENCES = this.__getEnemyXandYDistanceFromPlayer__(player);

                const DISTANCE_BETWEEN_ENEMY_CENTER_AND_PLAYER_CENTER = Math.sqrt(Math.pow(DIFFERENCES.dx, 2) + Math.pow(DIFFERENCES.dy, 2));

                if (DISTANCE_BETWEEN_ENEMY_CENTER_AND_PLAYER_CENTER <= 40) {
                    this.__damagePlayer___(player);
                }
            }
        }
        else if (this.navigationMode === 1) {
            // going around object

            const DISTANCE_DIFFERENCE = this.__getEnemyXandYDistanceFromPlayer__(player);

            const DISTANCE_BETWEEN_ENEMY_AND_PLAYER = Math.round(Math.sqrt(Math.pow(DISTANCE_DIFFERENCE.dx, 2) + Math.pow(DISTANCE_DIFFERENCE.dy, 2)));



            if (this.detourChosen === null && this.edgeCollidedWith !== null) {
                this.detourChosen = this.getClosestDetour(this.objectCollidedWith, this.edgeCollidedWith); // gets copy of saved detours
            }
            else if (this.detourChosen !== null && this.detourChosen.constructor === Array) {
                const NUM_OF_DETOURS = this.detourChosen.length;

                if (NUM_OF_DETOURS > 0) {
                    const POINT = this.detourChosen[this.detourPointIndex];
                    const ENEMY_CENTER = this.getCenterCoordinates();
                    const DISTANCE_BETWEEN_ENEMY_AND_POINT = Math.round(Math.sqrt(Math.pow(ENEMY_CENTER.x - POINT.x, 2) + Math.pow(ENEMY_CENTER.y - POINT.y, 2)));

                    // compares distance between enemy and current point to the distance between enemy and the player
                    if (DISTANCE_BETWEEN_ENEMY_AND_POINT < DISTANCE_BETWEEN_ENEMY_AND_PLAYER) {
                        this.moveToDetourPoint(POINT);
                    }
                    else {
                        this.stopFollowingDetourAndChasePlayerAgain(player);

                        return;
                    }

                    // moves the enemy to the next point
                    if (Math.round(ENEMY_CENTER.x) === POINT.x && Math.round(ENEMY_CENTER.y) === POINT.y) {
                        this.detourPointIndex += 1;
                    }

                    // stop following detour since the last point has been reached
                    if (this.detourPointIndex === this.detourChosen.length) {
                        this.stopFollowingDetourAndChasePlayerAgain(player);
                    }
                }
            }
        }
    };

    moveToDetourPoint(point) {
        checks.checkIfObject(point);

        if (point.x === undefined || point.y === undefined) {
            throw SyntaxError("Point must be an object with x and y as properties.");
        }

        checks.checkIfNumber(point.x);
        checks.checkIfNumber(point.y);

        const ENEMY_CENTER = this.getCenterCoordinates();
        const ANGLE_TO_DETOUR = Math.round(Math.atan2(point.y - ENEMY_CENTER.y, point.x - ENEMY_CENTER.x) * 180 / Math.PI);

        this.__switchFrameToAngle__(ANGLE_TO_DETOUR);

        const DIRECTION = this.__getMoveDirectionFromAngle__(ANGLE_TO_DETOUR);

        switch (DIRECTION) {
            case 'n':
                this.moveSpriteNorth();
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
    };

    decreaseHealth(value) {
        checks.checkIfNumber(value);

        this.health -= value;

        this.removeSelf();
    };

    removeSelf(){
        if (this.health <= 0) {
            // references to enemy get deleted so that its instance can be put in the garbage collector (memory optimization)
            new Audio(this.deathSoundFile).play()
            this.sprite_container.parent.removeChild(this.sprite_container);

            NON_PLAYER_ENTITIES.splice(NON_PLAYER_ENTITIES.indexOf(this), 1);
            return true
        }
        return false

    }
};

export class Zombie extends Enemy {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.health = 100;
        this.damage = 20;
        this.deathSoundFile = `${SOUND_ASSETS_FOLDER}/zombie-death.mp3` //https://www.fesliyanstudios.com/royalty-free-sound-effects-download/zombie-174

        this.setSpeed(0.5);
    };



    // SETTERS
    __damagePlayer___(player) {
        checks.checkIfInstance(player, Player);

        player.decreaseHealth(this.damage);

        player.activateInvincibility();
    };
};
