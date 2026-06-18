/*
==========================================
VARIABLES
==========================================
*/
let canvas;
let img;

/*
==========================================
Code
==========================================
*/

function preload() {
    img = loadImage("assets/image/background.png");
}

function setup() {
    canvas = new Canvas(800,500);
}

function draw() {
    imageMode(CENTER)
    image(img,400,250,800,500)
}