import * as checks from '../helpers/checks.js';

// BASE
export class Item {
    constructor(texture) {
        checks.checkIfInstance(texture, PIXI.Texture);

        this.texture = texture;
        this.icon = new PIXI.Sprite(texture);
    };



    // GETTERS
    getIcon() {
        return this.icon;
    };
};



// WEAPONS
export class Weapon extends Item {
    constructor(texture) {
        super(texture);
    };
};

export class Pistol extends Weapon {
    constructor(texture) {
        super(texture);
    };



    // GETTERS
    loadNorth() {
        const COPY = new PIXI.Sprite(this.texture);
        return COPY;
    };

    loadSouth() {
        const COPY = new PIXI.Sprite(this.texture);

        COPY.x = -5;
        COPY.y = 20;
        COPY.scale.y = -1;
        COPY.rotation = 1.5;

        return COPY;
    };

    loadWest() {
        const COPY = new PIXI.Sprite(this.texture);
        return COPY;
    };

    loadEast() {
        const COPY = new PIXI.Sprite(this.texture);
        return COPY;
    };
};
