import { BASEMENT } from './basement.js';

window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);


    // centers room
    BASEMENT.setPosition(
        GAME_VIEW.width * 0.5 - BASEMENT.getHalfWidth(),
        GAME_VIEW.height * 0.5 - BASEMENT.getHalfHeight()
    );


    GAME.stage.addChild(
        BASEMENT.load()
    );
});