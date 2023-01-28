//class to manage storage for the game
class GameStuff {
    constructor() {
      this.items = {};
    }
  
    addItem(itemName, quantity) {
      if (this.items[itemName]) {
        this.items[itemName] += quantity;
      } else {
        this.items[itemName] = quantity;
      }
    }
  
    removeItem(itemName, quantity) {
      if (this.items[itemName] >= quantity) {
        this.items[itemName] -= quantity;
      } else {
        console.log(`Cannot remove ${quantity} of ${itemName}, only ${this.items[itemName]} available.`);
      }
    }
  
    checkGameStuff() {
      console.log(this.items);
    }
  }
  

