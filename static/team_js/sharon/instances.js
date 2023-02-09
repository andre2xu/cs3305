let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let zombie = new Zombie(10, 10, 20, 20, "red");
let furniture = new Furniture(100, 100, 50, 50, "brown");
zombies.draw(context);
furniture.draw(context);