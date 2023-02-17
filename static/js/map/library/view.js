import { LIBRARY } from './library.js';

window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);


    // centers room
    LIBRARY.setPosition(
        GAME_VIEW.width * 0.5 - LIBRARY.getHalfWidth(),
        GAME_VIEW.height * 0.5 - LIBRARY.getHalfHeight()
    );


    GAME.stage.addChild(
        LIBRARY.load()
    );
});