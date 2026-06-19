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

let enemy;
let enemyImg;
let enemyScale;
let enemyWidth;
let enemySpeed = 1.5;
let enemyRespawnSpeed = 60;
let enemies;

let enemyBullet;
let enemyBulletImg;
let enemyBulletScale;
let enemyBulletWidth;
let enemyBullets;

let score = 0;
let lives = 5;
let margin = 20;

let gameState = "start";



player.collider = "none"
enemy.collider = "none"
bullet.collider = "none"
enemyBullet.collider = "none"

/*
==========================================
Code
==========================================
*/

function preload() {
    img = loadImage("assets/image/background.png");
    playerImg = loadImage("assets/image/spaceship1.png");
    bulletImg = loadImage("assets/image/bullet.png")
    enemyImg = loadImage("assets/image/Obstacle10.png")
    enemyBulletImg = loadImage("assets/image/bullet.png")
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

    enemies = new Group();

    enemyBullets = new Group();

    



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
    if (kb.presses("s")) {
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
        // bullet.y = constrain(bullet.y, 0, canvas.h)
        if (bullet.y < -bullet.h / 2) {
            bullet.remove();
        }
    }

    if (frameCount % enemyRespawnSpeed == 0) {
        enemy = new Sprite();
        enemy.img = enemyImg;
        enemy.w = enemyImg.w;
        enemy.h = enemyImg.h;
        enemy.scale = random(0.075 ,0.15);
        enemy.y = 0;
        enemy.x = random(0,800);
        enemies.add(enemy);
    }
    for (let enemy of enemies) {
        enemy.y += enemySpeed
        enemy.x = constrain(enemy.x, enemy.w/2, canvas.w - enemy.w/2)
        if (enemy.y < -enemy.h * 2){
            enemy.remove();

        }
    }

    for (let enemy of enemies) {
        for (let bullet of bullets){
            if (bullet.overlapping(enemy)) {
                enemy.remove()
                bullet.remove()
                score += 1
                enemySpeed += 0.002
                enemyRespawnSpeed -= 0.01
                console.log(`your score is ${score}`);
            }
        }
    }

    for (let enemy of enemies) {
        if (enemy.overlapping(player)) {
            enemy.remove()
            lives -= 1;
            console.log(`you have ${lives} left`)
        }
    }
    // for (let enemy in enemies){
    //     if (frameCount % 20 == 0) {
    //         enemyBullet = new Sprite();
    //         enemyBullet.img = enemyBulletImg;
    //         enemyBullet.w = enemyBulletImg.w;
    //         enemyBullet.h = enemyBulletImg.h;
    //         enemyBullet.scale = 0.01;
    //         enemyBullet.y = enemy.y + 5;
    //         enemyBullet.x = enemy.x;
    //         enemyBullets.add(enemyBullet);


    // }
    // for (let enemyBullet in enemyBullets) {
    //     enemyBullet.y += 5;
    textSizeValue(25);
    textAlign(RIGHT,TOP);
    fill("#1eff00")
    text(`Score: ${score}`, canvas.w - margin, margin)
    textSizeValue(25);
    textAlign(RIGHT,TOP);
    fill("#1eff00")
    text(`Lives: ${lives}`, canvas.w - margin, margin * 3)


}



