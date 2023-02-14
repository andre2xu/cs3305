import * as checks from '../helpers/checks.js';
import { Sprite } from './base/base.js';
import { OBSTACLES } from '../core/collision.js';

export class Objects extends Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};

export class Obstacle extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        OBSTACLES.push(this);
    };
};