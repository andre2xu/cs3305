import * as checks from '../helpers/checks.js';
import { Decoration } from "./objects.js";
import { PlayableArea } from "../map/creation.js";
import { Player } from './entities.js';

export const PORTALS = [];

export class Portal extends Decoration {
    constructor(texture, posX, posY, frameWidth, frameHeight) {
        super(texture, posX, posY, frameWidth, frameHeight);

        this.destination = null;
    };



    // GETTERS
    playerIsInsidePortal(player) {
        checks.checkIfInstance(player, Player);

        if (player.getRightPosY() < this.getRightPosY() && (player.getRightPosX() > this.getLeftPosX() || player.getLeftPosX() < this.getRightPosX())) {
            return true;
        }

        return false;
    };



    // SETTERS
    setDestination(playableArea) {
        checks.checkIfInstance(playableArea, PlayableArea);

        this.destination = playableArea;
    };
};