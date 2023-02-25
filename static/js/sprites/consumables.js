import * as checks from '../helpers/checks.js';
import { Item } from './base/base.js';
import { getTextureFromStaticAssetsFolder } from '../helpers/pixi_helpers.js';



export class HealingItem extends Item {
    constructor(texture) {
        super(texture);
    };
};

export class BandageBox extends HealingItem {
    constructor() {
        super(getTextureFromStaticAssetsFolder('/consumables/bandage_box.png'));

        this.health = 20;
    };
};
