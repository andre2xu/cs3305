import * as checks from '../helpers/checks.js';
import { Item } from './base/base.js'; 
import { updateAmmoCount } from '../core/hud.js';
import { SOUND_ASSETS_FOLDER } from '../helpers/urls.js';



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

export class Gun extends Weapon {
    constructor(texture) {
        super(texture);

        this.ammoLoaded = 12;
        this.ammoLeft = 60;
    };



    // GETTERS
    getAmmoLoaded() {
        if (this.ammoLoaded < 0) {
            return 0;
        }

        return this.ammoLoaded;
    };

    getAmmoLeft() {
        return this.ammoLeft;
    };

    getClipCapacity() {
        return this.clipCapacity;
    };

    playGunFireSound() {
        new Audio(this.gunFireSoundFile).play();
    };

    playReloadSound() {
        const AUDIO = new Audio(this.reloadSoundFile);

        AUDIO.play();

        return AUDIO;
    };

    getDamage() {
        return this.damage;
    };



    // SETTERS
    fire() {
        if (this.mode === 'semi-auto') {
            this.ammoLoaded -= 1;
        }

        if (this.ammoLoaded > -1) {
            this.playGunFireSound();

            updateAmmoCount(this);
        }

        if (this.ammoLoaded === 0 && this.ammoLeft > 0) {
            this.reload();
        }
    };

    reload() {
        this.playReloadSound();

        setTimeout(() => {
            if (this.ammoLoaded < 0) {
                // clip is empty

                this.ammoLeft -= this.clipCapacity;

                this.ammoLoaded = this.clipCapacity;
            }
            else if (this.ammoLoaded > 0) {
                const AMMO_NEEDED = this.clipCapacity - this.ammoLoaded;

                this.ammoLoaded += AMMO_NEEDED;

                this.ammoLeft -= AMMO_NEEDED;
            }
            else if (this.ammoLeft < this.clipCapacity) {
                // clip is empty AND the amount of ammo left is less than what the clip can hold

                this.ammoLoaded = this.ammoLeft;
            }

            updateAmmoCount(this);

        }, this.reloadDuration);
    };
};

export class Pistol extends Gun {
    constructor(texture) {
        super(texture);

        this.gunFireSoundFile = `${SOUND_ASSETS_FOLDER}/pistol.mp3`;
        this.reloadSoundFile = `${SOUND_ASSETS_FOLDER}/pistol_reload.mp3`;

        this.mode = 'semi-auto';

        this.clipCapacity = 12;

        this.reloadDuration = 1000; // milliseconds

        this.damage = 25;
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