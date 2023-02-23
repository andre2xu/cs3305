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



    // SETTERS
    createCopy(texture, x, y, w, h) {
        checks.checkIfInstance(texture, PIXI.Texture);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);
        checks.checkIfNumber(w);
        checks.checkIfNumber(h);

        const COPY = new PIXI.Sprite(this.texture);
        COPY.x = x;
        COPY.y = y;
        COPY.width = w;
        COPY.height = h;

        return COPY;
    };
};

export class Pistol extends Weapon {
    constructor(texture) {
        super(texture);
    };



    // GETTERS
    loadNorth() {
        const PISTOL = this.createCopy(this.texture, 25, 18, 25, 25);

        PISTOL.scale.y = -1;
        PISTOL.rotation = 4.6;

        return PISTOL;
    };

    loadSouth() {
        const PISTOL = this.createCopy(this.texture, 0, 20, 25, 25);

        PISTOL.scale.y = -1;
        PISTOL.rotation = 1.5;

        return PISTOL;
    };

    loadWest() {
        const PISTOL = this.createCopy(this.texture, 18, 8, 25, 25);

        PISTOL.scale.x = -1;

        return PISTOL;
    };

    loadEast() {
        const PISTOL = this.createCopy(this.texture, 5, 8, 25, 25);

        return PISTOL;
    };
};
