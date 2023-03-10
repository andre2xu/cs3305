import * as checks from '../../helpers/checks.js';

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

        this.original_tint = this.sprite.tint;
        this.frameMask = null;
        this.frames = {};
        this.currentFrame = null;

        this.isFlippedHorizontally = false;
        this.isFlippedVertically = false;

        this.events = {};
    };



    // GETTERS
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

    getCenterCoordinates() {
        return {
            x: this.getLeftPosX() + this.getHalfWidth(),
            y: this.getLeftPosY() + this.getHalfHeight() 
        };
    };

    getSpriteFrameDimensions() {
        return {w: this.spriteFrameWidth, h: this.spriteFrameHeight};
    };

    getHalfWidth() {
        return this.spriteFrameWidth * 0.5;
    };

    getHalfHeight() {
        return this.spriteFrameHeight * 0.5;
    };

    getCurrentFrame() {
        return this.currentFrame;
    };

    getSprite() {
        return this.sprite_container;
    };



    // SETTERS
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

    setPosition(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.sprite_container.x = x;
        this.sprite_container.y = y;
    };

    addEvent(event, callback) {
        checks.checkIfString(event);
        checks.checkIfFunction(callback);

        if (this.events[event] === undefined) {
            throw ReferenceError("Not a valid event");
        }

        this.events[event].push(callback);
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

    addFrames(json) {
        checks.checkIfObject(json);

        const FRAME_NAMES = Object.keys(json);
        const NUM_OF_FRAMES = FRAME_NAMES.length;

        if (NUM_OF_FRAMES > 0) {
            for (let i=0; i < NUM_OF_FRAMES; i++) {
                const NAME = FRAME_NAMES[i];
                const FRAME_DATA = json[NAME];

                this.addFrame(
                    NAME,
                    FRAME_DATA.x,
                    FRAME_DATA.y,
                    FRAME_DATA.w,
                    FRAME_DATA.h
                );
            }
        }
    };

    switchFrame(name) {
        const FRAME = this.frames[name];

        this.sprite.x = -FRAME.x;
        this.sprite.y = -FRAME.y;

        this.__setFrameMask__(0, 0, FRAME.w, FRAME.h);

        this.currentFrame = name;



        const EVENT = this.events['onChangeFrame'];

        if (EVENT !== undefined && EVENT !== null) {
            const EVENT_CALLBACKS = EVENT;
            const NUM_OF_CALLBACKS = EVENT_CALLBACKS.length;

            for (let i=0; i < NUM_OF_CALLBACKS; i++) {
                EVENT_CALLBACKS[i]({
                    currentFrame: this.currentFrame
                });
            }
        }
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
};

export class FillSprite {
    constructor(color, posX, posY, width, height) {
        checks.checkIfNumber(color);
        checks.checkIfNumber(posX);
        checks.checkIfNumber(posY);
        checks.checkIfNumber(width);
        checks.checkIfNumber(height);

        this.FILL = new PIXI.Graphics();
        this.FILL.beginFill(color);
        this.FILL.drawRect(0, 0, width, height);
        this.FILL.endFill();
        this.sprite = this.FILL;

        this.sprite.x = posX;
        this.sprite.y = posY;

        this.fillWidth = width;
        this.fillHeight = height;
    };



    // GETTERS
    getLeftPosX() {
        return this.sprite.x;
    };

    getLeftPosY() {
        return this.sprite.y;
    };

    getRightPosX() {
        return this.sprite.x + this.fillWidth;
    };

    getRightPosY() {
        return this.sprite.y + this.fillHeight;
    };

    getCenterCoordinates() {
        return {
            x: this.getLeftPosX() + this.getHalfWidth(),
            y: this.getLeftPosY() + this.getHalfHeight() 
        };
    };

    getFillDimensions() {
        return {w: this.fillWidth, h: this.fillHeight};
    };

    getHalfWidth() {
        return this.fillWidth * 0.5;
    };

    getHalfHeight() {
        return this.fillHeight * 0.5;
    };

    getSprite() {
        return this.sprite;
    };



    // SETTERS
    setPosition(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.sprite.x = x;
        this.sprite.y = y;
    };

    setFillDimensions(w, h) {
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        this.fillWidth = w;
        this.fillHeight = h;
    };

    setAlpha(alpha) {
        checks.checkIfNumber(alpha);

        if (alpha < 0 || alpha > 1) {
            throw Error("Alpha must be a value between 0 and 1.");
        }

        this.FILL.alpha = alpha;
    };
};



export class Item {
    constructor(texture) {
        checks.checkIfInstance(texture, PIXI.Texture);

        this.texture = texture;
        this.icon = new PIXI.Sprite(texture);
    };



    // GETTERS
    getIcon() {
        return this.icon;
    };
};
