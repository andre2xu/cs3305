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

    if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.d && (checkCollisionWithTopEdgesOfObstacles(sprite) === false && checkCollisionWithLeftEdgesOfObstacles(sprite) === false)) {
        sprite.moveSpriteSouthEast();
    }
    else if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSpriteSouthWest();
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.d) {
        sprite.moveSpriteNorthEast();
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSpriteNorthWest();
    }
    else if (MOVEMENT_KEY_STATUSES.w) {
        sprite.moveSpriteNorth();
    }
    else if (MOVEMENT_KEY_STATUSES.s && checkCollisionWithTopEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteSouth();
    }
    else if (MOVEMENT_KEY_STATUSES.a) {
        sprite.moveSpriteWest();
    }
    else if (MOVEMENT_KEY_STATUSES.d && checkCollisionWithLeftEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteEast();
    }
};
