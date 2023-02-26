import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    Decoration,
    SemiSolid
} from '../../sprites/objects.js';



export const BASEMENT = (function () {
    const BASEMENT = new PlayableArea(555, 441);

    const FLOOR = new Decoration(getTextureFromStaticJSFolder('/map/basement/assets/basefloor.png'), 0, 0, 555, 441);
    BASEMENT.addStaticSprite(
        FLOOR, 
        'floor', 
        0,
        0
    );



    const DOUBLE_DOOR = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/baseelevator.png'), 0, 0, 96, 48);
    // BASEMENT.addStaticSprite(
    //     DOUBLE_DOOR,
    //     'double_door',
    //     BASEMENT.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(),
    //     -(DOUBLE_DOOR.getSpriteFrameDimensions().h + 1)
    // );



    const COUCH = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/basecouch.png'), 0, 0, 143, 165);
    // BASEMENT.addStaticSprite(
    //     COUCH,
    //     'basecouch',
    //     BASEMENT.getHalfWidth() + COUCH.getHalfWidth(),
    //     BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 100)
    // );



    const FIREPLACE = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/fireplace.png'), 0, 0, 116, 94);
    // BASEMENT.addStaticSprite(
    //     FIREPLACE,
    //     'fireplace',
    //     BASEMENT.getHalfWidth() + COUCH.getHalfWidth(),
    //     BASEMENT.getHeight() - (COUCH.getSpriteFrameDimensions().h + 250)
    // );



    const BROKEN_CUPBOARD = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/brokencupboard.png'), 0, 0, 80, 108);
    // BASEMENT.addStaticSprite(
    //     BROKEN_CUPBOARD,
    //     'brokencupboard',
    //     BASEMENT.getWidth() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().w + 450),
    //     BASEMENT.getHeight() - (BROKEN_CUPBOARD.getSpriteFrameDimensions().h + 5)
    // );



    const STACKED_CUPBOARD = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/stackedcupboard.png'), 0, 0, 48, 107);
    // BASEMENT.addStaticSprite(
    //     STACKED_CUPBOARD,
    //     'stackedcupboard',
    //     BASEMENT.getWidth() - (STACKED_CUPBOARD.getSpriteFrameDimensions().w + 400),
    //     BASEMENT.getHeight() - (STACKED_CUPBOARD.getSpriteFrameDimensions().h + 5)
    // );



    const OPEN_CHEST = new SemiSolid(getTextureFromStaticJSFolder('/map/basement/assets/openchest.png'), 0, 0, 59, 63);
    // BASEMENT.addStaticSprite(
    //     OPEN_CHEST,
    //     'openchest',
    //     BASEMENT.getWidth() - (OPEN_CHEST.getSpriteFrameDimensions().w + 340),
    //     BASEMENT.getHeight() - (OPEN_CHEST.getSpriteFrameDimensions().h + 5)
    // );



    return BASEMENT;
})();