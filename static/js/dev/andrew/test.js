import { FOYER } from '../../map/foyer/foyer.js';
import { LIBRARY } from '../../map/library/library.js';
import { getTextureFromStaticAssetsFolder } from '../../helpers/pixi_helpers.js';
import { Inventory } from '../../core/inventory.js';
import { NON_PLAYER_ENTITIES } from '../../core/collision.js';

import {
    HealingItem,
    BandageBox
} from '../../sprites/consumables.js';

import {
    Gun,
    Pistol
} from '../../sprites/weapons.js';

import {
    Player,
    Zombie
} from '../../sprites/entities.js';

import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMovePlayer
} from '../../core/movement.js';

import {
    PLAYER_HEALTH_STATUS,
    AMMO_COUNT
} from '../../core/hud.js';

import player_frames_json from '../../../assets/sprite_sheets/player/player.json' assert {type: 'json'};

import zombie_frames_json from '../../../assets/sprite_sheets/enemies/clothed_zombie.json' assert {type: 'json'};



window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);



    // PLAYER
    const player = new Player(getTextureFromStaticAssetsFolder('/sprite_sheets/player/player.png'), 0, 0, player_frames_json.s.w, player_frames_json.s.h);
    player.addFrames(player_frames_json);
    player.switchFrame('n');

    window.HOTBAR = new Inventory(
        player,
        getTextureFromStaticAssetsFolder('/inventory/hotbar.png'),
        20,
        50,
        getTextureFromStaticAssetsFolder('/inventory/selector.png')
    );

    const HANDGUN = new Pistol(
        getTextureFromStaticAssetsFolder('/guns/handgun.png')
    );

    window.HOTBAR.addItem(HANDGUN);
    window.HOTBAR.addItem(new BandageBox());

    window.HOTBAR.changeSelItem(1);



    // ENEMY
    let zombie = new Zombie(getTextureFromStaticAssetsFolder('/sprite_sheets/enemies/clothed_zombie.png'), 0, 0, zombie_frames_json.s.w, zombie_frames_json.s.h);
    zombie.addFrames(zombie_frames_json);
    zombie.switchFrame('w');



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
        const KEY_PRESSED = event.key.toLowerCase();

        if (KEY_PRESSED === 'escape') {
            if (window.GAME_PAUSED === false) {
                window.GAME_PAUSED = true;
            }
            else if (window.GAME_PAUSED) {
                window.GAME_PAUSED = false;
            }
        }



        if (window.GAME_PAUSED === false) {
            const SELECTED_ITEM = window.HOTBAR.getSelItem();

            switch (KEY_PRESSED) {
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
                    window.HOTBAR.changeSelItem(1);
                    break;
                case '2':
                    window.HOTBAR.changeSelItem(2);
                    break;
                case '3':
                    window.HOTBAR.changeSelItem(3);
                    break;
                case '4':
                    window.HOTBAR.changeSelItem(4);
                    break;
                case '5':
                    window.HOTBAR.changeSelItem(5);
                    break;
                case '6':
                    window.HOTBAR.changeSelItem(6);
                    break;
                case '7':
                    window.HOTBAR.changeSelItem(7);
                    break;
                case '8':
                    window.HOTBAR.changeSelItem(8);
                    break;
                case 'r':
                    // manual reload
                    if (SELECTED_ITEM instanceof Gun && SELECTED_ITEM.getAmmoLoaded() !== SELECTED_ITEM.getClipCapacity() && SELECTED_ITEM.getAmmoLeft() > 0) {
                        SELECTED_ITEM.reload();
                    }

                    break;
                case ' ':
                    // spacebar
                    if (SELECTED_ITEM instanceof HealingItem && player.getHealth() < 100) {
                        SELECTED_ITEM.heal(player);

                        window.HOTBAR.removeSelItem();
                    }

                    break;
            }

            checkForCollisionsAndMovePlayer(player);

            // rotates enemies to player
            const NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NUM_OF_ENTITIES; i++) {
                    NON_PLAYER_ENTITIES[i].rotateToPlayer(player);
                }
            }
        }
    });

    window.addEventListener('mousemove', (event) => {
        window.mouseX = event.x;
        window.mouseY = event.y;

        if (window.GAME_PAUSED === false && MOVEMENT_KEY_STATUSES.w === false && MOVEMENT_KEY_STATUSES.a === false && MOVEMENT_KEY_STATUSES.s === false && MOVEMENT_KEY_STATUSES.d === false) {
            player.rotateToMouse();
        }
    });



    // INTERACTION
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });



    // MAPS
    FOYER.addDynamicSprite(player, 'player', 430, 15);
    FOYER.addDynamicSprite(zombie, 'zombie', 240, 150);

    FOYER.setPosition(
        GAME_VIEW.width * 0.5 - FOYER.getHalfWidth(),
        GAME_VIEW.height * 0.5 - FOYER.getHalfHeight()
    );



    LIBRARY.addDynamicSprite(player, 'player', 100, 20);
    LIBRARY.addDynamicSprite(zombie, 'zombie', 300, 50);

    LIBRARY.setPosition(
        GAME_VIEW.width * 0.5 - LIBRARY.getHalfWidth(),
        GAME_VIEW.height * 0.5 - LIBRARY.getHalfHeight()
    );



    GAME.stage.addChild(
        PLAYER_HEALTH_STATUS,
        AMMO_COUNT,
        window.HOTBAR.display(),
        // FOYER.load(),
        LIBRARY.load(),
    );

    GAME.ticker.add(() => {
        if (window.GAME_PAUSED === false) {
            // moves enemies
            const NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NUM_OF_ENTITIES; i++) {
                    NON_PLAYER_ENTITIES[i].moveToPlayer(player);
                }
            }
        }
    });
});
