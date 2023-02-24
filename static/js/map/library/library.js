
import { PlayableArea } from '../creation.js';
import { getTextureFromStaticJSFolder } from '../../helpers/pixi_helpers.js';

import {
    Decoration,
    DecorationFill,
    SemiSolid,
    SemiSolidFill
} from '../../sprites/objects.js';

export const LIBRARY = (function () {
    const LIBRARY = new PlayableArea(512, 256);

    const FLOOR = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/libraryfloor.png'), 0, 0, 512, 256);
    LIBRARY.addStaticSprite(
        FLOOR, 
        'libraryfloor', 
        0, 0);

    
    const SECOND_FLOOR_MAT = new Decoration(getTextureFromStaticJSFolder('/map/library/assets/mat2.png'), 0, 0, 32, 34);
    LIBRARY.addStaticSprite(
        SECOND_FLOOR_MAT,
        '2f_mat',
        LIBRARY.getWidth() - (SECOND_FLOOR_MAT.getSpriteFrameDimensions().w + 10),
        20
    );

    const BOOKSHELF = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/bookshelf.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        BOOKSHELF,
        'bookshelf',
        LIBRARY.getWidth() - (BOOKSHELF.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (BOOKSHELF.getSpriteFrameDimensions().h + 5)
    );
    
   
    const BOOKSHELF2 = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/bookshelf.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        BOOKSHELF2,
        'bookshelf2',
        LIBRARY.getWidth() - (BOOKSHELF2.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (BOOKSHELF2.getSpriteFrameDimensions().h + 5)
    );
    

    const CHAIRA = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/chairA.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        CHAIRA,
        'chairA',
        LIBRARY.getWidth() - (CHAIRA.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (CHAIRA.getSpriteFrameDimensions().h + 5)
    );
   
    const CHAIRB = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/chairB.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        CHAIRB,
        'chairB',
        LIBRARY.getWidth() - (CHAIRB.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (CHAIRB.getSpriteFrameDimensions().h + 5)
    );

    const MATBLUE = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/matblue.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        MATBLUE,
        'matblue',
        LIBRARY.getWidth() - (MATBLUE.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (MATBLUE.getSpriteFrameDimensions().h + 5)
    );

    const TABLELAMP = new SemiSolid(getTextureFromStaticJSFolder('/map/library/assets/tablelamp.png'), 0, 0, 59, 63);
    LIBRARY.addStaticSprite(
        TABLELAMP,
        'tablelamp',
        LIBRARY.getWidth() - (TABLELAMP.getSpriteFrameDimensions().w + 340),
        LIBRARY.getHeight() - (TABLELAMP.getSpriteFrameDimensions().h + 5)
    );
    




    return LIBRARY; 
})();
