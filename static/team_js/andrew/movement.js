import * as checks from './checks.js';
import { Entity } from './sprites.js';

import {
    checkCollisionWithLeftEdgesOfObstacles,
    checkCollisionWithRightEdgesOfObstacles,
    checkCollisionWithTopEdgesOfObstacles,
    checkCollisionWithBottomEdgesOfObstacles
} from '../js/collision.js';

export const MOVEMENT_KEY_STATUSES = {
    w: false,
    s: false,
    a: false,
    d: false
};

export function checkForCollisions(sprite) {
    checks.checkIfInstance(sprite, Entity);

    if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.d  && (checkCollisionWithTopEdgesOfObstacles(sprite) === false && checkCollisionWithLeftEdgesOfObstacles(sprite) === false)) {
        sprite.moveSprite(sprite.movementOffset, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.a && (checkCollisionWithTopEdgesOfObstacles(sprite) === false && checkCollisionWithRightEdgesOfObstacles(sprite) === false)) {
        sprite.moveSprite(-sprite.movementOffset, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.d  && (checkCollisionWithBottomEdgesOfObstacles(sprite) === false && checkCollisionWithLeftEdgesOfObstacles(sprite) === false)) {
        sprite.moveSprite(sprite.movementOffset, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.a && (checkCollisionWithBottomEdgesOfObstacles(sprite) === false && checkCollisionWithRightEdgesOfObstacles(sprite) === false)) {
        sprite.moveSprite(-sprite.movementOffset, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w && checkCollisionWithBottomEdgesOfObstacles(sprite) === false) {
        sprite.moveSprite(0, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.s && checkCollisionWithTopEdgesOfObstacles(sprite) === false) {
        sprite.moveSprite(0, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.a && checkCollisionWithRightEdgesOfObstacles(sprite) === false) {
        sprite.moveSprite(-sprite.movementOffset, 0);
    }
    else if (MOVEMENT_KEY_STATUSES.d && checkCollisionWithLeftEdgesOfObstacles(sprite) === false) {
        sprite.moveSprite(sprite.movementOffset, 0);
    }
};
