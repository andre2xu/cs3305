import * as checks from '../helpers/checks.js';

export const PLAYER_HEALTH_STATUS = new PIXI.Text('Health: 100', {
    fontSize: 20,
    fill: 0xffffff,
});
PLAYER_HEALTH_STATUS.x = 20;
PLAYER_HEALTH_STATUS.y = 10;

export function updatePlayerHealthStatus(new_value) {
    checks.checkIfNumber(new_value);

    PLAYER_HEALTH_STATUS.text = 'Health: ' + new_value;
};