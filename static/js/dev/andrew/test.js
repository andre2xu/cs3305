import { FOYER } from '../../map/foyer/foyer.js';
import { LIBRARY } from '../../map/library/library.js';
import { BASEMENT } from '../../map/basement/basement.js';
import { getTextureFromStaticAssetsFolder } from '../../helpers/pixi_helpers.js';
import { Inventory } from '../../core/inventory.js';
import { NON_PLAYER_ENTITIES } from '../../core/collision.js';
import { PORTALS } from '../../sprites/portals.js';
import { WaveSystem } from '../../core/WaveSystem.js';
import { Wave } from '../../core/Wave.js';
import { Player } from '../../sprites/entities.js';

import {
    INTERACTABLES,
    AmmoCache, UpgradeBench
} from '../../sprites/interactable.js';

import {
    showPauseMenu,
    hidePauseMenu
} from '../../core/pause_menu.js';

import {
    HealingItem,
    BandageBox
} from '../../sprites/consumables.js';

import {
    Gun,
    Pistol
} from '../../sprites/weapons.js';

import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMovePlayer
} from '../../core/movement.js';

import {
    PLAYER_HEALTH_STATUS,
    AMMO_COUNT, updatePlayerPointsText, PLAYER_POINTS
} from '../../core/hud.js';

import {
    AMMO_CACHE_POPUP,
    managePopUp,
    PORTAL_POPUP,
    UPGRADE_BENCH_POPUP
} from "../../sprites/popups.js";

import player_frames_json from '../../../assets/sprite_sheets/player/player.json';




AMMO_CACHE_POPUP.anchor.set(0.5)
AMMO_CACHE_POPUP.x = window.innerWidth/2
AMMO_CACHE_POPUP.y = 20

PORTAL_POPUP.anchor.set(0.5)
PORTAL_POPUP.x = window.innerWidth/2
PORTAL_POPUP.y = 20

UPGRADE_BENCH_POPUP.anchor.set(0.5)
UPGRADE_BENCH_POPUP.x = window.innerWidth/2
UPGRADE_BENCH_POPUP.y = 20


window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);



    // INITIALIZING GLOBALS
    window.timeGameStarted = new Date();
    window.GAME_PAUSED = false;
    window.playableAreaExists = false;
    window.HOTBAR = undefined;



    // INITIALIZING WAVES
    const WAVE_SYSTEM = new WaveSystem(
        FOYER,
        [
            new Wave(0, [1], 0),
            // new Wave(0, [2, 3], 0)
        ],
        5
    );



    // PLAYER
    const player = new Player(getTextureFromStaticAssetsFolder('/sprite_sheets/player/player.png'), 0, 0, player_frames_json.s.w, player_frames_json.s.h);
    player.addFrames(player_frames_json);
    player.switchFrame('e');

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

    window.HOTBAR.changeSelItem(8);



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

        if (KEY_PRESSED === 'escape' && window.playableAreaExists === true) {
            if (window.GAME_PAUSED === false) {
                showPauseMenu();
            }
            else if (window.GAME_PAUSED) {
                hidePauseMenu();
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
                case 'q':
                    const NUM_OF_PORTALS = PORTALS.length;

                    if (NUM_OF_PORTALS > 0) {
                        for (let i=0; i < NUM_OF_PORTALS; i++) {
                            const PORTAL = PORTALS[i];

                            if (PORTAL.playerIsInsidePortal(player)) {
                                PORTAL.teleport(player);

                                WAVE_SYSTEM.updatePlayableArea(PORTAL.destination);

                                WAVE_SYSTEM.respawnBatch();
                                break;
                            }
                        }
                    }

                    break;
                case 't':


                    for (let i=0; i < INTERACTABLES.length; i++) {
                        const INTERACTABLE = INTERACTABLES[i];
                        if (INTERACTABLE.playerIsNearInteractable(player, UPGRADE_BENCH_POPUP)) {
                            if (INTERACTABLE instanceof UpgradeBench && player.currentPoints >= INTERACTABLE.pointCost && window.HOTBAR.getSelItem() instanceof Gun) {
                                player.currentPoints -= INTERACTABLE.pointCost
                                updatePlayerPointsText(player.currentPoints)
                                INTERACTABLE.upgradeGun(window.HOTBAR.getSelItem(), false)
                            }

                        }
                    }
                case 'e':
                    const NUM_OF_INTERACTABLES = INTERACTABLES.length;

                    for (let i=0; i < NUM_OF_INTERACTABLES; i++) {
                        const INTERACTABLE = INTERACTABLES[i];

                        if (INTERACTABLE.playerIsNearInteractable(player,AMMO_CACHE_POPUP)) {
                            if (INTERACTABLE instanceof AmmoCache && player.currentPoints >= INTERACTABLE.pointCost && window.HOTBAR.getSelItem() instanceof Gun) {
                                player.currentPoints -= INTERACTABLE.pointCost
                                updatePlayerPointsText(player.currentPoints)
                                INTERACTABLE.resupply(window.HOTBAR.getSelItem());
                            }

                        }

                        if (INTERACTABLE.playerIsNearInteractable(player,UPGRADE_BENCH_POPUP)) {
                            if (INTERACTABLE instanceof UpgradeBench && player.currentPoints >= INTERACTABLE.pointCost && window.HOTBAR.getSelItem() instanceof Gun) {
                                player.currentPoints -= INTERACTABLE.pointCost
                                updatePlayerPointsText(player.currentPoints)
                                INTERACTABLE.upgradeGun(window.HOTBAR.getSelItem(),true)
                            }

                        }


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
    FOYER.addDynamicSprite(player, 'player', 250, 150);

    FOYER.setPosition(
        GAME_VIEW.width * 0.5 - FOYER.getHalfWidth(),
        GAME_VIEW.height * 0.5 - FOYER.getHalfHeight()
    );
    FOYER.bindPlayableAreaToPortal('2f_mat', LIBRARY, 5, 15);
    FOYER.bindPlayableAreaToPortal('elevator', BASEMENT, BASEMENT.getHalfWidth() - 10, 0);



    LIBRARY.setPosition(
        GAME_VIEW.width * 0.5 - LIBRARY.getHalfWidth(),
        GAME_VIEW.height * 0.5 - LIBRARY.getHalfHeight()
    );
    LIBRARY.bindPlayableAreaToPortal('2f_mat', FOYER, 480, 12);



    BASEMENT.setPosition(
        GAME_VIEW.width * 0.5 - BASEMENT.getHalfWidth(),
        GAME_VIEW.height * 0.5 - BASEMENT.getHalfHeight()
    );
    BASEMENT.bindPlayableAreaToPortal('elevator', FOYER, 245, 0);



    GAME.stage.addChild(
        PLAYER_HEALTH_STATUS,
        AMMO_COUNT,
        PLAYER_POINTS,
        UPGRADE_BENCH_POPUP,
        AMMO_CACHE_POPUP,
        PORTAL_POPUP,
        window.HOTBAR.display(),
        FOYER.load(),
    );

    GAME.ticker.add(() => {
        if (window.GAME_PAUSED === false) {
            // WAVE_SYSTEM.playMusic();



            // spawns waves of enemies
            WAVE_SYSTEM.enemySpawnFadeIn();

            if (WAVE_SYSTEM.checkIfBatchDone()) {
                WAVE_SYSTEM.spawnNextBatch();

                WAVE_SYSTEM.moveToNextWaveIfFinished();
            }



            let isClose = false;

            // interactable popup ***still need to make popup for when ammo cache is empty
            const POPUPS = [AMMO_CACHE_POPUP,UPGRADE_BENCH_POPUP];
            var INTERACTABLE;

            for (let i = 0; i < INTERACTABLES.length; i++) {
                INTERACTABLE = INTERACTABLES[i];

                isClose = INTERACTABLE.playerIsNearInteractable(player);

                if (INTERACTABLE instanceof AmmoCache){
                    managePopUp(POPUPS[0], player, isClose)
                }
                else if (INTERACTABLE instanceof UpgradeBench){
                    managePopUp(POPUPS[1], player, isClose)
                }
            }



            // portal popup
            const NUM_OF_PORTALS = PORTALS.length;

            isClose = false;
            if (NUM_OF_PORTALS > 0) {
                for (let i = 0; i < NUM_OF_PORTALS; i++) {
                    const PORTAL = PORTALS[i];

                    isClose = isClose || PORTAL.playerIsInsidePortal(player); // if player is near ANY of the portals
                }
                managePopUp(PORTAL_POPUP, player, isClose);
            }



            // points
            let NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NON_PLAYER_ENTITIES.length; i++) {
                    if (NON_PLAYER_ENTITIES[i].removeSelf()){
                        player.currentPoints += 100
                        updatePlayerPointsText(player.currentPoints)

                    }
                }
            }



            // moves enemies
            NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NON_PLAYER_ENTITIES.length; i++) {
                    NON_PLAYER_ENTITIES[i].moveToPlayer(player);
                }
            }
        }
    });
});
