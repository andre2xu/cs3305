import { Zombie } from "../sprites/entities.js";
import { getTextureFromStaticJSFolder } from '../helpers/pixi_helpers.js';

import zombie_frames_json from '../dev/nathaniel/assets/sprite_sheets/enemies/clothed_zombie.json' assert {type: 'json'};



export class Wave {
    constructor(id, batches, difficultyMod) {
        this.id = id; //unused as of now, might be useful later
        this.batches = batches; //an array containing the number of zombies to spawn in each batch i.e. {3,5,7} would spawn 3 zombies then 5 then 7


        //this.zombieTypes = zombieTypes todo if we have more zombie types
        this.difficultyMod = difficultyMod; //unused as of now, later I will add interaction with the zombies' stats
        this.currentBatch = 0;
        this.toSpawnNext = [];
    };



    getNextBatch() { //generates an array containing all zombies to be spawned based of the numbers in batches[]
        this.toSpawnNext = [];

        if (this.currentBatch >= this.batches.length) {
            return 0;
        }
        else {
            for (let i = 0; i < this.batches[this.currentBatch]; i++) {
                const ZOMBIE = new Zombie(getTextureFromStaticJSFolder('/../assets/sprite_sheets/enemies/clothed_zombie.png'),
                0,
                0,
                zombie_frames_json.s.w, zombie_frames_json.s.h
                );

                this.toSpawnNext.push(ZOMBIE);
            }

            this.currentBatch++;

            return this.toSpawnNext;
        }
    };
};