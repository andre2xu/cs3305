const ABSOLUTE_URL = window.location.href;
const CURRENT_WORKING_DIRECTORY = ABSOLUTE_URL.substring(0, ABSOLUTE_URL.indexOf('/static/'));

export const STATIC_FOLDER = `${CURRENT_WORKING_DIRECTORY}/static`;

export const STATIC_JS_FOLDER = `${STATIC_FOLDER}/js`;

export const STATIC_ASSETS_FOLDER = `${STATIC_FOLDER}/assets`;

export const SOUND_ASSETS_FOLDER = `${STATIC_ASSETS_FOLDER}/sounds`;
