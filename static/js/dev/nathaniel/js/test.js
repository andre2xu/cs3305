import { FOYER } from '../../../map/foyer/foyer.js';
import { getTextureFromStaticJSFolder } from '../../../helpers/pixi_helpers.js';
import { Inventory } from '../../../core/inventory.js';
// import { Pistol } from '../../../sprites/weapons.js';
import {WaveSystem} from "../../../core/WaveSystem.js";

import {
    Player,
    Zombie
} from '../../../sprites/entities.js';

import {
    Gun,
    Pistol
} from '../../../sprites/weapons.js';


import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMovePlayer
} from '../../../core/movement.js';

import {
    PLAYER_HEALTH_STATUS,
    updatePlayerHealthStatus,
    AMMO_COUNT
} from '../../../core/hud.js';

import player_frames_json from '../assets/sprite_sheets/player/player.json' assert {type: 'json'};

import zombie_frames_json from '../assets/sprite_sheets/enemies/clothed_zombie.json' assert {type: 'json'};
import {Wave} from "../../../core/Wave.js";
import {NON_PLAYER_ENTITIES} from "../../../core/collision.js";


//WAVE SYSTEM SETUP
var wave1 = new Wave(0,[1,2,3],1)
var wave2 = new Wave(1,[4,6,7],2)
var waves = [wave1,wave2]
var spawnPoint1 = [0,0,200,300]
var spawnPoint2 = [320,380,150,320]
var spawnPoints = [spawnPoint1,spawnPoint2]
var wavesys = new WaveSystem(FOYER,waves,spawnPoints,8)

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
        const player = new Player(getTextureFromStaticJSFolder('/../assets/sprite_sheets/player/player.png'), 0, 0, player_frames_json.s.w, player_frames_json.s.h);
        player.addFrames(player_frames_json);
        player.switchFrame('n');

        window.HOTBAR = new Inventory(
            player,
            getTextureFromStaticJSFolder('/../assets/inventory/hotbar.png'),
            20,
            50,
            getTextureFromStaticJSFolder('/../assets/inventory/selector.png')
        );

        const HANDGUN = new Pistol(
            getTextureFromStaticJSFolder('/../assets/guns/handgun.png')
        );

        window.HOTBAR.addItem(HANDGUN);
        window.HOTBAR.changeSelItem(1);



        // ENEMY
        const zombie = new Zombie(getTextureFromStaticJSFolder('/../assets/sprite_sheets/enemies/clothed_zombie.png'), 0, 0, zombie_frames_json.s.w, zombie_frames_json.s.h);
        const zombie2 = new Zombie(getTextureFromStaticJSFolder('/../assets/sprite_sheets/enemies/clothed_zombie.png'), 0, 0, zombie_frames_json.s.w, zombie_frames_json.s.h);
        zombie.addFrames(zombie_frames_json);
        zombie.switchFrame('n');
        zombie2.addFrames(zombie_frames_json);
        zombie2.switchFrame('n');


        FOYER.addDynamicSprite(player, 'player', 240, 230);
        // FOYER.addDynamicSprite(zombie, 'zombie', 240, 150);
        // FOYER.addDynamicSprite(zombie2, 'zombie2', 300, 150);

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
                    console.log(wavesys.zSpawned)
                    // window.HOTBAR.changeSelItem(6);
                    break;
                case '7':
                    window.HOTBAR.changeSelItem(7);
                    break;
                case '8':
                    // window.HOTBAR.changeSelItem(8);
                    wavesys.isBatchDone = true
                    break;
            }

            checkForCollisionsAndMovePlayer(player);

            //zombie.rotateToPlayer(player);

            const NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NUM_OF_ENTITIES; i++) {
                    NON_PLAYER_ENTITIES[i].rotateToPlayer(player);
                }
            }
        });

        window.addEventListener('mousemove', (event) => {
            window.mouseX = event.x;
            window.mouseY = event.y;

            if (MOVEMENT_KEY_STATUSES.w === false && MOVEMENT_KEY_STATUSES.a === false && MOVEMENT_KEY_STATUSES.s === false && MOVEMENT_KEY_STATUSES.d === false) {
                player.rotateToMouse();
            }
        });



        // INTERACTION
        window.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });



        GAME.stage.addChild(
            FOYER.load(),
            PLAYER_HEALTH_STATUS,
            AMMO_COUNT,
            window.HOTBAR.display()
        );

        GAME.ticker.add(() => {


            FOYER.sortSpriteOrder();
            wavesys.updateEnemyTracker()
            if (wavesys.checkIfBatchDone()){
                wavesys.spawnNextWave()
            }

            const NUM_OF_ENTITIES = NON_PLAYER_ENTITIES.length;

            if (NUM_OF_ENTITIES > 0) {
                for (let i=0; i < NUM_OF_ENTITIES; i++) {
                    NON_PLAYER_ENTITIES[i].moveToPlayer(player);
                }
            }

            //zombie.moveToPlayer(player);



            // HUD
            updatePlayerHealthStatus(player.getHealth());
        });



        // ensures the player is facing front and standing straight & the zombie is facing them
        window.mouseX = FOYER.getHalfWidth();
        window.mouseY = FOYER.getRightPosY();
        player.rotateToMouse();

        zombie.rotateToPlayer(player);
});
