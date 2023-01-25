//console.log(1);



const Application = PIXI.Application;

const app = new Application({
    transparent: true
});

document.body.appendChild(app.view);

//fit canvas to window
app.renderer.resize(window.innerWidth, window.innerHeight)
// blank canvas, to see canvas size, change to any other colour
app.renderer.background.color = 0xFFFFFF