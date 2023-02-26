import * as checks from '../helpers/checks.js';
import { PlayableArea } from "../map/creation.js";
import { Player } from './entities.js';

import {
    Decoration,
    DecorationFill
} from "./objects.js";

export const PORTALS = [];

export class Portal extends Decoration {
    constructor(origin, texture, posX, posY, frameWidth, frameHeight) {
        checks.checkIfInstance(origin, PlayableArea);

        super(texture, posX, posY, frameWidth, frameHeight);

        this.origin = origin;
        this.destination = null;
        this.dest_X = null;
        this.dest_Y = null; 
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
    setDestination(playableArea, x, y) {
        checks.checkIfInstance(playableArea, PlayableArea);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.destination = playableArea;

        this.dest_X = x;
        this.dest_Y = y;
    };

    teleport(player) {
        checks.checkIfInstance(player, Player);

        const GAME_STAGE = this.origin.area.parent;

        this.origin.unload();
        GAME_STAGE.removeChild(this.origin.area);

        GAME_STAGE.addChild(this.destination.load());
        this.destination.addDynamicSprite(
            player,
            'player',
            this.dest_X,
            this.dest_Y
        );
    };
};

export class PortalFill extends DecorationFill {
    constructor(origin, color, posX, posY, width, height) {
        checks.checkIfInstance(origin, PlayableArea);

        super(color, posX, posY, width, height);

        this.origin = origin;
        this.destination = null;
        this.dest_X = null;
        this.dest_Y = null; 
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
    setDestination(playableArea, x, y) {
        checks.checkIfInstance(playableArea, PlayableArea);
        checks.checkIfNumber(x);
        checks.checkIfNumber(y);

        this.destination = playableArea;

        this.dest_X = x;
        this.dest_Y = y;
    };

    teleport(player) {
        checks.checkIfInstance(player, Player);

        const GAME_STAGE = this.origin.area.parent;

        this.origin.unload();
        GAME_STAGE.removeChild(this.origin.area);

        GAME_STAGE.addChild(this.destination.load());
        this.destination.addDynamicSprite(
            player,
            'player',
            this.dest_X,
            this.dest_Y
        );
    };
};
