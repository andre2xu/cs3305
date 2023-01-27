//template for future loador
//#TODO write loader logic
//decide what sprites are interactive on load


// use particle container if possible
const room = new PIXI.Container();
const enemyLoader = PIXI.Loader.shared;
//new instace might not be nescessary
const interactableLoader = new PIXI.Loader.shared;
const playerLoader = new PIXI.Loader.shared;
const roomLoader = new PIXI.Loader.shared;

roomLoader.load(loadRoom);

function loadRoom(roomLoader,resources){

}

enemyLoader.load(loadEnemies);

function loadEnemies(enemyLoader,resources){

}

interactableLoader.load(loadInteractables);

function loadInteractables(interactableLoader,resources){

}

playerLoader.load(loadPlayer);

function loadPlayer(playerLoader,resources){

}

