/*
==========================================
VARIABLES
==========================================
*/
let canvas;
let img;
let player;
let playerImg;
let playerScale;
let playerWidth = 90;
let bullet;
let bulletImg;
let bulletScale;
let bulletWidth = 7
let bullets;

/*
==========================================
Code
==========================================
*/

function preload() {
    img = loadImage("assets/image/background.png");
    playerImg = loadImage("assets/image/spaceship1.png");
    bulletImg = loadImage("assets/image/bullet.png")
}

function setup() {
    canvas = new Canvas(800,500);
    player = new Sprite();
    player.img = playerImg;
    player.w = playerImg.width;
    player.h = playerImg.height;
    player.scale = playerWidth/playerImg.w;
    player.x = canvas.w/2;
    player.y = canvas.h - player.h/2;

    bullets = new Group();
    



}

function draw() {
    imageMode(CENTER);
    image(img,canvas.w/2,canvas.h/2,canvas.w,canvas.h);
    if (kb.pressing("a")){
        player.x -= 7
    }
    if (kb.pressing("d")) {
        player.x += 7
    }
    player.x = constrain(player.x, player.w/2, canvas.w - player.w/2)
    player.y = constrain(player.y, player.w, canvas.h)
    // if (kb.presses("s")) {
    //     bullet.y = player.y - player.h / 2 - bullet.h / 2
    //     bullet.x = player.x
        


    // }
    // bullet.y -= 10
    if (kb.pressing("s")) {
        bullet = new Sprite();
        bullet.img = bulletImg;
        bullet.w = bulletImg.width;
        bullet.h = bulletImg.height;
        bullet.scale = bulletWidth/bulletImg.w;
        bullet.y = player.y - player.h / 2 - bullet.h / 2
        bullet.x = player.x
        bullets.add(bullet);
  
    }
    for (let bullet of bullets) {
        bullet.y -= 10
        bullet.y = constrain(bullet.y, 0, canvas.h)
    }
}