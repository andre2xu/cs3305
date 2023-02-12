import * as checks from '../js/checks.js';
import { OBSTACLES } from './collision.js';


// Layout of foyer (+-500px by +-300px)
// ---    ----------------------------    --
// | Door1/Picture | Passage |      Door1  |
// |                                       |
// | Railing/Stairs/Railing/Stairs/Railing |
// |         Stairs         Stairs         
// Door3     Stairs         STairs      Door3  
//                                         |
// | Plant1                        Plant1  |
// | Plant1      Mat               Plant1  |
// _____________ Door2 __ _________________


import {
    Obstacle,
    Decoration,
    SemiSolid,

} from './sprites.js';



window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);


    const floor = new Decoration(PIXI.Texture.from('assets/library/libraryfloor.png'), 0, 0, 512, 256);
    floor.setPosition(0, 50);

    const singleDoor = new SemiSolid(PIXI.Texture.from('assets/library/Door.png'), 0, 0, 42, );
    singleDoor.setPosition(0, 0);
    singleDoor.modifyCollisionBoundary(5, 5, 5, 5);

    const doubleWindow1 = new SemiSolid(PIXI.Texture.from('assets/library/window.png'), 0, 0, 105, 75);
    doubleWindow1.setPosition(95, 0);
    doubleWindow1.modifyCollisionBoundary(5, 5, 5, 5);

    const doubleWindow2 = new SemiSolid(PIXI.Texture.from('assets/library/window.png'), 0, 0, 105, 75);
    doubleWindow2.setPosition(200, 0);
    doubleWindow2.modifyCollisionBoundary(5, 5, 5, 5);

    const doubleWindow3 = new SemiSolid(PIXI.Texture.from('assets/library/window.png'), 0, 0, 105, 75);
    doubleWindow3.setPosition(305, 0);
    doubleWindow3.modifyCollisionBoundary(5, 5, 5, 5);

    const doubleWindow4 = new SemiSolid(PIXI.Texture.from('assets/library/window.png'), 0, 0, 105, 75);
    doubleWindow4.setPosition(410, 0);
    doubleWindow4.modifyCollisionBoundary(5, 5, 5, 5);

    const mat = new Decoration(PIXI.Texture.from('assets/library/matBlue.png'), 0, 0, 71, 54);
    mat.setPosition(105, 200);

    const bookshelf1 = new SemiSolid(PIXI.Texture.from('assets/library/bookshelf.png'), 0, 0, 95, 97);
    bookshelf1.setPosition(420, 75);
    bookshelf1.modifyCollisionBoundary(5, 5, 5, 5);

    const bookshelf2 = new SemiSolid(PIXI.Texture.from('assets/library/bookshelf.png'), 0, 0, 95, 97);
    bookshelf2.setPosition(420, 210);
    bookshelf2.modifyCollisionBoundary(5, 5, 5, 5);

    const bookshelf3 = new SemiSolid(PIXI.Texture.from('assets/library/bookshelf.png'), 0, 0, 95, 97);
    bookshelf3.setPosition(325, 75);
    bookshelf3.modifyCollisionBoundary(5, 5, 5, 5);

    const bookshelf4 = new SemiSolid(PIXI.Texture.from('assets/library/bookshelf.png'), 0, 0, 95, 97);
    bookshelf4.setPosition(325, 210);
    bookshelf4.modifyCollisionBoundary(5, 5, 5, 5);

    const tablelamp = new SemiSolid(PIXI.Texture.from('assets/library/tableLamp.png'), 0, 0, 95, 66);
    tablelamp.setPosition(0, 200);
    tablelamp.modifyCollisionBoundary(5, 5, 5, 5);

    const chair1 = new SemiSolid(PIXI.Texture.from('assets/library/chairA.png'), 0, 0, 95, 66);
    chair1.setPosition(115, 125);
    chair1.modifyCollisionBoundary(5, 5, 5, 5);
 
    const chair2 = new SemiSolid(PIXI.Texture.from('assets/library/chairB.png'), 0, 0, 95, 66);
    chair2.setPosition(180, 205);
    chair2.modifyCollisionBoundary(5, 5, 5, 5);
 



    GAME.stage.addChild(
        floor.load(),
        singleDoor.load(),
        doubleWindow1.load(),
        doubleWindow2.load(),
        doubleWindow3.load(),
        doubleWindow4.load(),
        mat.load(),
        bookshelf1.load(),
        bookshelf2.load(),
        bookshelf3.load(),
        bookshelf4.load(),
        tablelamp.load(),
        chair1.load(),
        chair2.load()

        
    );



});

