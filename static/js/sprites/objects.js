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

    checkIfLeftEdgeCollisionOccurred(sprite) {
        checks.checkIfInstance(sprite, Sprite);

        if (sprite.getRightPosY() < this.getLeftPosY()) {
            // if the sprite's bottom edge is higher than the object's top edge
            return false;
        }
        else if (sprite.getLeftPosY() > this.getRightPosY()) {
            // if the sprite's top edge is lower than the object's bottom edge
            return false;
        }
        else if (sprite.getRightPosX() < this.getLeftPosX()) {
            // if the sprite's right edge is far from the object's left edge
            return false;
        }
        else if (sprite.getLeftPosX() > this.getLeftPosX()) {
            // if the sprite's left edge is beyond the object's left edge
            return false;
        }

        return true;
    };

    checkIfRightEdgeCollisionOccurred(sprite) {
        checks.checkIfInstance(sprite, Sprite);

        if (sprite.getRightPosY() < this.getLeftPosY()) {
            // if the sprite's bottom edge is higher than the object's top edge
            return false;
        }
        else if (sprite.getLeftPosY() > this.getRightPosY()) {
            // if the sprite's top edge is lower than the object's bottom edge
            return false;
        }
        else if (sprite.getLeftPosX() > this.getRightPosX()) {
            // if the sprite's left edge is far from the object's right edge
            return false;
        }
        else if (sprite.getRightPosX() < this.getRightPosX()) {
            // if the sprite's right edge is beyond the object's right edge
            return false;
        }

        return true;
    };

    checkIfTopEdgeCollisionOccurred(sprite) {
        checks.checkIfInstance(sprite, Sprite);

        if (sprite.getRightPosX() < this.getLeftPosX()) {
            // if the sprite's right edge is far from the object's left edge
            return false;
        }
        else if (sprite.getLeftPosX() > this.getRightPosX()) {
            // if the sprite's left edge is far from the object's right edge
            return false;
        }
        else if (sprite.getRightPosY() < this.getLeftPosY()) {
            // if the sprite's bottom edge is higher than the object's top edge
            return false;
        }
        else if (sprite.getLeftPosY() > this.getLeftPosY()) {
            // if the sprite's top edge is beyond the object's top edge
            return false;
        }

        return true;
    };
};

export class Decoration extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};

export class SemiSolid extends Obstacle {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.boundaryLeftX = 0;
        this.boundaryLeftY = 0;
        this.boundaryRightX = 0;
        this.boundaryRightY = 0;
    };
};