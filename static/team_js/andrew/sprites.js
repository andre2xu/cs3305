import * as checks from '../js/checks.js';
import { OBSTACLES } from './collision.js';

export class Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        checks.checkIfInstance(texture, PIXI.Texture);
        checks.checkIfNumber(posX);
        checks.checkIfNumber(posY);
        checks.checkIfNumber(frameWidth);
        checks.checkIfNumber(frameHeight);

        this.sprite = new PIXI.Sprite(texture);
        this.spriteFrameWidth = frameWidth;
        this.spriteFrameHeight = frameHeight;

        this.sprite_container = new PIXI.Container();
        this.sprite_container.addChild(this.sprite);
        this.sprite_container.x = posX;
        this.sprite_container.y = posY;

        this.frameMask = null;
        this.frames = {};
        this.currentFrame = null;

        this.isFlippedHorizontally = false;
        this.isFlippedVertically = false;
    };

    load() {
        return this.sprite_container;
    }

    addEvent(event, callback) {
        checks.checkIfString(event);
        checks.checkIfFunction(callback);

        if (this.events[event] === undefined) {
            throw ReferenceError("Not a valid event");
        }

        this.events[event] = callback;
    };

    __setFrameMask__(x, y, frameWidth, frameHeight) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);
        checks.checkIfNumber(frameWidth);
        checks.checkIfNumber(frameHeight);

        this.sprite_container.removeChild(this.frameMask); // removes old frame mask

        const MASK = new PIXI.Graphics();
        MASK.beginFill('black');
        MASK.drawRect(x, y, frameWidth, frameHeight);
        MASK.endFill();

        this.sprite.mask = MASK;
        this.sprite_container.addChild(MASK);
        this.frameMask = MASK;

        this.spriteFrameWidth = frameWidth;
        this.spriteFrameHeight = frameHeight;
    };

    addFrame(name, x, y, w, h) {
        checks.checkIfString(name);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        this.frames[name] = {
            x: x,
            y: y,
            w: w,
            h: h
        };
    };

    switchFrame(name) {
        const FRAME = this.frames[name];

        this.sprite.x = -FRAME.x;
        this.sprite.y = -FRAME.y;

        this.__setFrameMask__(0, 0, FRAME.w, FRAME.h);

        this.currentFrame = name;
    };

    resizeSprite(w, h) {
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        this.sprite_container.width = w;
        this.sprite_container.height = h;
    };

    flipHorizontally() {
        // adding/subtracting the frame width ensures that the sprite is still in the same x-position after the flip

        if (this.isFlippedHorizontally) {
            this.sprite_container.scale.x = 1;
            this.sprite_container.x -= this.spriteFrameWidth;

            this.isFlippedHorizontally = false;
        }
        else {
            this.sprite_container.scale.x = -1;
            this.sprite_container.x += this.spriteFrameWidth;

            this.isFlippedHorizontally = true;
        }
    };

    flipVertically() {
        // adding/subtracting the frame height ensures that the sprite is still in the same y-position after the flip

        if (this.isFlippedVertically) {
            this.sprite_container.scale.y = 1;
            this.sprite_container.y -= this.spriteFrameHeight;

            this.isFlippedVertically = false;
        }
        else {
            this.sprite_container.scale.y = -1;
            this.sprite_container.y += this.spriteFrameHeight;

            this.isFlippedVertically = true;
        }
    };

    getCurrentFrame() {
        return this.currentFrame;
    };

    getCenterCoordinates() {
        return {
            x: this.getLeftPosX() + (this.spriteFrameWidth * 0.5),
            y: this.getLeftPosY() + (this.spriteFrameHeight * 0.5) 
        };
    };

    getLeftPosX() {
        if (this.isFlippedHorizontally) {
            return this.sprite_container.x - this.spriteFrameWidth;
        }
        else {
            return this.sprite_container.x;
        }
    };

    getLeftPosY() {
        if (this.isFlippedVertically) {
            return this.sprite_container.y - this.spriteFrameHeight;
        }
        else {
            return this.sprite_container.y;
        }
    };

    getRightPosX() {
        if (this.isFlippedHorizontally) {
            return this.sprite_container.x;
        }
        else {
            return this.sprite_container.x + this.spriteFrameWidth;
        }
    };

    getRightPosY() {
        if (this.isFlippedVertically) {
            return this.sprite_container.y;
        }
        else {
            return this.sprite_container.y + this.spriteFrameHeight;
        }
    };

    setPosition(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.sprite_container.x = x;
        this.sprite_container.y = y;
    };

    setSpriteFrameDimensions(w, h) {
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        this.spriteFrameWidth = w;
        this.spriteFrameHeight = h;
    };
};

export class Objects extends Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};

export class Entity extends Sprite {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.movementOffset = 5;
        this.events = {
            move: null
        };
    }

    moveSprite(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        if (this.events['move'] !== null) {
            this.events['move']({
                old_posX: this.sprite_container.x,
                old_posY: this.sprite_container.y,
                new_posX: this.sprite_container.x + x,
                new_posY: this.sprite_container.y + y,
                currentFrame: this.currentFrame
            });
        } 

        this.sprite_container.x += x;
        this.sprite_container.y += y;
    };
};



export class Player extends Entity {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};

export class Zombie extends Entity {
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

export class SemiSolid extends Obstacle {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.boundaryLeftX = 0;
        this.boundaryLeftY = 0;
        this.boundaryRightX = 0;
        this.boundaryRightY = 0;
    };

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

export class Decoration extends Objects {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};
