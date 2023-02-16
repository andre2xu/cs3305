import { FOYER } from '../../../map/foyer/foyer.js';
import { getTextureFromStaticJSFolder } from '../../../helpers/pixi_helpers.js';

import {
    Player,
    Zombie
} from '../../../sprites/entities.js';

import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMovePlayer
} from '../../../core/movement.js';

import player_frames_json from '../assets/sprite_sheets/player/player.json' assert {type: 'json'};

import zombie_frames_json from '../assets/sprite_sheets/enemies/clothed_zombie.json' assert {type: 'json'};



window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.id = 'test';
    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);

    document.getElementById('test').style.backgroundColor = 'red';



    // PLAYER
    const player = new Player(getTextureFromStaticJSFolder('/dev/andrew/assets/sprite_sheets/player/player.png'), 0, 0, player_frames_json.s.w, player_frames_json.s.h);
    player.addFrames(player_frames_json);
    player.switchFrame('s');

    let reset_to_idle_timer = null;

    player.addEvent('move', (event) => {
        clearTimeout(reset_to_idle_timer);

        reset_to_idle_timer = setTimeout(() => {
            player.rotateToMouse(); // resets player sprite to the idle frame
        }, 100);

        if (new Date().getMilliseconds() % 2 === 0) {
            if (event.currentFrame === 's' || event.currentFrame === 'sr') {
                player.switchFrame('sl');
            }
            else if (event.currentFrame === 'sl') {
                player.switchFrame('sr');
            }
            else if (event.currentFrame === 'e' || event.currentFrame === 'er') {
                player.switchFrame('el');
            }
            else if (event.currentFrame === 'w' || event.currentFrame === 'wr') {
                player.switchFrame('wl');
            }
            else if (event.currentFrame === 'wl') {
                player.switchFrame('wr');
            }
            else if (event.currentFrame === 'e' || event.currentFrame === 'er') {
                player.switchFrame('el');
            }
            else if (event.currentFrame === 'el') {
                player.switchFrame('er');
            }
            else if (event.currentFrame === 'n' || event.currentFrame === 'nr') {
                player.switchFrame('nl');
            }
            else if (event.currentFrame === 'nl') {
                player.switchFrame('nr');
            }
        }
    });



    // ENEMY
    const zombie = new Zombie(getTextureFromStaticJSFolder('/dev/andrew/assets/sprite_sheets/enemies/clothed_zombie.png'), 0, 0, zombie_frames_json.s.w, zombie_frames_json.s.h);
    zombie.setPosition(250, 300);
    zombie.addFrames(zombie_frames_json);
    zombie.switchFrame('n');



    FOYER.addDynamicSprite(player, 'player', 250, 10);
    FOYER.addDynamicSprite(zombie, 'zombie', 250, 160);

    FOYER.setPosition(
        GAME_VIEW.width * 0.5 - FOYER.getHalfWidth(),
        GAME_VIEW.height * 0.5 - FOYER.getHalfHeight()
    );



    // MOVEMENT
    window.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                MOVEMENT_KEY_STATUSES.w = false;
                break;
            case 's':
                MOVEMENT_KEY_STATUSES.s = false;
                break;
            case 'a':
                MOVEMENT_KEY_STATUSES.a = false;
                break;
            case 'd':
                MOVEMENT_KEY_STATUSES.d = false;
                break;
        }
    });

    window.addEventListener('keydown', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                MOVEMENT_KEY_STATUSES.w = true;
                break;
            case 's':
                MOVEMENT_KEY_STATUSES.s = true;
                break;
            case 'a':
                MOVEMENT_KEY_STATUSES.a = true;
                break;
            case 'd':
                MOVEMENT_KEY_STATUSES.d = true;
                break;
        }

        checkForCollisionsAndMovePlayer(player);

        zombie.rotateToPlayer(player);
    });

    window.addEventListener('mousemove', (event) => {
        window.mouseX = event.x;
        window.mouseY = event.y;

        if (MOVEMENT_KEY_STATUSES.w === false && MOVEMENT_KEY_STATUSES.a === false && MOVEMENT_KEY_STATUSES.s === false && MOVEMENT_KEY_STATUSES.d === false) {
            player.rotateToMouse();
        }
    });



    GAME.stage.addChild(
        FOYER.load()
    );

    GAME.ticker.add(() => {
        FOYER.sortSpriteOrder();



        // ZOMBIE MOVEMENT
        zombie.moveToPlayer(player);
    });



    // ensures the player is facing front and standing straight
    window.mouseX = FOYER.getHalfWidth();
    window.mouseY = FOYER.getRightPosY();
    player.rotateToMouse();
});
