import * as checks from '../helpers/checks.js';

export class Item {
    constructor(invImage, itemID, isOverwritable,isConsumable) {
        checks.checkIfInstance(invImage, PIXI.Texture);
        checks.checkIfString(itemID);
        checks.checkIfBoolean(isOverwritable);
        checks.checkIfBoolean(isConsumable);

        this.itemID = itemID;

        this.texture = invImage;
        this.icon = new PIXI.Sprite(invImage);
    };



    // GETTERS
    getIcon() {
        return this.icon;
    };

    load() {
        const COPY = new PIXI.Sprite(this.texture);

        COPY.x = -5;
        COPY.y = 20;
        COPY.scale.y = -1;
        COPY.rotation = 1.5;

        return COPY;
    };
};
