import {
    Decoration,
    SemiSolid
} from '../../sprites.js';



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



window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';
    document.body.appendChild(GAME_VIEW);



    const baseFloor = new Decoration(PIXI.Texture.from('assets/basement/basefloor.png'), 0, 0, 555, 441);
    baseFloor.setPosition(32, 48);
    
    const baseElevator = new SemiSolid(PIXI.Texture.from('assets/basement/baseelevator.png'), 0, 0, 96, 48);
    baseElevator.setPosition(206, 0);
    baseElevator.modifyCollisionBoundary(5, 5, 5, 5);

    const baseCouch = new SemiSolid(PIXI.Texture.from('assets/basement/basecouch.png'), 0, 0, 143, 165);
    baseCouch.setPosition(380, 220);
    baseCouch.modifyCollisionBoundary(5, 5, 5, 5); 

    const fireplace = new SemiSolid(PIXI.Texture.from('assets/basement/fireplace.png'), 0, 0, 116, 94);
    fireplace.setPosition(400, 50);
    fireplace.modifyCollisionBoundary(5, 5, 5, 5); 

    const brokenCupboard = new SemiSolid(PIXI.Texture.from('assets/basement/brokencupboard.png'), 0, 0, 80, 108);
    brokenCupboard.setPosition(30, 380);
    brokenCupboard.modifyCollisionBoundary(5, 5, 5, 5); 

    const stackedCupboard = new SemiSolid(PIXI.Texture.from('assets/basement/stackedcupboard.png'), 0, 0, 48, 107);
    stackedCupboard.setPosition(110, 380);
    stackedCupboard.modifyCollisionBoundary(5, 5, 5, 5); 

    const openChest = new SemiSolid(PIXI.Texture.from('assets/basement/openchest.png'), 0, 0, 59, 63);
    openChest.setPosition(160, 425);
    openChest.modifyCollisionBoundary(5, 5, 5, 5); 



    GAME.stage.addChild(
        baseFloor.load(),
        baseElevator.load(),
        baseCouch.load(),
        fireplace.load(),
        brokenCupboard.load(),
        stackedCupboard.load(),
        openChest.load()
        
    );
});

