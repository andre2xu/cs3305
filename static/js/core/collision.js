import * as checks from '../helpers/checks.js';
import { Entity } from '../sprites/entities.js';

export const OBSTACLES = [];
export const NON_PLAYER_ENTITIES = [];

function checkCollisionWithObstacles(sprite, side) {
    checks.checkIfInstance(sprite, Entity);

    const NUM_OF_OBSTACLES = OBSTACLES.length;

    if (NUM_OF_OBSTACLES > 0) {
        const SPRITE_SPEED = sprite.getSpeed();
        const SLX = sprite.getLeftPosX() - SPRITE_SPEED;
        const SLY = sprite.getLeftPosY() - SPRITE_SPEED;
        const SRX = sprite.getRightPosX() + SPRITE_SPEED;
        const SRY = sprite.getRightPosY() + SPRITE_SPEED;

        for (let i=0; i < NUM_OF_OBSTACLES; i++) {
            const OBSTACLE = OBSTACLES[i];

            const OLX = OBSTACLE.getLeftPosX();
            const OLY = OBSTACLE.getLeftPosY();
            const ORX = OBSTACLE.getRightPosX();
            const ORY = OBSTACLE.getRightPosY();

            if (side === 'top') {
                const BOTTOM_Y_IS_BEHIND = SRY < OLY;
                const IN_BETWEEN = SLX >= OLX && SRX <= ORX;
                const LEFT_EDGE_IS_OUTSIDE = SLX < OLX;
                const RIGHT_EDGE_IS_OUTSIDE = SRX > ORX;
                const LEFT_EDGE_IS_INSIDE = SLX >= OLX && SLX <= ORX;
                const RIGHT_EDGE_IS_INSIDE = SRX >= OLX && SRX <= ORX;

                if (BOTTOM_Y_IS_BEHIND === false) {
                    if (IN_BETWEEN) {
                        return true;
                    }
                    else if (LEFT_EDGE_IS_OUTSIDE && RIGHT_EDGE_IS_INSIDE) {
                        return true
                    }
                    else if (RIGHT_EDGE_IS_OUTSIDE && LEFT_EDGE_IS_INSIDE) {
                        return true;
                    }
                }
            }
            else if (side === 'left') {
                const RIGHT_X_IS_BEHIND_LEFT_EDGE = SRX < OLX;
                const RIGHT_X_IS_IN_FRONT_OF_LEFT_EDGE = SRX > OLX;
                const RIGHT_X_IS_IN_FRONT_OF_RIGHT_EDGE = SRX > ORX;
                const IN_BETWEEN = SLY >= OLY && SRY <= ORY;
                const TOP_EDGE_IS_OUTSIDE = SLY < OLY;
                const BOTTOM_EDGE_IS_OUTSIDE = SRY > ORY;
                const TOP_EDGE_IS_INSIDE = SLY >= OLY && SLY <= ORY;
                const BOTTOM_EDGE_IS_INSIDE = SRY >= OLY && SRY <= ORY;

                if (RIGHT_X_IS_IN_FRONT_OF_LEFT_EDGE && RIGHT_X_IS_IN_FRONT_OF_RIGHT_EDGE) {
                    return false;
                }
                else if (RIGHT_X_IS_BEHIND_LEFT_EDGE === false) {
                    if (IN_BETWEEN) {
                        return true;
                    }
                    else if (TOP_EDGE_IS_OUTSIDE && BOTTOM_EDGE_IS_INSIDE) {
                        return true
                    }
                    else if (BOTTOM_EDGE_IS_OUTSIDE && TOP_EDGE_IS_INSIDE) {
                        return true;
                    }
                }
            }
            else if (side === 'right') {
                const LEFT_X_IS_IN_FRONT_OF_RIGHT_EDGE = SLX > ORX;
                const LEFT_X_IS_BEHIND_LEFT_EDGE = SLX < OLX;
                const LEFT_X_IS_BEHIND_RIGHT_EDGE = SLX < ORX;
                const IN_BETWEEN = SLY >= OLY && SRY <= ORY;
                const TOP_EDGE_IS_OUTSIDE = SLY < OLY;
                const BOTTOM_EDGE_IS_OUTSIDE = SRY > ORY;
                const TOP_EDGE_IS_INSIDE = SLY >= OLY && SLY <= ORY;
                const BOTTOM_EDGE_IS_INSIDE = SRY >= OLY && SRY <= ORY;

                if (LEFT_X_IS_BEHIND_LEFT_EDGE && LEFT_X_IS_BEHIND_RIGHT_EDGE) {
                    return false;
                }
                else if (LEFT_X_IS_IN_FRONT_OF_RIGHT_EDGE === false) {
                    if (IN_BETWEEN) {
                        return true;
                    }
                    else if (TOP_EDGE_IS_OUTSIDE && BOTTOM_EDGE_IS_INSIDE) {
                        return true
                    }
                    else if (BOTTOM_EDGE_IS_OUTSIDE && TOP_EDGE_IS_INSIDE) {
                        return true;
                    }
                }
            }
            else if (side === 'bottom') {
                1
            }
        }
    }

    return false;
};

export function checkCollisionWithLeftEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'left');
};

export function checkCollisionWithRightEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'right');
};

export function checkCollisionWithTopEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'top');
};

export function checkCollisionWithBottomEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'bottom');
};
