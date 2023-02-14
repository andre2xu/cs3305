import * as checks from '../helpers/checks.js';
import { Entity } from '../sprites/entities.js';

export const OBSTACLES = [];
export const NON_PLAYER_ENTITIES = [];

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
