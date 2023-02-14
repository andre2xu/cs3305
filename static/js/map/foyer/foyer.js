import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    Decoration,
    DecorationFill,
    SemiSolid,
    SemiSolidFill
} from '../../sprites/objects.js';



export const FOYER = (function () {
    const FOYER = new PlayableArea(512, 400);

    const FLOOR = new DecorationFill(0xf8dcd4, 0, 0, 512, 400);
    FOYER.addStaticSprite(FLOOR, 'floor', 0, 0);



    const DOUBLE_DOOR = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/Door1.png'), 0, 0, 96, 48);
    FOYER.addStaticSprite(
        DOUBLE_DOOR,
        'double_door',
        FOYER.getHalfWidth() - DOUBLE_DOOR.getHalfWidth(),
        -(DOUBLE_DOOR.getSpriteFrameDimensions().h + 1)
    );



    const WINDOW = new Decoration(getTextureFromStaticJSFolder('/map/foyer/assets/window.png'), 0, 0, 105, 75);
    FOYER.addStaticSprite(
        WINDOW,
        'window',
        50,
        -(WINDOW.getSpriteFrameDimensions().h - 5)
    );



    const SECOND_FLOOR_MAT = new Decoration(getTextureFromStaticJSFolder('/map/foyer/assets/mat2.png'), 0, 0, 32, 34);
    FOYER.addStaticSprite(
        SECOND_FLOOR_MAT,
        '2f_mat',
        FOYER.getWidth() - (SECOND_FLOOR_MAT.getSpriteFrameDimensions().w - 10),
        20
    );



    const WALL = new SemiSolidFill(0xD0EAF5, 0, 0, 278, 60);
    WALL.modifyCollisionBoundary(null, -5, null, -20);
    FOYER.addStaticSprite(WALL, 'wall', 117, 80);



    const STAIRS_1 = new Decoration(getTextureFromStaticJSFolder('/map/foyer/assets/stairs.png'), 0, 0, 117, 95);
    FOYER.addStaticSprite(
        STAIRS_1,
        'stairs1',
        0,
        WALL.getLeftPosY()
    );



    const STAIRS_2 = new Decoration(getTextureFromStaticJSFolder('/map/foyer/assets/stairs.png'), 0, 0, 117, 95);
    FOYER.addStaticSprite(
        STAIRS_2,
        'stairs2',
        FOYER.getWidth() - STAIRS_2.getSpriteFrameDimensions().w,
        STAIRS_1.getLeftPosY()
    );



    const RAILING_1 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_1,
        'railing1',
        STAIRS_1.getRightPosX() + 4,
        WALL.getLeftPosY() - (RAILING_1.getSpriteFrameDimensions().h - 5)
    );



    const RAILING_2 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_2,
        'railing2',
        RAILING_1.getRightPosX(),
        RAILING_1.getLeftPosY()
    );



    const RAILING_3 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_3,
        'railing3',
        RAILING_2.getRightPosX(),
        RAILING_2.getLeftPosY()
    );



    const RAILING_4 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_4,
        'railing4',
        RAILING_3.getRightPosX(),
        RAILING_3.getLeftPosY()
    );



    const RAILING_5 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_5,
        'railing5',
        RAILING_4.getRightPosX(),
        RAILING_4.getLeftPosY()
    );



    const RAILING_6 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_6,
        'railing6',
        RAILING_5.getRightPosX(),
        RAILING_5.getLeftPosY()
    );



    const RAILING_7 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_7,
        'railing7',
        RAILING_6.getRightPosX(),
        RAILING_6.getLeftPosY()
    );



    const RAILING_8 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_8,
        'railing8',
        RAILING_7.getRightPosX(),
        RAILING_7.getLeftPosY()
    );



    const RAILING_9 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_9,
        'railing9',
        RAILING_8.getRightPosX(),
        RAILING_8.getLeftPosY()
    );



    const RAILING_10 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/railing.png'), 0, 0, 27, 18);
    FOYER.addStaticSprite(
        RAILING_10,
        'railing10',
        RAILING_9.getRightPosX(),
        RAILING_9.getLeftPosY()
    );



    const FIRST_FLOOR_MAT = new Decoration(getTextureFromStaticJSFolder('/map/foyer/assets/mat.png'), 0, 0, 48, 96);
    FOYER.addStaticSprite(
        FIRST_FLOOR_MAT,
        '1f_mat',
        FOYER.getHalfWidth() - (FIRST_FLOOR_MAT.getSpriteFrameDimensions().w - 6),
        FOYER.getHeight() - (FIRST_FLOOR_MAT.getSpriteFrameDimensions().h + 15)
    );



    const PLANT_1 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/plantA.png'), 0, 0, 48, 96);
    PLANT_1.modifyCollisionBoundary(null, 50, null, null);
    FOYER.addDynamicSprite(
        PLANT_1,
        'plant1',
        0,
        FOYER.getHeight() - (PLANT_1.getSpriteFrameDimensions().h + 5)
    );



    const PLANT_2 = new SemiSolid(getTextureFromStaticJSFolder('/map/foyer/assets/plantA.png'), 0, 0, 48, 96);
    PLANT_2.modifyCollisionBoundary(null, 50, null, null);
    FOYER.addDynamicSprite(
        PLANT_2,
        'plant2',
        FOYER.getWidth() - PLANT_2.getSpriteFrameDimensions().w,
        FOYER.getHeight() - (PLANT_2.getSpriteFrameDimensions().h + 5)
    );



    return FOYER;
})();
