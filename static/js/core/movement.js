import * as checks from '../helpers/checks.js';
import { Player } from '../sprites/entities.js';

import {
    checkCollisionWithLeftEdgesOfObstacles,
    checkCollisionWithRightEdgesOfObstacles,
    checkCollisionWithTopEdgesOfObstacles,
    checkCollisionWithBottomEdgesOfObstacles
} from '../core/collision.js';

export const MOVEMENT_KEY_STATUSES = {
    w: false,
    s: false,
    a: false,
    d: false
};

export function checkForCollisionsAndMovePlayer(sprite) {
    checks.checkIfInstance(sprite, Player);

    if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.d) {
        sprite.moveSprite(sprite.movementOffset, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSprite(-sprite.movementOffset, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.d) {
        sprite.moveSprite(sprite.movementOffset, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSprite(-sprite.movementOffset, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.w) {
        sprite.moveSprite(0, -sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.s && checkCollisionWithTopEdgesOfObstacles(sprite) === false) {
        sprite.moveSprite(0, sprite.movementOffset);
    }
    else if (MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSprite(-sprite.movementOffset, 0);
    }
    else if (MOVEMENT_KEY_STATUSES.d) {
        sprite.moveSprite(sprite.movementOffset, 0);
    }
};
