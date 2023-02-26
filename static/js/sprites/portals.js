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

        const PLAYER_BE_above_PORTAL_BE = player.getRightPosY() < this.getRightPosY();

        const PLAYER_TE_below_PORTAL_TE_THRESHOLD = player.getLeftPosY() > this.getLeftPosY() - 10;

        const PLAYER_RE_inside = player.getRightPosX() > this.getLeftPosX();

        const PLAYER_LE_inside = player.getLeftPosX() < this.getRightPosX();

        if (PLAYER_BE_above_PORTAL_BE && PLAYER_TE_below_PORTAL_TE_THRESHOLD && (PLAYER_RE_inside || PLAYER_LE_inside)) {
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

        const PLAYER_BE_above_PORTAL_BE = player.getRightPosY() < this.getRightPosY();

        const PLAYER_TE_below_PORTAL_TE_THRESHOLD = player.getLeftPosY() > this.getLeftPosY() - 10;

        const PLAYER_RE_inside = player.getRightPosX() > this.getLeftPosX();

        const PLAYER_LE_inside = player.getLeftPosX() < this.getRightPosX();

        if (PLAYER_BE_above_PORTAL_BE && PLAYER_TE_below_PORTAL_TE_THRESHOLD && (PLAYER_RE_inside || PLAYER_LE_inside)) {
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
