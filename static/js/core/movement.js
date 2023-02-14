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
