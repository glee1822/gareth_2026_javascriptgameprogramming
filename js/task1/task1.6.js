/*
==========================================
VARIABLES
==========================================
*/
let canvas;
let img;
let player;
let playerScale;
let playerWidth = 90;
/*
==========================================
Code
==========================================
*/

function preload() {
    img = loadImage("assets/image/background.png");
    playerImg = loadImage("assets/image/spaceship1.png");
}

function setup() {
    canvas = new Canvas(800,500);
    player = new Sprite();
    player.img = playerImg;
    player.w = playerImg.width;
    player.h = playerImg.height;
    player.scale = playerWidth/playerImg.w;
    player.x = canvas.w/2
    player.y = canvas.h - player.h/2

}

function draw() {
    imageMode(CENTER);
    image(img,canvas.w/2,canvas.h/2,canvas.w,canvas.h);
    
}