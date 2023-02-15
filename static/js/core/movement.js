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
        const COLLIDED_WITH_A_TOP_EDGE = checkCollisionWithTopEdgesOfObstacles(sprite);
        const COLLIDED_WITH_A_LEFT_EDGE = checkCollisionWithLeftEdgesOfObstacles(sprite);

        if (COLLIDED_WITH_A_TOP_EDGE === false && COLLIDED_WITH_A_LEFT_EDGE === false) {
            sprite.moveSpriteSouthEast();
        }
        else if (COLLIDED_WITH_A_TOP_EDGE) {
            sprite.moveSpriteEast();
        }
        else if (COLLIDED_WITH_A_LEFT_EDGE) {
            sprite.moveSpriteSouth();
        }
    }
    else if (MOVEMENT_KEY_STATUSES.s && MOVEMENT_KEY_STATUSES.a) {
        const COLLIDED_WITH_A_TOP_EDGE = checkCollisionWithTopEdgesOfObstacles(sprite);
        const COLLIDED_WITH_A_RIGHT_EDGE = checkCollisionWithRightEdgesOfObstacles(sprite);

        if (COLLIDED_WITH_A_TOP_EDGE === false && COLLIDED_WITH_A_RIGHT_EDGE === false) {
            sprite.moveSpriteSouthWest();
        }
        else if (COLLIDED_WITH_A_TOP_EDGE) {
            sprite.moveSpriteWest();
        }
        else if (COLLIDED_WITH_A_RIGHT_EDGE) {
            sprite.moveSpriteSouth();
        }
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.d) {
        const COLLIDED_WITH_A_BOTTOM_EDGE = checkCollisionWithBottomEdgesOfObstacles(sprite);
        const COLLIDED_WITH_A_LEFT_EDGE = checkCollisionWithLeftEdgesOfObstacles(sprite);

        if (COLLIDED_WITH_A_BOTTOM_EDGE === false && COLLIDED_WITH_A_LEFT_EDGE === false) {
            sprite.moveSpriteNorthEast();
        }
        else if (COLLIDED_WITH_A_BOTTOM_EDGE) {
            sprite.moveSpriteEast();
        }
        else if (COLLIDED_WITH_A_LEFT_EDGE) {
            sprite.moveSpriteNorth();
        }
    }
    else if (MOVEMENT_KEY_STATUSES.w && MOVEMENT_KEY_STATUSES.a) {
        const COLLIDED_WITH_A_BOTTOM_EDGE = checkCollisionWithBottomEdgesOfObstacles(sprite);
        const COLLIDED_WITH_A_RIGHT_EDGE = checkCollisionWithRightEdgesOfObstacles(sprite);

        if (COLLIDED_WITH_A_BOTTOM_EDGE === false && COLLIDED_WITH_A_RIGHT_EDGE === false) {
            sprite.moveSpriteNorthWest();
        }
        else if (COLLIDED_WITH_A_BOTTOM_EDGE) {
            sprite.moveSpriteWest();
        }
        else if (COLLIDED_WITH_A_RIGHT_EDGE) {
            sprite.moveSpriteNorth();
        }
    }
    else if (MOVEMENT_KEY_STATUSES.w && checkCollisionWithBottomEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteNorth();
    }
    else if (MOVEMENT_KEY_STATUSES.s && checkCollisionWithTopEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteSouth();
    }
    else if (MOVEMENT_KEY_STATUSES.a && checkCollisionWithRightEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteWest();
    }
    else if (MOVEMENT_KEY_STATUSES.d && checkCollisionWithLeftEdgesOfObstacles(sprite) === false) {
        sprite.moveSpriteEast();
    }
};
