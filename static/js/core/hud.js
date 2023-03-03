import * as checks from '../helpers/checks.js';
import { Gun } from '../sprites/weapons.js';

const HUD_TEXT_STYLES = {
    fontSize: 20,
    fill: 0xffffff,
};



export const PLAYER_HEALTH_STATUS = new PIXI.Text('Health: 100', HUD_TEXT_STYLES);
PLAYER_HEALTH_STATUS.x = 20;
PLAYER_HEALTH_STATUS.y = 10;

export function updatePlayerHealthStatus(new_value) {
    checks.checkIfNumber(new_value);

    PLAYER_HEALTH_STATUS.text = 'Health: ' + new_value;
};

export const PLAYER_POINTS = new PIXI.Text('Points: 1000', HUD_TEXT_STYLES);
PLAYER_POINTS.x = 300;
PLAYER_POINTS.y = 10;



export function updatePlayerPointsText(new_value) {
    checks.checkIfNumber(new_value);

    PLAYER_POINTS.text = 'Points: ' + new_value;
};



export const AMMO_COUNT = new PIXI.Text('Ammo: n/a', HUD_TEXT_STYLES);
AMMO_COUNT.x = 160;
AMMO_COUNT.y = 10;

export function updateAmmoCount(gun) {
    checks.checkIfInstance(gun, Gun);

    AMMO_COUNT.text = `Ammo: ${gun.getAmmoLoaded()}/${gun.getAmmoLeft()}`;
};

export function hideAmmoCount() {
    AMMO_COUNT.text = '';
};