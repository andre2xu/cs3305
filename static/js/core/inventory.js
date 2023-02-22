import * as checks from '../helpers/checks.js';
import { Item } from '../core/items.js';

export class Inventory {
    constructor(texture, posX, posY, selection_texture) {
        checks.checkIfInstance(texture, PIXI.Texture);
        checks.checkIfNumber(posX);
        checks.checkIfNumber(posY);
        checks.checkIfInstance(selection_texture, PIXI.Texture);

        this.sprite = new PIXI.Sprite(texture);

        this.inventory = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ];

        this.inventoryContainer = new PIXI.Container();
        this.inventoryContainer.x = posX;
        this.inventoryContainer.y = posY;

        this.selectorSprite = new PIXI.Sprite(selection_texture);
        this.selectorSprite.x = -2;
        this.selectorSprite.y = -2;
        this.selectorSprite.width = 36;
        this.selectorSprite.height = 36;

        this.inventoryContainer.addChild(this.sprite,this.selectorSprite);
    };



    display() {
        return this.inventoryContainer;
    };

    removeItem(index){
        checks.checkIfNumber(index);

        if(this.inventory[index] != null){
            this.inventoryContainer.removeChildAt(index+2); // +2 is a bias added since the first 2 children of the container are the inventory and the selector sprite
            this.inventory[index] = null;

            return 0;
        }
        else{
            return 1;
        }
    };

    useSelItem(){
        if (this.inventory[this.currentSelItem] != null){
            this.inventory[this.currentSelItem].onUse();
        }
    };

    addItem(item) {
        checks.checkIfInstance(item, Item);

        // adding the same item twice does not work, must be something with how pixijs containers operate, so if we have to add two of the same item it has to be two different instances
        for (let i = 0; i < this.inventory.length ; i++) {
            if(this.inventory[i]==null){
                this.inventoryContainer.addChild(item.inventoryImage);

                this.inventory[i] = item;

                item.inventoryImage.x = this.selBias*i;

                return 0; // might be worth adding error handling later on.
            }
        }

        return 1;
    };

    addItemOnIndex(item, index, isOverwrite){
        checks.checkIfInstance(item, Item);
        checks.checkIfNumber(index);
        checks.checkIfBoolean(isOverwrite);

        // isOverwrite determines if the adding of the item should overwrite the item that was in that position or fail to add if there is already an item there
        if (isOverwrite){
            this.inventory[index] = item;

            this.inventoryContainer.addChild(item.inventoryImage);

            item.inventoryImage.x = this.selBias * index;
        }
        else {
            if(this.inventory[index] != null){
                return 1;
            }
            else {
                this.inventory[index] = item;

                this.inventoryContainer.addChild(item.inventoryImage);

                item.inventoryImage.x = this.selBias * index;

            }
        }
    };

    clearInventory() {
        this.inventory = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        ];

        this.inventoryContainer.destroy();
    };

    changeSelItem(index) {
        checks.checkIfNumber(index);

        this.currentSelItem = index - 1;

        this.selectorSprite.x = -2 + ((this.selectorSprite.width - 4) * (index - 1));
    };
};