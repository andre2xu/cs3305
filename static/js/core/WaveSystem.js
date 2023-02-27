import * as checks from '../helpers/checks.js';
import { PlayableArea } from '../map/creation.js';
import { Wave } from './Wave.js';
import { NON_PLAYER_ENTITIES } from './collision.js';

import zombie_frames_json from "../../assets/sprite_sheets/enemies/clothed_zombie.json" assert {type: 'json'};



export class WaveSystem {
    constructor(starting_map, waves, batch_delay) {
        checks.checkIfInstance(starting_map, PlayableArea);

        checks.checkIfArray(waves);
        if (waves.length === 0) {
            throw Error("Waves cannot be empty.");
        }
        waves.every((wave) => {
            if (wave instanceof Wave === false) {
                throw TypeError("All waves must be an instance of the Wave class.");
            }
        });

        checks.checkIfNumber(batch_delay);



        this.map = starting_map;
        this.spawnPoints = starting_map.getEnemySpawnPoints(); // array containing {x: ?, y: ?}

        this.current_wave_index = 0;
        this.waves = waves;
        this.current_wave = this.waves[0];

        this.next_wave_timeout = null;
        this.next_wave_delay = 3000;

        this.batch_delay = batch_delay;
        this.isBatchDone = false;

        // this.enemyID = 1; // used to generate unique ID for each zombie

        this.time = 0;

        // this.zSpawned = []; // used to check if spawned zombies
        // this.spawnedThisBatch = []; // used to apply fade-in effect.
    };



    // GETTERS
    getRandomInt(min, max) {
        // TODO: move this somewhere else lol.

        checks.checkIfNumber(min);
        checks.checkIfNumber(max);

        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    checkIfBatchDone() {
        if (Math.floor(Date.now() / 1000) - this.time >= this.batch_delay) {
            // only allows next batch to spawn if batch_delay has passed
            this.isBatchDone = true;
        }
        else {
            this.isBatchDone = false;
        }

        return this.isBatchDone;
    };



    // SETTERS
    setWaveDelay(delay) {
        checks.checkIfNumber(delay);

        this.next_wave_delay = delay;
    };

    updatePlayableArea(playableArea) {
        checks.checkIfInstance(playableArea, PlayableArea);

        this.map = playableArea;
        this.spawnPoints = playableArea.getEnemySpawnPoints();
    };

    moveToNextWaveIfFinished() {
        if (this.next_wave_timeout === null && NON_PLAYER_ENTITIES.length === 0 && this.current_wave_index + 1 < this.waves.length) {
            this.next_wave_timeout = setTimeout(() => {
                this.current_wave_index++;

                this.current_wave = this.waves[this.current_wave_index];

                this.next_wave_timeout = null;
            }, this.next_wave_delay);
        }
    };

    spawnNextBatch() {
        let toSpawn = this.current_wave.getNextBatch();

        /*
        this.spawnedThisBatch = [];

        if (toSpawn === 0 && this.spawnedThisBatch.length === 0) {
            // only do if all zombies from previous wave are dead

            this.current_wave_index++;

            this.current_wave = this.waves[this.current_wave_index]; // get next wave

            toSpawn = this.current_wave.getNextBatch();
        }
        */

        for (let i=0; i < toSpawn.length; i++) {
            const ENEMY = toSpawn[i];
            const ENEMY_DIMENSIONS = ENEMY.getSpriteFrameDimensions();
            ENEMY.addFrames(zombie_frames_json);
            ENEMY.switchFrame('n');

            /*
            let randSpawnP = this.getRandomInt(0, this.spawnPoints.length - 1); // selects one of the spawn points randomly

            let y = this.getRandomInt(
                this.spawnPoints[randSpawnP][0], // min y
                this.spawnPoints[randSpawnP][1] // max y
            );

            let x = this.getRandomInt(
                this.spawnPoints[randSpawnP][2], // min x
                this.spawnPoints[randSpawnP][3] // max x
            );
            */

            const SPAWN_LOCATION = this.spawnPoints[this.getRandomInt(0, this.spawnPoints.length - 1)];

            // let id = "zombie";
            // eval("id=id + this.enemyID.toString()"); //generating unique id

            this.map.addDynamicSprite(
                ENEMY,
                Date.now().toString(),
                SPAWN_LOCATION.x - ENEMY_DIMENSIONS.w,
                SPAWN_LOCATION.y - ENEMY_DIMENSIONS.h
            );

            ENEMY.sprite.alpha = 0; // prepares for fade-in animation

            // this.zSpawned.push(ENEMY);
            // this.spawnedThisBatch.push(ENEMY);

            // this.enemyID++;

            this.time = Math.floor(Date.now() / 1000); // gets time zombies spawned
        }
    };

    respawnBatch() {
        const NUM_OF_ENEMIES_LEFT = NON_PLAYER_ENTITIES.length;

        if (NUM_OF_ENEMIES_LEFT > 0) {
            for (let i=0; i < NUM_OF_ENEMIES_LEFT; i++) {
                const ENEMY = NON_PLAYER_ENTITIES[i];
                const ENEMY_DIMENSIONS = ENEMY.getSpriteFrameDimensions();

                const SPAWN_LOCATION = this.spawnPoints[this.getRandomInt(0, this.spawnPoints.length - 1)];

                this.map.addDynamicSprite(
                    ENEMY,
                    `zombie${i}`,
                    SPAWN_LOCATION.x - ENEMY_DIMENSIONS.w,
                    SPAWN_LOCATION.y - ENEMY_DIMENSIONS.h
                );

                ENEMY.sprite.alpha = 0; // prepares for fade-in animation

                this.time = Math.floor(Date.now() / 1000); // gets time zombies spawned
            }
        }
    };

    enemySpawnFadeIn() {
        const NUM_OF_NPE = NON_PLAYER_ENTITIES.length;

        if (NUM_OF_NPE > 0) {
            for (let i=0; i < NUM_OF_NPE; i++) {
                const ENEMY = NON_PLAYER_ENTITIES[i].sprite;

                if (ENEMY.alpha < 1) {
                    ENEMY.alpha += 0.01;
                }
            }
        }
    };

    /*
    updateEnemyTracker() {
        keeps track of what zombies are alive
        for (let i = 0; i < this.zSpawned.length; i++) {
            if (this.zSpawned[i].isDead) {
                this.zSpawned.splice(i, 1);
            }
        }

        this.enemySpawnFadeIn(); // fade in animation
    };
    */
};