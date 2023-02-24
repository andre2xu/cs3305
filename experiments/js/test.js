import {
    SemiSolid,
    Player,
    Zombie
} from '../js/sprites.js';

import {
    MOVEMENT_KEY_STATUSES,
    checkForCollisionsAndMove
} from '../js/movement.js';



import player_frames_json from '../assets/sprite_sheets/player/player.json' assert {type: 'json'};



window.addEventListener('load', () => {
    const GAME = new PIXI.Application({
        resizeTo: window,
    });
    const GAME_VIEW = GAME.view;

    GAME_VIEW.style.position = 'absolute';

    document.body.appendChild(GAME_VIEW);



    // PLAYER
    const player_sprite = PIXI.Texture.from('assets/sprite_sheets/player/player.png');
    const player = new Player(player_sprite, 0, 0, 23, 32);
    player.setPosition(250, 200);

    const PEF = player_frames_json.e;
    const PEFL = player_frames_json.el;
    const PEFR = player_frames_json.er;
    player.addFrame('east', PEF.x, PEF.y, PEF.w, PEF.h);
    player.addFrame('east_left', PEFL.x, PEFL.y, PEFL.w, PEFL.h);
    player.addFrame('east_right', PEFR.x, PEFR.y, PEFR.w, PEFR.h);

    const PSF = player_frames_json.s;
    const PSFL = player_frames_json.sl;
    const PSFR = player_frames_json.sr;
    player.addFrame('south', PSF.x, PSF.y, PSF.w, PSF.h);
    player.addFrame('south_left', PSFL.x, PSFL.y, PSFL.w, PSFL.h);
    player.addFrame('south_right', PSFR.x, PSFR.y, PSFR.w, PSFR.h);

    const PWF = player_frames_json.w;
    const PWFL = player_frames_json.wl;
    const PWFR = player_frames_json.wr;
    player.addFrame('west', PWF.x, PWF.y, PWF.w, PWF.h);
    player.addFrame('west_left', PWFL.x, PWFL.y, PWFL.w, PWFL.h);
    player.addFrame('west_right', PWFR.x, PWFR.y, PWFR.w, PWFR.h);

    const PNF = player_frames_json.n;
    const PNFL = player_frames_json.nl;
    const PNFR = player_frames_json.nr;
    player.addFrame('north', PNF.x, PNF.y, PNF.w, PNF.h);
    player.addFrame('north_left', PNFL.x, PNFL.y, PNFL.w, PNFL.h);
    player.addFrame('north_right', PNFR.x, PNFR.y, PNFR.w, PNFR.h);

    player.switchFrame('south');

    let reset_to_idle_timer = null;

    player.addEvent('move', (event) => {
        clearTimeout(reset_to_idle_timer);

        reset_to_idle_timer = setTimeout(() => {
            player.rotateToMouse(); // resets player sprite to the idle frame
        }, 100);

        if (new Date().getMilliseconds() % 2 === 0) {
            if (event.currentFrame === 'south' || event.currentFrame === 'south_right') {
                player.switchFrame('south_left');
            }
            else if (event.currentFrame === 'south_left') {
                player.switchFrame('south_right');
            }
            else if (event.currentFrame === 'east' || event.currentFrame === 'east_right') {
                player.switchFrame('east_left');
            }
            else if (event.currentFrame === 'west' || event.currentFrame === 'west_right') {
                player.switchFrame('west_left');
            }
            else if (event.currentFrame === 'west_left') {
                player.switchFrame('west_right');
            }
            else if (event.currentFrame === 'east' || event.currentFrame === 'east_right') {
                player.switchFrame('east_left');
            }
            else if (event.currentFrame === 'east_left') {
                player.switchFrame('east_right');
            }
            else if (event.currentFrame === 'north' || event.currentFrame === 'north_right') {
                player.switchFrame('north_left');
            }
            else if (event.currentFrame === 'north_left') {
                player.switchFrame('north_right');
            }
        }
    });



    // ENEMY
    const zombie_sprite = PIXI.Texture.from('assets/sprite_sheets/player/player.png');
    const zombie = new Zombie(zombie_sprite, 0, 0, 23, 32);
    zombie.setPosition(250, 300);

    zombie.addFrame('east', PEF.x, PEF.y, PEF.w, PEF.h);
    zombie.addFrame('south', PSF.x, PSF.y, PSF.w, PSF.h);
    zombie.addFrame('west', PWF.x, PWF.y, PWF.w, PWF.h);
    zombie.addFrame('north', PNF.x, PNF.y, PNF.w, PNF.h);

    zombie.switchFrame('north');



    const table = new SemiSolid(PIXI.Texture.from('assets/individual/table.png'), 0, 0, 114, 111);
    table.setPosition(0, 0);
    table.modifyCollisionBoundary(-5, 5, 5, 3);



    GAME.stage.addChild(
        player.load(),
        zombie.load(),
        table.load()
    );



    // MOVEMENT
    window.addEventListener('keyup', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                MOVEMENT_KEY_STATUSES.w = false;
                break;
            case 's':
                MOVEMENT_KEY_STATUSES.s = false;
                break;
            case 'a':
                MOVEMENT_KEY_STATUSES.a = false;
                break;
            case 'd':
                MOVEMENT_KEY_STATUSES.d = false;
                break;
        }
    });

    window.addEventListener('keydown', (event) => {
        switch (event.key.toLowerCase()) {
            case 'w':
                MOVEMENT_KEY_STATUSES.w = true;
                break;
            case 's':
                MOVEMENT_KEY_STATUSES.s = true;
                break;
            case 'a':
                MOVEMENT_KEY_STATUSES.a = true;
                break;
            case 'd':
                MOVEMENT_KEY_STATUSES.d = true;
                break;
        }

        checkForCollisionsAndMove(player);

        zombie.rotateToPlayer(player.getCenterCoordinates());
    });

    window.addEventListener('mousemove', (event) => {
        window.mouseX = event.x;
        window.mouseY = event.y;

        if (MOVEMENT_KEY_STATUSES.w === false && MOVEMENT_KEY_STATUSES.a === false && MOVEMENT_KEY_STATUSES.s === false && MOVEMENT_KEY_STATUSES.d === false) {
            player.rotateToMouse();
        }
    });
});
