// this is the logic behind an item, we might want to have a "Pickup" class to represent items that are on the ground and can be picked up

export class Item {
    constructor(posX, posY, invImage,itemID,isOverwritable,isConsumable) {
        // this.sprite = new PIXI.Sprite(texture);
        // this.sprite.x = posX
        // this.sprite.y = posY
        this.isOverwritable = isOverwritable //used to determine wether the item can be overwritten, some items might should not be able to be overwritten i.e the starting weapon.
        this.itemID = itemID
        this.inventoryImage = new PIXI.Sprite(invImage)
        this.inventoryImage.scale.x = 1.6
        this.inventoryImage.scale.y = 1.6
        this.isConsumable = isConsumable //consumable items are removed upon use
    }


    onUse() {
        console.log("This Item has no effect!") //make this a little text popup later
    }

    onDrop(){ //renders the dropped item on the ground

    }

    onPickup(){ //if anything special should happen on pickup i.e. showing a tutorial
    }

    onSel(){ //if anything special should happen on selection i.e. playing a sound.

    }





}