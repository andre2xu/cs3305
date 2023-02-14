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
};
