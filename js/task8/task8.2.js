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
let bulletWidth = 7;
let bullets;

let enemy;
let enemyImg;
let enemyScale;
let enemyWidth;

let enemyRespawnSpeed = 60;
let enemyRespawnSpeedCounter = 0;
let enemies;
let enemyImgs = [];
let currentEnemyImgIndex = 0;
let enemyColumns;
let enemyColumnPadding;
let totalGapSpace;
let enemyColumnWidth;
let jump;
let asteroidHeight;
let enemyDisplayImg;
let rowDistance = 180
let enemySpeed = 0.5
let initialSpawnFrame= 60


let enemyBullet;
let enemyBulletImg;
let enemyBulletScale;
let enemyBulletWidth;
let enemyBullets;

let score = 0;
let lives = 1;
let margin = 20;
let highScore = 0;
let level = 0;
let levelGap = 20;


let gameState = "start";
let textSizeValue = 30;
let lineHeight = textSizeValue * 1.5;

// player.collider = "none"
// enemy.collider = "none"
// bullet.collider = "none"
// enemyBullet.collider = "none"

/*
==========================================
Code
==========================================
*/

function preload() {
  img = loadImage("assets/image/background.png");
  playerImg = loadImage("assets/image/spaceship1.png");
  bulletImg = loadImage("assets/image/bullet.png");
  enemyImg = loadImage("assets/image/Obstacle10.png");
  enemyBulletImg = loadImage("assets/image/bullet.png");
  for (i = 1; i < 11; i++) {
    enemyImgs.push(loadImage(`assets/image/Obstacle${i}.png`));
  }
}

function setup() {
  canvas = new Canvas(800, 500);
  player = new Sprite();
  player.img = playerImg;
  player.w = playerImg.width;
  player.h = playerImg.height;
  player.scale = playerWidth / playerImg.w;
  player.x = canvas.w / 2;
  player.y = canvas.h - player.h / 2;

  bullets = new Group();

  enemies = new Group();

  enemyBullets = new Group();
}

function draw() {
  imageMode(CENTER);
  image(img, canvas.w / 2, canvas.h / 2, canvas.w, canvas.h);

  if (gameState == "start") {
    rectMode(CENTER);

    fill("#000000");
    stroke("#1eff00");
    strokeWeight(15);
    rect(400, 250, 600, 325, 40);

    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text("shooter", canvas.w / 2, canvas.h / 2 - lineHeight * 2);

    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text(
      "use a and d to move left and right, s to shoot",
      canvas.w / 2,
      canvas.h / 2,
    );

    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text("press s to play", canvas.w / 2, canvas.h / 2 + lineHeight * 2);
    if (kb.presses("s")) {
      score = 0;
      lives = 1;
      gameState = "run";
    }
  } else if (gameState == "run") {
    if (kb.pressing("a")) {
      player.x -= 7;
    }
    if (kb.pressing("d")) {
      player.x += 7;
    }
    player.x = constrain(player.x, player.w / 2, canvas.w - player.w / 2);
    player.y = constrain(player.y, player.w, canvas.h);

    if (kb.pressing("s")) {
      bullet = new Sprite();
      bullet.img = bulletImg;
      bullet.w = bulletImg.width;
      bullet.h = bulletImg.height;
      bullet.scale = bulletWidth / bulletImg.w;
      bullet.y = player.y - player.h / 2 - bullet.h / 2;
      bullet.x = player.x;
      bullets.add(bullet);
    }
    for (let bullet of bullets) {
      bullet.y -= 10;
      // bullet.y = constrain(bullet.y, 0, canvas.h)
      if (bullet.y < -bullet.h / 2) {
        bullet.remove();
      }
    }
    enemyColumns = floor(random(4, 9));
    enemyColumnPadding = floor(random(8, 15));
    totalGapSpace = enemyColumnPadding * 2 * enemyColumns;
    enemyColumnWidth = (canvas.w - totalGapSpace) / enemyColumns;
    asteroidHeight = floor(random(40, 90));
    spawnRate = floor(rowDistance / enemySpeed)
    level = floor(score/ levelGap) +1
    


    jump = canvas.w / enemyColumns;
    if ((frameCount - initialSpawnFrame) % spawnRate === 0) {
      currentEnemyImgIndex += 1;
    }
    enemyImg = enemyImgs[currentEnemyImgIndex % 10];
    enemyDisplayImg = enemyImg.get();
    enemyWidth = enemyColumnWidth;
    if (currentEnemyImgIndex < 5) {
      
      enemyDisplayImg.resize(enemyWidth, asteroidHeight)
    }
    for (i = 0; i < enemyColumns; i++) {
      if ((frameCount - initialSpawnFrame) % spawnRate === 0) {
        enemy = new Sprite();
        enemy.img = enemyDisplayImg;

        enemy.w = enemyDisplayImg.width;
        enemy.h = enemyDisplayImg.height;
        enemy.scale = enemyWidth / enemyDisplayImg.w;
        enemy.y = -2 * enemy.h;
        enemy.x = jump / 2 + i * jump;

        enemies.add(enemy);
      }
    }

    for (let enemy of enemies) {
      enemy.y += enemySpeed;
      enemy.x = constrain(enemy.x, enemy.w / 2, canvas.w - enemy.w / 2);
      if (enemy.y < -enemy.h * 2) {
        enemy.remove();
      }
    }

    for (let enemy of enemies) {
      for (let bullet of bullets) {
        if (bullet.overlapping(enemy)) {
          enemy.remove();
          bullet.remove();
          score += 1;
          enemySpeed += 0.002;
          enemyRespawnSpeedCounter += 1;
          if (enemyRespawnSpeedCounter == 50) {
            enemyRespawnSpeed -= 1;
            enemyRespawnSpeedCounter = 0;
          }
          console.log(`your score is ${score}`);
        }
      }
    }

    for (let enemy of enemies) {
      if (enemy.overlapping(player)) {
        enemy.remove();
        lives -= 1;
        console.log(`you have ${lives} left`);
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
    // }
    textSize(25);
    textAlign(RIGHT, TOP);
    fill("#1eff00");
    text(`Score: ${score}`, canvas.w - margin, margin);
    textSize(25);
    textAlign(RIGHT, TOP);
    fill("#1eff00");
    text(`Lives: ${lives}`, canvas.w - margin, margin * 3);

    if (lives < 1) {
      gameState = "fail";
    }
  } else {
    for (let bullet of bullets) {
      bullet.remove();
    }
    for (let enemy of enemies) {
      enemy.remove();
    }

    rectMode(CENTER);
    fill("#000000");
    stroke("#1eff00");
    strokeWeight(15);
    rect(400, 250, 600, 325, 40);

    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text("u lose", canvas.w / 2, canvas.h / 2);

    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text(`ur score was ${score}`, canvas.w / 2, canvas.h / 2 + 30);

    if (score > highScore) {
      highScore = score;
    }
    textSize(textSizeValue);
    textAlign(CENTER, CENTER);
    fill("#1eff00");
    strokeWeight(2);
    text(`ur high score was ${highScore}`, canvas.w / 2, canvas.h / 2 + 60);

    if (kb.presses("r")) {
      gameState = "start";
    }
  }
}
