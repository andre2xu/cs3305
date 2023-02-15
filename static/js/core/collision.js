import * as checks from '../helpers/checks.js';
import { Entity } from '../sprites/entities.js';

export const OBSTACLES = [];
export const NON_PLAYER_ENTITIES = [];

function checkCollisionWithObstacles(sprite, side) {
    checks.checkIfInstance(sprite, Entity);

    const NUM_OF_OBSTACLES = OBSTACLES.length;

    if (NUM_OF_OBSTACLES > 0) {
        const SPRITE_SPEED = sprite.getSpeed();
        const SLX = sprite.getLeftPosX() - SPRITE_SPEED;
        const SLY = sprite.getLeftPosY() - SPRITE_SPEED;
        const SRX = sprite.getRightPosX() + SPRITE_SPEED;
        const SRY = sprite.getRightPosY() + SPRITE_SPEED;

        for (let i=0; i < NUM_OF_OBSTACLES; i++) {
            const OBSTACLE = OBSTACLES[i];

            const OLX = OBSTACLE.getLeftPosX();
            const OLY = OBSTACLE.getLeftPosY();
            const ORX = OBSTACLE.getRightPosX();
            const ORY = OBSTACLE.getRightPosY();

            if (side === 'top') {
                const SB_above_TE = SRY < OLY;
                const SB_below_TE = SRY > OLY;
                const SB_below_BE = SRY > ORY;

                const SLSR_between_LERE = SLX >= OLX && SRX <= ORX;

                const SL_before_LE = SLX < OLX;
                const SR_after_RE = SRX > ORX;

                const SL_between_LERE = SLX >= OLX && SLX <= ORX;
                const SR_between_LERE = SRX >= OLX && SRX <= ORX;



                if (SB_below_BE && SB_below_TE) {
                    continue;
                }
                else if (SB_above_TE === false) {
                    if (SLSR_between_LERE) {
                        return true;
                    }
                    else if (SL_before_LE && SR_between_LERE) {
                        return true
                    }
                    else if (SR_after_RE && SL_between_LERE) {
                        return true;
                    }
                }
            }
            else if (side === 'left') {
                const SR_before_LE = SRX < OLX;
                const SR_after_LE = SRX > OLX;
                const SR_after_RE = SRX > ORX;

                const STSB_between_TEBE = SLY >= OLY && SRY <= ORY;

                const ST_above_TE = SLY < OLY;
                const SB_below_BE = SRY > ORY;

                const ST_between_TEBE = SLY >= OLY && SLY <= ORY;
                const SB_between_TEBE = SRY >= OLY && SRY <= ORY;

                const CORRECTED_SB = SRY - SPRITE_SPEED;



                if (SR_after_LE && SR_after_RE) {
                    continue;
                }
                else if (CORRECTED_SB < OLY && SLX > OLX) {
                    continue;
                }
                else if (CORRECTED_SB > ORY && SLX > OLX) {
                    continue;
                }
                else if (SR_before_LE === false) {
                    if (STSB_between_TEBE) {
                        return true;
                    }
                    else if (ST_above_TE && SB_between_TEBE) {
                        return true
                    }
                    else if (SB_below_BE && ST_between_TEBE) {
                        return true;
                    }
                }
            }
            else if (side === 'right') {
                const SL_after_RE = SLX > ORX;
                const SL_before_LE = SLX < OLX;
                const SL_before_RE = SLX < ORX;

                const STSB_between_TEBE = SLY >= OLY && SRY <= ORY;

                const ST_above_TE = SLY < OLY;
                const SB_below_BE = SRY > ORY;

                const ST_between_TEBE = SLY >= OLY && SLY <= ORY;
                const SB_between_TEBE = SRY >= OLY && SRY <= ORY;

                const CORRECTED_SB = SRY - SPRITE_SPEED;



                if (SL_before_LE && SL_before_RE) {
                    continue;
                }
                else if (CORRECTED_SB < OLY && SRX < ORX) {
                    continue;
                }
                else if (CORRECTED_SB > ORY && SRX < ORX) {
                    continue;
                }
                else if (SL_after_RE === false) {
                    if (STSB_between_TEBE) {
                        return true;
                    }
                    else if (ST_above_TE && SB_between_TEBE) {
                        return true
                    }
                    else if (SB_below_BE && ST_between_TEBE) {
                        return true;
                    }
                }
            }
            else if (side === 'bottom') {
                const ST_below_BE = SLY > ORY;
                const ST_above_TE = SLY < OLY;
                const ST_above_BE = SLY < ORY;

                const SLSR_between_LERE = SLX >= OLX && SRX <= ORX;

                const SL_before_LE = SLX < OLX;
                const SR_after_RE = SRX > ORX;

                const SL_between_LERE = SLX >= OLX && SLX <= ORX;
                const SR_between_LERE = SRX >= OLX && SRX <= ORX;



                if (ST_above_BE && ST_above_TE) {
                    continue;
                }
                else if (ST_below_BE === false) {
                    if (SLSR_between_LERE) {
                        return true;
                    }
                    else if (SL_before_LE && SR_between_LERE) {
                        return true
                    }
                    else if (SR_after_RE && SL_between_LERE) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
};

export function checkCollisionWithLeftEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'left');
};

export function checkCollisionWithRightEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'right');
};

export function checkCollisionWithTopEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'top');
};

export function checkCollisionWithBottomEdgesOfObstacles(sprite) {
    return checkCollisionWithObstacles(sprite, 'bottom');
};
