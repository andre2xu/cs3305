import * as checks from './checks.js';

const STATIC_JS_FOLDER_URL = 'http://127.0.0.1:5500/static/js';

export function getTextureFromStaticJSFolder(path) {
    checks.checkIfString(path);

    if (path[0] !== '/') {
        throw ReferenceError("Paths must start with /");
    }

    return PIXI.Texture.from(`${STATIC_JS_FOLDER_URL}${path}`);
};
