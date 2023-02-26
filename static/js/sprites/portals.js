import * as checks from '../helpers/checks.js';
import { Decoration } from "./objects.js";
import { PlayableArea } from "../map/creation.js";

export const PORTALS = [];

export class Portal extends Decoration {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.destination = null;
    };



    // SETTERS
    setDestination(playableArea) {
        checks.checkIfInstance(playableArea, PlayableArea);

        this.destination = playableArea;
    };
};