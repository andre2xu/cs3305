import * as checks from '../helpers/checks.js';
import { Item } from '../sprites/base/base.js';
import { Gun } from '../sprites/weapons.js';
import { Player } from '../sprites/entities.js';

import {
    updateAmmoCount,
    hideAmmoCount
} from './hud.js';



export class Inventory {
    constructor(player, texture, posX, posY, selection_texture) {
        checks.checkIfInstance(player, Player);
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
        this.currentSelItem = null;

        this.inventoryContainer = new PIXI.Container();
        this.inventoryContainer.x = posX;
        this.inventoryContainer.y = posY;

        this.selectorSprite = new PIXI.Sprite(selection_texture);
        this.selectorSprite.x = -2;
        this.selectorSprite.y = -2;
        this.selectorSprite.width = 36;
        this.selectorSprite.height = 36;

        this.inventoryContainer.addChild(this.sprite,this.selectorSprite);

        this.player = player;
    };



    // GETTERS
    ___getPositionInInventory__(index) {
        // returns x-coordinate of item

        checks.checkIfNumber(index);

        return -2 + ((this.selectorSprite.width - 4) * (index - 1));
    };

    display() {
        return this.inventoryContainer;
    };

    getSelItem() {
        return this.currentSelItem;
    };



    // SETTERS
    addItem(item) {
        checks.checkIfInstance(item, Item);

        const ICON = item.getIcon();
        this.inventoryContainer.addChild(ICON);

        const NUM_OF_ITEMS_IN_INVENTORY = this.inventory.length;
        let stored = false;

        for (let i=0; i < NUM_OF_ITEMS_IN_INVENTORY; i++) {
            if (this.inventory[i] === null) {
                this.inventory.splice(i, 1, item);

                ICON.x = this.___getPositionInInventory__(i + 1) + 2;

                stored = true;

                break;
            }

            if (i === NUM_OF_ITEMS_IN_INVENTORY && stored === false) {
                // if inventory is full, ignore item?
            }
        }
    };

    changeSelItem(index) {
        this.player.unequip();

        const SELECTED_ITEM = this.inventory[index - 1];

        this.currentSelItem = SELECTED_ITEM;

        if (SELECTED_ITEM instanceof Item) {
            this.player.equip(SELECTED_ITEM);

            if (SELECTED_ITEM instanceof Gun) {
                updateAmmoCount(SELECTED_ITEM);
            }
            else {
                hideAmmoCount();
            }
        }
        else {
            hideAmmoCount();
        }

        this.selectorSprite.x = this.___getPositionInInventory__(index);
    };

    removeSelItem() {
        const ICON = this.currentSelItem.getIcon();
        const POS_IN_INVENTORY = this.inventoryContainer.getChildIndex(ICON) - 2;

        this.inventoryContainer.removeChild(ICON);
        this.inventory.splice(POS_IN_INVENTORY, 1, null);

        this.currentSelItem = null;
    };
};