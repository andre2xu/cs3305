import * as checks from '../helpers/checks.js';
import { Gun } from '../sprites/weapons.js';

import {
    Obstacle,
    ObstacleFill,
    DecorationFill
} from '../sprites/objects.js';

import {
    Sprite,
    FillSprite
} from '../sprites/base/base.js';



// MAP SYNTAX
/*
import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    
} from '../../sprites/objects.js';

export const MAP_NAME = (function () {
    const MAP_NAME = new PlayableArea(w, h); // DO NOT REMOVE

    const OBJECT = new ObjectClass(getTextureFromStaticJSFolder('path/to/object/image/from/static/js.png'), 0, 0, w, h);
    FOYER.addStaticSprite(
        OBJECT,
        'object_id',
        x,
        y
    );

    ...

    return MAP_NAME; // DO NOT REMOVE
})();
*/



export class PlayableArea {
    constructor(width, height) {
        this.area = new PIXI.Container();

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



        this.area.interactive = true;

        this.area.on('mousedown', () => {
            if (window.HOTBAR !== undefined && window.HOTBAR !== null) {
                const SELECTED_ITEM = window.HOTBAR.getSelItem();

                if (SELECTED_ITEM instanceof Gun) {
                    SELECTED_ITEM.fire();
                }
            }
        });
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
        console.log(id)
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

    sortSpriteOrder() {
        // SPRITE ORDERING
        const ALL_SPRITES = Object.values(this.dynamicSprites);
        const NUM_OF_SPRITES = ALL_SPRITES.length;

        if (NUM_OF_SPRITES > 0) {
            let posY_of_sprites = [];

            // gets the y coordinate of the bottom edge of every sprite
            for (let i=0; i < NUM_OF_SPRITES; i++) {
                const CURRENT_SPRITE = ALL_SPRITES[i];

                posY_of_sprites.push(CURRENT_SPRITE.getRightPosY());
            }

            // sorts the y coordinates in ascending order
            posY_of_sprites = posY_of_sprites.sort();

            for (let i=0; i < NUM_OF_SPRITES; i++) {
                const CURRENT_POSY = posY_of_sprites[i];

                for (let j=0; j < NUM_OF_SPRITES; j++) {
                    const UNSORTED_SPRITE = ALL_SPRITES[j];

                    // corrects the z-order of all the sprites according to the sorted y coordinates
                    if (UNSORTED_SPRITE.getRightPosY() === CURRENT_POSY) {
                        this.DYNAMIC_SPRITES_CONTAINER.setChildIndex(UNSORTED_SPRITE.getSprite(), i);
                    }
                }
            }
        }
    };

    colorCoordinate(color, x, y, w, h) {
        checks.checkIfNumber(color);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        const P = new DecorationFill(color, x, y, w, w);
        this.area.addChild(P.getSprite());

        if (w > 1) {
            x = x - (w * 0.5);
        }
        if (h > 1) {
            y = y - (h * 0.5);
        }

        P.setPosition(x, y);
    };

    __addDetour__(object, edge, array_of_points, color) {
        if (object instanceof Obstacle === false && object instanceof ObstacleFill === false) {
            throw TypeError("Object must be an obstacle.");
        }

        checks.checkIfString(edge);

        switch (edge) {
            case 'bottom':
                object.addBottomEdgeDetour(array_of_points);
                break;
            case 'top':
                object.addTopEdgeDetour(array_of_points);
                break;
            case 'left':
                object.addLeftEdgeDetour(array_of_points);
                break;
            case 'right':
                object.addRightEdgeDetour(array_of_points);
                break;
        }

        if (typeof color === 'number') {
            const NUM_OF_POINTS = array_of_points.length;

            for (let i=0; i < NUM_OF_POINTS; i++) {
                const POINT = array_of_points[i];

                this.colorCoordinate(color, POINT.x, POINT.y, 5, 5);
            }
        }
    };

    addBottomEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(
            object,
            'bottom',
            array_of_points,
            color
        );
    };

    addTopEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(
            object,
            'top',
            array_of_points,
            color
        );
    };

    addLeftEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(
            object,
            'left',
            array_of_points,
            color
        );
    };

    addRightEdgeDetour(object, array_of_points, color) {
        this.__addDetour__(
            object,
            'right',
            array_of_points,
            color
        );
    };
};
