import * as checks from '../helpers/checks.js';
import { OBSTACLES } from '../core/collision.js';

import {
    PORTALS,
    Portal,
    PortalFill
} from '../sprites/portals.js';

import {
    toggleCrosshair,
    Gun
} from '../sprites/weapons.js';

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

        this.OBSTACLES = [];
        this.PORTALS = [];
        this.ENEMY_SPAWN_POINTS = [];



        this.area.interactive = true;

        this.mousedownEvent = function () {
            if (window.GAME_PAUSED === false && window.HOTBAR !== undefined && window.HOTBAR !== null) {
                const SELECTED_ITEM = window.HOTBAR.getSelItem();

                if (SELECTED_ITEM instanceof Gun) {
                    SELECTED_ITEM.fire();
                }
            }
        };

        this.mousemoveEvent = function () {
            toggleCrosshair(this);
        };



        this.infinite_loop = new PIXI.Ticker();

        this.infinite_loop.add(() => {
            this.sortSpriteOrder();
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
        window.GAME_PAUSED = false;

        // renders sprites
        this.area.addChild(
            this.STATIC_SPRITES_CONTAINER,
            this.DYNAMIC_SPRITES_CONTAINER
        );

        // adds obstacles to collision detection queue
        const NUM_OF_OBSTACLES = this.OBSTACLES.length;

        for (let i=0; i < NUM_OF_OBSTACLES; i++) {
            OBSTACLES.push(this.OBSTACLES[i]);
        }

        // adds portals to map switch detection queue
        const NUM_OF_PORTALS = this.PORTALS.length;

        for (let i=0; i < NUM_OF_PORTALS; i++) {
            PORTALS.push(this.PORTALS[i]);
        }

        // runs local game loop
        this.infinite_loop.start();

        // binds events to playable area
        this.area.on('mousedown', this.mousedownEvent);
        this.area.on('mousemove', this.mousemoveEvent);



        window.playableAreaExists = true;

        return this.area;
    };

    unload() {
        window.GAME_PAUSED = true;

        // un-renders sprites
        this.area.removeChild(this.STATIC_SPRITES_CONTAINER);

        this.area.removeChild(this.DYNAMIC_SPRITES_CONTAINER);



        // removes the player from sorting queue
        if (this.dynamicSprites['player'] !== undefined) {
            this.DYNAMIC_SPRITES_CONTAINER.removeChild(this.dynamicSprites['player']);

            delete this.dynamicSprites['player'];
        }



        // removes obstacles from collision detection queue
        OBSTACLES.splice(0, OBSTACLES.length);



        // removes portals from map switch detection queue
        PORTALS.splice(0, PORTALS.length);



        // stops local game loop
        this.infinite_loop.stop();



        // un-binds events to playable area
        this.area.off('mousedown', this.mousedownEvent);
        this.area.off('mousemove', this.mousemoveEvent);



        // un-renders the playable area from the screen
        this.area.parent.removeChild(this.area);

        window.playableAreaExists = false;
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

        if (sprite instanceof Obstacle || sprite instanceof ObstacleFill) {
            this.OBSTACLES.push(sprite);
        }
        else if (sprite instanceof Portal || sprite instanceof PortalFill) {
            this.PORTALS.push(sprite);
        }

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

        if (sprite instanceof Obstacle || sprite instanceof ObstacleFill) {
            this.OBSTACLES.push(sprite);
        }

        sprite.setPosition(x, y);
    };

    addEnemySpawnPoint(x, y, color) {
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.ENEMY_SPAWN_POINTS.push({x: x, y: y});

        if (typeof color === 'number') {
            this.colorCoordinate(color, x, y, 5, 5);
        }
    };

    sortSpriteOrder() {
        // SPRITE ORDERING
        const ALL_SPRITES = Object.values(this.dynamicSprites);
        let num_of_sprites = ALL_SPRITES.length;

        if (num_of_sprites > 0) {
            // REMOVES SPRITES WITH NO PARENT
            for (let i=0; i < num_of_sprites; i++) {
                const SPRITE = ALL_SPRITES[i].getSprite();

                if (SPRITE.parent === null) {
                    ALL_SPRITES.splice(i, 1);
                    num_of_sprites = ALL_SPRITES.length;

                    delete this.dynamicSprites[Object.keys(this.dynamicSprites)[i]];
                }
            }



            // REORDERS SPRITE
            let posY_of_sprites = [];

            // gets the y coordinate of the bottom edge of every sprite
            for (let i=0; i < num_of_sprites; i++) {
                const CURRENT_SPRITE = ALL_SPRITES[i];

                posY_of_sprites.push(CURRENT_SPRITE.getRightPosY());
            }

            // sorts the y coordinates in ascending order
            posY_of_sprites = posY_of_sprites.sort();

            for (let i=0; i < num_of_sprites; i++) {
                const CURRENT_POSY = posY_of_sprites[i];

                for (let j=0; j < num_of_sprites; j++) {
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

    bindPlayableAreaToPortal(sprite_id, playableArea, dest_x, dest_y) {
        checks.checkIfString(sprite_id);

        const PORTAL = this.staticSprites[sprite_id];

        if (PORTAL === undefined) {
            throw Error("A portal with that ID does not exist.");
        }

        PORTAL.setDestination(playableArea, dest_x, dest_y);
    };
};
