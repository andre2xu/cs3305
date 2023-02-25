import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    Decoration,
    SemiSolid
} from '../../sprites/objects.js';

export const LIBRARY = (function () {
    const LIBRARY = new PlayableArea(512, 256);

    const FLOOR = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/libraryfloor.png'), 0, 0, 512, 256);
    LIBRARY.addStaticSprite(
        FLOOR, 
        'libraryfloor', 
        0,
        0
    );



    const SECOND_FLOOR_MAT = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/mat2.png'), 0, 0, 32, 34);
    LIBRARY.addStaticSprite(
        SECOND_FLOOR_MAT,
        '2f_mat',
        LIBRARY.getWidth() - (SECOND_FLOOR_MAT.getSpriteFrameDimensions().w + 495),
        20
    );



    const BOOKSHELF_1 = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/bookshelf.png'), 0, 0, 95, 97);
    BOOKSHELF_1.modifyCollisionBoundary(
        null,
        BOOKSHELF_1.getSpriteFrameDimensions().h - 30, null,
        -20
    );
    LIBRARY.addStaticSprite(
        BOOKSHELF_1,
        'bookshelf1',
        LIBRARY.getWidth() - BOOKSHELF_1.getSpriteFrameDimensions().w,
        LIBRARY.getHeight() - (BOOKSHELF_1.getSpriteFrameDimensions().h + 35)
    );



    const BOOKSHELF_2 = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/bookshelf.png'), 0, 0, 95, 97);
    BOOKSHELF_2.modifyCollisionBoundary(
        null,
        BOOKSHELF_2.getSpriteFrameDimensions().h - 30, null,
        -20
    );
    LIBRARY.addStaticSprite(
        BOOKSHELF_2,
        'bookshelf2',
        LIBRARY.getWidth() - BOOKSHELF_2.getSpriteFrameDimensions().w,
        LIBRARY.getHeight() - (BOOKSHELF_2.getSpriteFrameDimensions().h + 150)
    );



    const CHAIR_A = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/chairA.png'), 0, 0, 75, 48);
    LIBRARY.addStaticSprite(
        CHAIR_A,
        'chairA',
        20,
        LIBRARY.getHeight() - (CHAIR_A.getSpriteFrameDimensions().h + 15)
    );



    const CHAIR_B = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/chairB.png'), 0, 0, 48, 75);
    CHAIR_B.modifyCollisionBoundary(
        null,
        40,
        null,
        null
    );
    LIBRARY.addStaticSprite(
        CHAIR_B,
        'chairB',
        130,
        LIBRARY.getHeight() - (CHAIR_B.getSpriteFrameDimensions().h + 75)
    );



    const MATBLUE = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/matblue.png'), 0, 0, 71, 54);
    LIBRARY.addStaticSprite(
        MATBLUE,
        'matblue',
        120,
        LIBRARY.getHeight() - (MATBLUE.getSpriteFrameDimensions().h + 12)
    );



    const TABLELAMP = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/tablelamp.png'), 0, 0, 95, 66);
    TABLELAMP.modifyCollisionBoundary(
        null,
        30,
        null,
        null
    );
    LIBRARY.addStaticSprite(
        TABLELAMP,
        'tablelamp',
        10,
        LIBRARY.getHeight() - (TABLELAMP.getSpriteFrameDimensions().h + 80)
    );



    const WINDOWS = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/window.png'), 0, 0, 525, 75);
    LIBRARY.addStaticSprite(
        WINDOWS,
        'window',
        -6,
        -(WINDOWS.getSpriteFrameDimensions().h - 5)
    );



    return LIBRARY; 
})();
