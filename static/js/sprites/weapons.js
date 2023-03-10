import * as checks from '../helpers/checks.js';
import { Item } from './base/base.js'; 
import { updateAmmoCount } from '../core/hud.js';

import {
    STATIC_ASSETS_FOLDER,
    SOUND_ASSETS_FOLDER
} from '../helpers/urls.js';



export function toggleCrosshair(container) {
    checks.checkIfInstance(container, PIXI.Container);

    if (window.HOTBAR !== undefined && window.HOTBAR !== null) {
        if (window.HOTBAR.getSelItem() instanceof Gun) {
            container.cursor = `url(${STATIC_ASSETS_FOLDER}/guns/crosshair.png), auto`;
        }
        else {
            container.cursor = 'auto';
        }
    }
};



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
    };



    // GETTERS
    getAmmoLoaded() {
        if (this.ammoLoaded < 0) {
            return 0;
        }

        return this.ammoLoaded;
    };

    getMaxAmmo(){
        return this.maxAmmo
    }

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
            if (this.ammoLoaded <= 0) {
                // clip is empty (auto reload)

                if (this.ammoLeft >= 12) {
                    this.ammoLeft -= this.clipCapacity;

                    this.ammoLoaded = this.clipCapacity;
                }
                else if (this.ammoLeft < 12) {
                    this.ammoLoaded = this.ammoLeft;

                    this.ammoLeft -= this.ammoLeft;
                }
            }
            else if (this.ammoLoaded > 0) {
                // clip is not empty (manual reload)

                const AMMO_NEEDED = this.clipCapacity - this.ammoLoaded;

                if (this.ammoLeft >= AMMO_NEEDED) {
                    this.ammoLoaded += AMMO_NEEDED;

                    this.ammoLeft -= AMMO_NEEDED;
                }
                else if (this.ammoLeft < AMMO_NEEDED) {
                    this.ammoLoaded += this.ammoLeft;

                    this.ammoLeft -= this.ammoLeft;
                }
            }

            updateAmmoCount(this);

        }, this.reloadDuration);
    };

    addMaxAmmo(amount){
        this.ammoLeft = amount;

        updateAmmoCount(this);
    };

    setDamage(amount){
        this.damage = amount
    }

    increaseDamage(amount){
        this.damage += amount
    }

    increaseClipCapacity(amount){
        this.clipCapacity += amount
    }

    increaseMaxAmmo(amount){
        this.maxAmmo += amount
    }



};

export class Pistol extends Gun {
    constructor(texture) {
        super(texture);

        this.gunFireSoundFile = `${SOUND_ASSETS_FOLDER}/pistol.mp3`;
        this.reloadSoundFile = `${SOUND_ASSETS_FOLDER}/pistol_reload.mp3`;
        this.reloadDuration = 1000; // milliseconds

        this.mode = 'semi-auto';

        this.clipCapacity = 12;
        this.ammoLoaded = this.clipCapacity;
        this.ammoLeft = 60;
        this.maxAmmo = this.ammoLeft
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