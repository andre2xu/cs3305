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




    //Make entire floor a container and work with everying inside the container. 
    const floor = new Decoration(PIXI.Texture.from('assets/foyer/floor.png'), 0, 0, 512, 256);
    floor.setPosition(0, 48);

    //can't use the word window alone - it is a reserved word for the program
    const doubleWindow = new SemiSolid(PIXI.Texture.from('assets/foyer/window.png'), 0, 0, 105, 75);
    doubleWindow.setPosition(0, 0);
    doubleWindow.modifyCollisionBoundary(5, 5, 5, 5);
 
    const doubleDoor = new SemiSolid(PIXI.Texture.from('assets/foyer/Door1.png'), 0, 0, 96, 48);
    doubleDoor.setPosition(206, 0);
    doubleDoor.modifyCollisionBoundary(5, 5, 5, 5);

    const singleDoor = new SemiSolid(PIXI.Texture.from('assets/foyer/Door.png'), 0, 0, 48, 96);
    singleDoor.setPosition(470, 0);
    singleDoor.modifyCollisionBoundary(5, 5, 5, 5);

    const stairs1 = new SemiSolid(PIXI.Texture.from('assets/foyer/stairs.png'), 0, 0, 117, 95);
    stairs1.setPosition(80, 100);
    stairs1.modifyCollisionBoundary(5, 5, 5, 5);
    
    const stairs2 = new SemiSolid(PIXI.Texture.from('assets/foyer/stairs.png'), 0, 0, 117, 95);
    stairs2.setPosition(315, 100);
    stairs2.modifyCollisionBoundary(5, 5, 5, 5);

    const mat = new Decoration(PIXI.Texture.from('assets/foyer/mat.png'), 0, 0, 48, 96);
    mat.setPosition(232, 210);

    const railing1 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing1.setPosition(0, 110);
    railing1.modifyCollisionBoundary(5, 5, 5, 5);

    const railing2 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing2.setPosition(40, 110);
    railing2.modifyCollisionBoundary(5, 5, 5, 5);

    const railing3 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing3.setPosition(195, 110);
    railing3.modifyCollisionBoundary(5, 5, 5, 5);

    const railing4 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing4.setPosition(235, 110);
    railing4.modifyCollisionBoundary(5, 5, 5, 5);

    const railing5 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing5.setPosition(275, 110);
    railing5.modifyCollisionBoundary(5, 5, 5, 5);

    const railing6 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing6.setPosition(430, 110);
    railing6.modifyCollisionBoundary(5, 5, 5, 5);

    const railing7 = new SemiSolid(PIXI.Texture.from('assets/foyer/railing2.png'), 0, 0, 96, 48);
    railing7.setPosition(470, 110);
    railing7.modifyCollisionBoundary(5, 5, 5, 5);

    const plant1 = new SemiSolid(PIXI.Texture.from('assets/foyer/plantA.png'), 0, 0, 48, 96);
    plant1.setPosition(20, 120);
    plant1.modifyCollisionBoundary(5, 5, 5, 5);

    const plant2 = new SemiSolid(PIXI.Texture.from('assets/foyer/plantA.png'), 0, 0, 48, 96);
    plant2.setPosition(450, 120);
    plant2.modifyCollisionBoundary(5, 5, 5, 5);



    GAME.stage.addChild(
        floor.load(),
        doubleWindow.load(),
        doubleDoor.load(),
        singleDoor.load(),
        stairs1.load(),
        stairs2.load(),
        mat.load(),
        railing1.load(),
        railing2.load(),
        railing3.load(),
        railing4.load(),
        railing5.load(),
        railing6.load(),
        railing7.load(),
        plant1.load(),
        plant2.load()
        //window.load()
    );



});

