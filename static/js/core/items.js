import * as checks from '../helpers/checks.js';

export class Item {
    constructor(invImage, itemID, isOverwritable,isConsumable) {
        checks.checkIfInstance(invImage, PIXI.Texture);
        checks.checkIfString(itemID);
        checks.checkIfBoolean(isOverwritable);
        checks.checkIfBoolean(isConsumable);

        this.itemID = itemID;

        this.inventoryImage = new PIXI.Sprite(invImage);
        this.inventoryImage.scale.x = 1.6;
        this.inventoryImage.scale.y = 1.6;

        this.isConsumable = isConsumable // consumable items are removed upon use
        this.isOverwritable = isOverwritable // used to determine wether the item can be overwritten, some items might should not be able to be overwritten i.e the starting weapon.
    };



    onUse() {
        // make this a little text popup later
    };

    onDrop() {
        // renders the dropped item on the ground.
    };

    onPickup() {
        // if anything special should happen on pickup i.e. showing a tutorial.
    };

    onSel() {
        // if anything special should happen on selection i.e. playing a sound.
    };
};
