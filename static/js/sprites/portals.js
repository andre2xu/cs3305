import { Decoration } from "./objects.js";

export const PORTALS = [];

export class Portal extends Decoration {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);
    };
};