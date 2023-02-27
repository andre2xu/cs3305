import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';
import { PortalFill } from '../../sprites/portals.js';

import {
    Decoration,
    SemiSolid,
    SemiSolidFill
} from '../../sprites/objects.js';



export const BASEMENT = (function () {
    const BASEMENT = new PlayableArea(555, 441);
    BASEMENT.addEnemySpawnPoint(50, 50);
    BASEMENT.addEnemySpawnPoint(50, BASEMENT.getHeight() - 150);
    BASEMENT.addEnemySpawnPoint(280, BASEMENT.getHeight() - 30);

    const FLOOR = new Decoration(getTextureFromStaticJSFolder('/map/basement/assets/basefloor.png'), 0, 0, 555, 441);
    BASEMENT.addStaticSprite(
        FLOOR, 
        'floor', 
        0,
        0
    );



    const BARRIER_1 = new SemiSolidFill(0x000000, 0, 0, BASEMENT.getWidth(), 10);
    BARRIER_1.modifyCollisionBoundary(null, null, null, -BARRIER_1.getHalfHeight());
    BASEMENT.addStaticSprite(
        BARRIER_1,
        'barrier1',
        0,
        -BARRIER_1.getFillDimensions().h
    );



    const BARRIER_2 = new SemiSolidFill(0x000000, 0, 0, BASEMENT.getWidth(), 10);
    BASEMENT.addStaticSprite(
        BARRIER_2,
        'barrier2',
        0,
        BASEMENT.getHeight()
    );



    const BARRIER_3 = new SemiSolidFill(0x000000, 0, 0, 10, BASEMENT.getHeight());
    BARRIER_3.modifyCollisionBoundary(null, null, -3, null);
    BASEMENT.addStaticSprite(
        BARRIER_3,
        'barrier3',
        -BARRIER_3.getFillDimensions().w,
        0
    );



    const BARRIER_4 = new SemiSolidFill(0x000000, 0, 0, 10, BASEMENT.getHeight());
    BARRIER_4.modifyCollisionBoundary(-3, null, null, null);
    BASEMENT.addStaticSprite(
        BARRIER_4,
        'barrier4',
        BASEMENT.getWidth(),
        0
    );



    const DOUBLE_DOOR = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/baseelevator.png'), 0, 0, 96, 48);
    BASEMENT.addStaticSprite(
        DOUBLE_DOOR,
        'double_door',
        BASEMENT.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(),
        -(DOUBLE_DOOR.getSpriteFrameDimensions().h + 1)
    );



    const ELEVATOR = new PortalFill(BASEMENT, 0xff0000, 0, 0, DOUBLE_DOOR.getSpriteFrameDimensions().w, 35);
    ELEVATOR.setAlpha(0);
    BASEMENT.addStaticSprite(
        ELEVATOR,
        'elevator',
        DOUBLE_DOOR.getLeftPosX(),
        DOUBLE_DOOR.getRightPosY()
    );



    const COUCH = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/basecouch.png'), 0, 0, 143, 165);
    COUCH.modifyCollisionBoundary(null, 10, null, null);
    BASEMENT.addStaticSprite(
        COUCH,
        'basecouch',
        BASEMENT.getHalfWidth() + COUCH.getHalfWidth(),
        BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 90)
    );



    const FIREPLACE = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/fireplace.png'), 0, 0, 94, 116);
    FIREPLACE.modifyCollisionBoundary(null, 30, null, -10);
    BASEMENT.addStaticSprite(
        FIREPLACE,
        'fireplace',
        BASEMENT.getHalfWidth() + COUCH.getHalfWidth(),
        BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 250)
    );



    const BROKEN_CUPBOARD = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/brokencupboard.png'), 0, 0, 80, 108);
    BASEMENT.addStaticSprite(
        BROKEN_CUPBOARD,
        'brokencupboard',
        BASEMENT.getWidth() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().w + 450),
        BASEMENT.getHeight() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().h + 5)
    );



    const STACKED_CUPBOARD = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/stackedcupboard.png'), 0, 0, 48, 107);
    BASEMENT.addStaticSprite(
        STACKED_CUPBOARD,
        'stackedcupboard',
        BASEMENT.getWidth() - (STACKED_CUPBOARD.getSpriteFrameDimensions().w + 400),
        BASEMENT.getHeight() - (STACKED_CUPBOARD.getSpriteFrameDimensions().h + 5)
    );



    const OPEN_CHEST = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/openchest.png'), 0, 0, 59, 63);
    BASEMENT.addStaticSprite(
        OPEN_CHEST,
        'openchest',
        BASEMENT.getWidth() - (OPEN_CHEST.getSpriteFrameDimensions().w + 340),
        BASEMENT.getHeight() - (OPEN_CHEST.getSpriteFrameDimensions().h + 5)
    );



    return BASEMENT;
})();