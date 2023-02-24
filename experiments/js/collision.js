import * as checks from '../js/checks.js';
import { Entity } from '../js/sprites.js';

export const OBSTACLES = [];

function checkCollisionWithObstacles(sprite, side) {
    checks.checkIfInstance(sprite, Entity);

    const NUM_OF_OBSTACLES = OBSTACLES.length;

    if (NUM_OF_OBSTACLES > 0) {
        for (let i=0; i < NUM_OF_OBSTACLES; i++) {
            const OBSTACLE = OBSTACLES[i];

            if (side === 'top' && OBSTACLE.checkIfTopEdgeCollisionOccurred(sprite)) {
                return true;
            }
            else if (side === 'left' && OBSTACLE.checkIfLeftEdgeCollisionOccurred(sprite)) {
                return true;
            }
            else if (side === 'right' && OBSTACLE.checkIfRightEdgeCollisionOccurred(sprite)) {
                return true;
            }
            else if (side === 'bottom' && OBSTACLE.checkIfBottomEdgeCollisionOccurred(sprite)) {
                return true;
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
