import { FOYER } from '../../../map/foyer/foyer.js';
import { getTextureFromStaticJSFolder } from '../../../helpers/pixi_helpers.js';
import { Inventory } from '../../../core/inventory.js';
import { Pistol } from '../../../core/items.js';

import {
    Player,
    Zombie
} from '../../../sprites/entities.js';

import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMovePlayer
} from '../../../core/movement.js';

import {
    PLAYER_HEALTH_STATUS,
    updatePlayerHealthStatus
} from '../../../core/hud.js';

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

    const HOTBAR = new Inventory(
        player,
        getTextureFromStaticJSFolder('/dev/andrew/assets/hotbar.png'),
        20,
        50,
        getTextureFromStaticJSFolder('/dev/andrew/assets/selector.png')
    );

    const HANDGUN = new Pistol(
        getTextureFromStaticJSFolder('/dev/andrew/assets/handgun.png')
    );

    HOTBAR.addItem(HANDGUN);
    HOTBAR.changeSelItem(1);



    // ENEMY
    const zombie = new Zombie(getTextureFromStaticJSFolder('/dev/andrew/assets/sprite_sheets/enemies/clothed_zombie.png'), 0, 0, zombie_frames_json.s.w, zombie_frames_json.s.h);
    zombie.addFrames(zombie_frames_json);
    zombie.switchFrame('n');



    FOYER.addDynamicSprite(player, 'player', 240, 230);
    FOYER.addDynamicSprite(zombie, 'zombie', 240, 150);

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
            case '1':
                HOTBAR.changeSelItem(1);
                break;
            case '2':
                HOTBAR.changeSelItem(2);
                break;
            case '3':
                HOTBAR.changeSelItem(3);
                break;
            case '4':
                HOTBAR.changeSelItem(4);
                break;
            case '5':
                HOTBAR.changeSelItem(5);
                break;
            case '6':
                HOTBAR.changeSelItem(6);
                break;
            case '7':
                HOTBAR.changeSelItem(7);
                break;
            case '8':
                HOTBAR.changeSelItem(8);
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
        FOYER.load(),
        PLAYER_HEALTH_STATUS,
        HOTBAR.display()
    );

    GAME.ticker.add(() => {
        FOYER.sortSpriteOrder();

        // zombie.moveToPlayer(player);



        // HUD
        updatePlayerHealthStatus(player.getHealth());
    });



    // ensures the player is facing front and standing straight & the zombie is facing them
    window.mouseX = FOYER.getHalfWidth();
    window.mouseY = FOYER.getRightPosY();
    player.rotateToMouse();

    zombie.rotateToPlayer(player);
});
