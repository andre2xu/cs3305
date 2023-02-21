export class Inventory {
    constructor(texture,posX,posY,selectSprite) {
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

        this.selectorSprite = new PIXI.Sprite(selectSprite);
        this.selectorSprite.x = -7;
        this.selectorSprite.y = -6;

        this.inventoryContainer.addChild(this.sprite,this.selectorSprite);

        // each cell is 51.6 pixels wide with 1.6 scale
        this.currentSelItem = 0;
        this.initialSelX = -7;
        this.selBias = 51;
    };



    load() {
        return this.inventoryContainer;
    };

    removeItem(index){
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
        else {
            console.log("No item is selected");
        }
    };

    addItem(item) {
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

    addItemOnIndex(item,index,isOverwrite){
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

    clearInventory(){
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

    moveSprite(x, y) {
        this.sprite.x += x;
        this.sprite.y += y;
    };

    scaleSprite(scaleX, scaleY) {
        this.sprite.scale.set(scaleX,scaleY);
    };

    changeSelItem(index){
        this.currentSelItem = index - 1;

        this.selectorSprite.x = this.initialSelX + ((index - 1) * this.selBias);

        console.log(this.inventory);
    };

    setPosX(x) {
        this.sprite.x = x;
    };

    setPosY(y) {
        this.sprite.y = y;
    };
};