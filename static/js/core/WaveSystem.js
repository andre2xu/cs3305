

import {Zombie} from '../sprites/entities.js';

// import { FOYER } from '../../../map/foyer/foyer.js';
// import { getTextureFromStaticJSFolder } from '../../../helpers/pixi_helpers.js';
import {Wave} from "./Wave.js";
import zombie_frames_json from "../dev/nathaniel/assets/sprite_sheets/enemies/clothed_zombie.json" assert {type: 'json'};
export class WaveSystem {
    constructor(map,wave) {
        this.map = map
        this.waves = {}
        this.currentWave = 0
        this.wave = new Wave(0,[1,1,2,4],9)
        this.enemyID = 10
        this.isBatchDone = false
    }

    getRandomInt(min, max) { //move this somewhere else lol.
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    spawnNextWave(){
        let toSpawn = this.wave.getNextBatch()
        // if (toSpawn == 0){
        //     this.currentWave++
        //     // this.wa
        // }
        let id = "zombie"
        this.isBatchDone=false
        for (let i = 0; i < toSpawn.length ; i++) {


            console.log(toSpawn[i])
            toSpawn[i].addFrames(zombie_frames_json)
            toSpawn[i].switchFrame('n')
            let y = this.getRandomInt(100,300)
            let x = this.getRandomInt(110,300)
            eval("id= id + this.enemyID.toString()")
            this.map.addDynamicSprite(toSpawn[i],id,x,y)

            this.enemyID++

        }



    }

    checkIfBatchDone() { //
        return this.isBatchDone
    }


}

