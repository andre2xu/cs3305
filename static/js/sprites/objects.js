import * as checks from '../helpers/checks.js';
import { OBSTACLES } from '../core/collision.js';
import { Entity } from '../sprites/entities.js';

import {
    Sprite,
    FillSprite
} from './base/base.js';

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



    // GETTERS
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

    checkIfBottomEdgeCollisionOccurred(sprite) {
        checks.checkIfInstance(sprite, Sprite);

        if (sprite.getRightPosX() < this.getLeftPosX()) {
            // if the sprite's right edge is far from the object's left edge
            return false;
        }
        else if (sprite.getLeftPosX() > this.getRightPosX()) {
            // if the sprite's left edge is far from the object's right edge
            return false;
        }
        else if (sprite.getLeftPosY() > this.getRightPosY()) {
            // if the sprite's top edge is lower than the object's bottom edge
            return false;
        }
        else if (sprite.getRightPosY() < this.getRightPosY()) {
            // if the sprite's bottom edge is beyond the object's bottom edge
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



    // SETTERS
    modifyCollisionBoundary(leftX, leftY, rightX, rightY) {
        if (leftX !== null && leftX !== undefined) {
            checks.checkIfNumber(leftX);
            this.boundaryLeftX = leftX;
        }
        if (leftY !== null && leftY !== undefined) {
            checks.checkIfNumber(leftY);
            this.boundaryLeftY = leftY;
        }
        if (rightX !== null && rightX !== undefined) {
            checks.checkIfNumber(rightX);
            this.boundaryRightX = rightX;
        }
        if (rightY !== null && rightY !== undefined) {
            checks.checkIfNumber(rightY);
            this.boundaryRightY = rightY;
        }
    };



    // GETTERS
    getLeftPosX() {
        if (this.isFlippedHorizontally) {
            return (this.sprite_container.x + this.boundaryLeftX) - this.spriteFrameWidth;
        }
        else {
            return this.sprite_container.x + this.boundaryLeftX;
        }
    };

    getLeftPosY() {
        if (this.isFlippedVertically) {
            return (this.sprite_container.y + this.boundaryLeftY) - this.spriteFrameHeight;
        }
        else {
            return this.sprite_container.y + this.boundaryLeftY;
        }
    };

    getRightPosX() {
        if (this.isFlippedHorizontally) {
            return this.sprite_container.x + this.boundaryLeftX;
        }
        else {
            return this.sprite_container.x + (this.spriteFrameWidth + this.boundaryRightX);
        }
    };

    getRightPosY() {
        if (this.isFlippedVertically) {
            return this.sprite_container.y + this.boundaryLeftY;
        }
        else {
            return this.sprite_container.y + (this.spriteFrameHeight + this.boundaryRightY);
        }
    };
};



export class ObstacleFill extends FillSprite {
    constructor(color, posX, posY, width, height) {
        super(color, posX, posY, width, height);

        this.detours = [];

        OBSTACLES.push(this);
    };



    // GETTERS
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

    checkIfBottomEdgeCollisionOccurred(sprite) {
        checks.checkIfInstance(sprite, Sprite);

        if (sprite.getRightPosX() < this.getLeftPosX()) {
            // if the sprite's right edge is far from the object's left edge
            return false;
        }
        else if (sprite.getLeftPosX() > this.getRightPosX()) {
            // if the sprite's left edge is far from the object's right edge
            return false;
        }
        else if (sprite.getLeftPosY() > this.getRightPosY()) {
            // if the sprite's top edge is lower than the object's bottom edge
            return false;
        }
        else if (sprite.getRightPosY() < this.getRightPosY()) {
            // if the sprite's bottom edge is beyond the object's bottom edge
            return false;
        }

        return true;
    };

    getClosestDetour(entity) {
        checks.checkIfInstance(entity, Entity);

        const ENTITY_CENTER = entity.getCenterCoordinates();

        let closestDetour = null;
        let previousDistance = null;
        const NUM_OF_DETOURS = this.detours.length;

        for (let i=0; i < NUM_OF_DETOURS; i++) {
            const DETOUR = this.detours[i];
            const DISTANCE = Math.round(Math.sqrt(Math.pow(ENTITY_CENTER.x - DETOUR.x, 2) + Math.pow(ENTITY_CENTER.y - DETOUR.y, 2)));

            if (closestDetour === null || DISTANCE < previousDistance) {
                closestDetour = DETOUR;
                previousDistance = DISTANCE;
            }
        }

        return {
            coordinates: closestDetour,
            distance: previousDistance
        };
    };



    // SETTERS
    addDetour(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.detours.push({x: x, y: y});
    };
};

export class DecorationFill extends FillSprite {
    constructor(color, posX, posY, width, height) {
        super(color, posX, posY, width, height);
    };
};

export class SemiSolidFill extends ObstacleFill {
    constructor(color, posX, posY, width, height) {
        super(color, posX, posY, width, height);

        this.boundaryLeftX = 0;
        this.boundaryLeftY = 0;
        this.boundaryRightX = 0;
        this.boundaryRightY = 0;
    };



    // SETTERS
    modifyCollisionBoundary(leftX, leftY, rightX, rightY) {
        if (leftX !== null && leftX !== undefined) {
            checks.checkIfNumber(leftX);
            this.boundaryLeftX = leftX;
        }
        if (leftY !== null && leftY !== undefined) {
            checks.checkIfNumber(leftY);
            this.boundaryLeftY = leftY;
        }
        if (rightX !== null && rightX !== undefined) {
            checks.checkIfNumber(rightX);
            this.boundaryRightX = rightX;
        }
        if (rightY !== null && rightY !== undefined) {
            checks.checkIfNumber(rightY);
            this.boundaryRightY = rightY;
        }
    };



    // GETTERS
    getLeftPosX() {
        return this.sprite.x + this.boundaryLeftX;
    };

    getLeftPosY() {
        return this.sprite.y + this.boundaryLeftY;
    };

    getRightPosX() {
        return this.sprite.x + (this.fillWidth + this.boundaryRightX);
    };

    getRightPosY() {
        return this.sprite.y + (this.fillHeight + this.boundaryRightY);
    };
};
