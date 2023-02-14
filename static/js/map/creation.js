import * as checks from '../helpers/checks.js';

import {
    Sprite,
    FillSprite
} from '../sprites/base/base.js';

export class PlayableArea {
    constructor(width, height) {
        this.area = new PIXI.Container();
        this.area.interactive = true;

        this.width = width;
        this.height = height;

        const BACKGROUND = new PIXI.Graphics();
        BACKGROUND.beginFill(0xFFFFFF);
        BACKGROUND.drawRect(0, 0, width, height);
        BACKGROUND.endFill();

        this.area.addChild(BACKGROUND);

        this.staticSprites = {};
        this.dynamicSprites = {};

        this.STATIC_SPRITES_CONTAINER = new PIXI.Container();
        this.DYNAMIC_SPRITES_CONTAINER = new PIXI.Container();

        this.area.addChild(
            this.STATIC_SPRITES_CONTAINER,
            this.DYNAMIC_SPRITES_CONTAINER
        );
    };



    // GETTERS
    getLeftPosX() {
        return this.area.x;
    };

    getLeftPosY() {
        return this.area.y;
    };

    getRightPosX() {
        return this.area.x + this.area.width;
    };

    getRightPosY() {
        return this.area.y + this.area.height;
    };

    getWidth() {
        return this.width;
    };

    getHeight() {
        return this.height;
    };

    getHalfWidth() {
        return this.width * 0.5;
    };

    getHalfHeight() {
        return this.height * 0.5;
    };

    load() {
        return this.area;
    };



    // SETTERS
    setPosition(x, y) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.area.x = x;
        this.area.y = y;
    };

    addEvent(event, callback) {
        checks.checkIfString(event);
        checks.checkIfFunction(callback);

        this.area.on(event, callback);
    };

    addStaticSprite(sprite, id, x, y) {
        if ((sprite instanceof Sprite) === false && (sprite instanceof FillSprite) === false) {
            throw ReferenceError(`Not an instance of ${Sprite.name} or ${FillSprite.name}`);
        }

        checks.checkIfString(id);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        if (this.staticSprites[id] !== undefined) {
            throw ReferenceError(`A sprite with the id '${id}' already exists`);
        }

        this.STATIC_SPRITES_CONTAINER.addChild(sprite.getSprite());
        this.staticSprites[id] = sprite;

        sprite.setPosition(x, y);
    };

    addDynamicSprite(sprite, id, x, y) {
        if ((sprite instanceof Sprite) === false && (sprite instanceof FillSprite) === false) {
            throw ReferenceError(`Not an instance of ${Sprite.name} or ${FillSprite.name}`);
        }

        checks.checkIfString(id);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        if (this.dynamicSprites[id] !== undefined) {
            throw ReferenceError(`A sprite with the id '${id}' already exists`);
        }

        this.DYNAMIC_SPRITES_CONTAINER.addChild(sprite.getSprite());
        this.dynamicSprites[id] = sprite;

        sprite.setPosition(x, y);
    };
};
