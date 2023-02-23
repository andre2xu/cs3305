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
        COPY.width = 25;
        COPY.height = 25;

        COPY.scale.y = -1;
        COPY.rotation = 4.6;

        COPY.x = 20;
        COPY.y = 20;

        return COPY;
    };

    loadSouth() {
        const COPY = new PIXI.Sprite(this.texture);
        COPY.width = 25;
        COPY.height = 25;

        COPY.scale.y = -1;
        COPY.rotation = 1.5;

        COPY.x = 0;
        COPY.y = 20;

        return COPY;
    };

    loadWest() {
        const COPY = new PIXI.Sprite(this.texture);
        COPY.width = 25;
        COPY.height = 25;

        COPY.scale.x = -1;

        COPY.x = 18;
        COPY.y = 8;

        return COPY;
    };

    loadEast() {
        const COPY = new PIXI.Sprite(this.texture);
        COPY.width = 25;
        COPY.height = 25;

        COPY.x = 5;
        COPY.y = 8;

        return COPY;
    };
};
