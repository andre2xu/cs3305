class Supplies {
    // Initialize class
    constructor() {
        this.items = [];
    }

    //Inventory player has at a given time
    getItems() {
        if (this.items[0]) {
            console.log("You have:");
            this.items.forEach(supplies => {
                console.log(`* ${supplies.desc}`);
            });
            return true;
        } else {
            console.log("You have no supplies.");
            return false;
        }
    }

    //checking to see if item exists
    hasItem(name) {
        for (var i in this.items) {
            if (name == this.items[i].name) {
                return true;
            }
        }
        return false;
    }

   //add to inventory
    addItem(name, desc) {
        this.items.push({
            "name": name,
            "desc": desc,
        });
        return this.items.length;
    }

    //remove item from inventory
    removeItem(name) {
        this.items.forEach(supplies => {
            if (name == supplies.name) {
                this.items.pop(supplies.name);
                return true;
            } else {
                return false;
            }
        });
    }
}

// Pack inherits from Supplies
class Pack extends Supplies {
    
    addItem(name, desc) {
        this.size = 10;
        if (this.items.length >= this.size) {
            console.log("You have no room in your pack.");
            return false;
        } else {
            super.addItem(name, desc);
            return true;
        }
    }
}

let player = new Pack();
//adding items to the pack the player carries
player.addItem('weapon', 'Desert Eagle Handgun');
player.addItem('weapon', 'Shotgun');
player.addItem('weapon', 'Assault Rifle');
player.addItem('food', 'MRE');
player.addItem('light', 'This flashlight will light your way.');

player.getItems();