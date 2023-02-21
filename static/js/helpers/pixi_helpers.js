import * as checks from './checks.js';

const ABSOLUTE_URL = window.location.href;
const CURRENT_WORKING_DIRECTORY = ABSOLUTE_URL.substring(0, ABSOLUTE_URL.indexOf('/static/'));
const STATIC_JS_FOLDER_URL = `${CURRENT_WORKING_DIRECTORY}/static/js/`;

export function getTextureFromStaticJSFolder(path) {
    checks.checkIfString(path);

    if (path[0] !== '/') {
        throw ReferenceError("Paths must start with /");
    }

    return PIXI.Texture.from(`${STATIC_JS_FOLDER_URL}${path}`);
};
