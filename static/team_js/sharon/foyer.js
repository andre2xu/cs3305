// Citing for Sprites and Tiles used in the game


// Some drawings to help me with the javascript physics below
//  0_________________ canvas.width
//   |                |
//   |                |
//   |                |
//   |                |
//   |________________|
// canvas.height

//  Left <----- xChange < 0
//              xChange > 0 -----> Right

// Top <----- 
//           |__ yChange < 0
//               yChange > 0__ 
//                            |-----> Bottom


// Initial variables declared
let canvas;
let context;

let fpsInterval = 1000 / 30;        // the denominator is frames-per-second
let now;
let then = Date.now();


// adding the background
let backgroundImage = new PIXI.texture.from("static/assets/foyer96x48.png");     //768 pixels x 4272 pixels
let tilesPerRow = 16;
let tileSize = 48;      

//336 width / 48 = 7          //divide canvas width by tileSize
//384 height / 48 = 8          //divide canvas height by tileSize

let background = [
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13],
    [ 13, 13, 13, 13, 13, 13, 13]
]


document.addEventListener("DOMContentLoaded", init, false);


// INIT FUNCTION
function init() {
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");

    // loading image
    load_images(["static/assets/foyer96x48.png"]);


    // adding source of background Image
    backgroundImage.src = "static/assets/foyer96x48.png";

    
    window.addEventListener("keydown", activate, false);
    window.addEventListener("keyup", deactivate, false);

    // calling the draw function
    draw();
}


// ASYNC FUNCTION
async function load_images(urls) {
    let promises = [];
    for (let url of urls) {
        promises.push(new Promise((resolve) => {
            let img = new Image();
            img.onload = resolve;
            img.src = url;
        }));
    }
    await Promise.all(promises); 
}


// START OF THE DRAW FUNCTION
function draw() {
    request_id = window.requestAnimationFrame(draw);
    //window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval) {
        return;
    }
    then = now - (elapsed % fpsInterval);

    // Play background music
    forestAudio.play();

    // Draw background on canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#E6E6FA";      // black
    context.fillRect(0, 0, canvas.width, canvas.height);
    // filling in the background from the tile sheet
    for (let r = 0; r < 7; r += 1) {
        for (let c = 0; c < 8; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);
                context.drawImage(backgroundImage, 
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }

}

