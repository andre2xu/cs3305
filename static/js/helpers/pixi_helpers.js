import * as checks from './checks.js';

const ASSETS_FOLDER_URL = 'http://127.0.0.1:5500/static/js/map/foyer/assets';

export function getTextureFromURL(url) {
    checks.checkIfString(url);

    PIXI.Texture.fromURL(`${ASSETS_FOLDER_URL}/Door1.png`).then((texture) => {
        return texture;
    });
};
