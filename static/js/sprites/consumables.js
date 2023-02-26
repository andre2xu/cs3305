import * as checks from '../helpers/checks.js';
import { Item } from './base/base.js';
import { getTextureFromStaticAssetsFolder } from '../helpers/pixi_helpers.js';
import { Player } from './entities.js';



export class HealingItem extends Item {
    constructor(texture) {
        super(texture);
    };



    // SETTERS
    heal(player) {
        checks.checkIfInstance(player, Player);

        player.increaseHealth(this.health);
    };
};

export class BandageBox extends HealingItem {
    constructor() {
        super(getTextureFromStaticAssetsFolder('/consumables/bandage_box.png'));

        this.health = 20;
    };
};
