import * as checks from './checks.js';

import {
    STATIC_JS_FOLDER,
    STATIC_ASSETS_FOLDER
} from './urls.js';



export function getTextureFromStaticJSFolder(path) {
    checks.checkIfString(path);

    if (path[0] !== '/') {
        throw ReferenceError("Paths must start with /");
    }

    return PIXI.Texture.from(`${STATIC_JS_FOLDER}${path}`);
};

export function getTextureFromStaticAssetsFolder(path) {
    checks.checkIfString(path);

    if (path[0] !== '/') {
        throw ReferenceError("Paths must start with /");
    }

    return PIXI.Texture.from(`${STATIC_ASSETS_FOLDER}${path}`);
};
