import * as checks from '../helpers/checks.js';
import { PlayableArea } from '../map/creation.js';
import { Wave } from './Wave.js';

import zombie_frames_json from "../../assets/sprite_sheets/enemies/clothed_zombie.json" assert {type: 'json'};



// check the wavesys init and the game ticker in my test.js file for more info
export class WaveSystem {
    constructor(map, waves, spawnPoints, batchDelay) {
        checks.checkIfInstance(map, PlayableArea);
        checks.checkIfArray(waves);
        waves.every((element) => {
            return element instanceof Wave;
        });
        checks.checkIfNumber(batchDelay);

        this.map = map;

        this.waves = waves; 
        this.currentWave = 0;
        this.wave = waves[0];

        this.spawnPoints = spawnPoints; // 2d array containing delimiters for each spawnpoint, each 1d array in the 2d array is a square determining, and each element is a spawn point is, in order, y min delimiter,y max delimiter, x min delimiter, x max delimiter

        this.enemyID = 1; // used to generate unique ID for each zombie

        this.isBatchDone = false;

        this.time = 0;

        this.batchDelay = batchDelay; // time between spawning batches

        this.zSpawned = []; // used to check if spawned zombies

        this.spawnedThisBatch = []; // used to apply fade-in effect.
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
        if (Math.floor(Date.now() / 1000) - this.time >= this.batchDelay) {
            // only allows next batch to spawn if batchDelay has passed
            this.isBatchDone = true;
        }
        else {
            this.isBatchDone = false;
        }

        return this.isBatchDone;
    };



    // SETTERS
    spawnNextWave() {
        let toSpawn = this.wave.getNextBatch();

        this.spawnedThisBatch = [];

        if (toSpawn == 0 && this.zSpawned.length == 0) {
            // only do if all zombies from previous wave are dead
            this.currentWave++;

            this.wave = this.waves[this.currentWave]; // get next wave

            toSpawn = this.wave.getNextBatch();
        }

        let id = "zombie";

        this.isBatchDone = false;

        for (let i = 0; i < toSpawn.length; i++) {
            let randSpawnP = this.getRandomInt(0, this.spawnPoints.length - 1); // selects one of the spawn points randomly

            toSpawn[i].addFrames(zombie_frames_json);
            toSpawn[i].switchFrame('n');

            let y = this.getRandomInt(
                this.spawnPoints[randSpawnP][0], // min y
                this.spawnPoints[randSpawnP][1] // max y
            );

            let x = this.getRandomInt(
                this.spawnPoints[randSpawnP][2], // min x
                this.spawnPoints[randSpawnP][3] // max x
            );

            eval("id=id + this.enemyID.toString()"); //generating unique id

            toSpawn[i].sprite.alpha = 0; // prepares for fade-in animation
            this.map.addDynamicSprite(toSpawn[i], id, x, y);

            this.zSpawned.push(toSpawn[i]);
            this.spawnedThisBatch.push(toSpawn[i]);

            this.enemyID++;

            this.time = Math.floor(Date.now() / 1000); // gets time zombies spawned
        }
    };

    enemySpawnFadeIn() {
        for (let i = 0; i < this.spawnedThisBatch.length; i++) {
            // console.log(this.spawnedThisBatch)

            this.spawnedThisBatch[i].sprite.alpha += 0.01;
        }
    };

    updateEnemyTracker() {
        // keeps track of what zombies are alive
        for (let i = 0; i < this.zSpawned.length; i++) {
            if (this.zSpawned[i].isDead) {
                this.zSpawned.splice(i, 1);
            }
        }

        this.enemySpawnFadeIn(); // fade in animation
    };
};