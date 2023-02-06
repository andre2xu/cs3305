import * as checks from './checks.js';
import { Player } from './sprites.js';

export const MOUSE_COORDINATES = {x: 0, y: 0};

export function rotatePlayerToMouse(playerSprite) {
    checks.checkIfInstance(playerSprite, Player);

    const PLAYER_POSITION = playerSprite.getCenterCoordinates();

    const MOUSE_X_DISTANCE_FROM_PLAYER = MOUSE_COORDINATES.x - PLAYER_POSITION.x;
    const MOUSE_Y_DISTANCE_FROM_PLAYER = MOUSE_COORDINATES.y - PLAYER_POSITION.y;
    const MOUSE_ANGLE_FROM_PLAYER = Math.round(Math.atan2(MOUSE_Y_DISTANCE_FROM_PLAYER, MOUSE_X_DISTANCE_FROM_PLAYER) * 180 / Math.PI);

    /*
        -90
    -180    0
        90
    */

    if (MOUSE_ANGLE_FROM_PLAYER >= -145 && MOUSE_ANGLE_FROM_PLAYER <= -45) {
        playerSprite.switchFrame('north');
    }
    else if (MOUSE_ANGLE_FROM_PLAYER >= -180 && MOUSE_ANGLE_FROM_PLAYER < -145 || MOUSE_ANGLE_FROM_PLAYER <= 180 && MOUSE_ANGLE_FROM_PLAYER > 145 ) {
        playerSprite.switchFrame('west');
    }
    else if (MOUSE_ANGLE_FROM_PLAYER <= 145 && MOUSE_ANGLE_FROM_PLAYER > 45) {
        playerSprite.switchFrame('south');
    }
    else if (MOUSE_ANGLE_FROM_PLAYER >= 0 && MOUSE_ANGLE_FROM_PLAYER <= 45 || MOUSE_ANGLE_FROM_PLAYER < 0 && MOUSE_ANGLE_FROM_PLAYER > -45) {
        playerSprite.switchFrame('east');
    }
};