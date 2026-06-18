# JavaScript-starfury-template

## Instructions

- After completing each task, copy and paste your full code into the corresponding .js file.
- Each file acts as a save point for your project.
- If you accidentally break your code, you can return to an earlier save point and continue from there.

## Example

After completing Task 1.5:

```text
task1/task1.5.js
```

Copy and paste your entire working code into:

```js
let playerImg;
let playerSprite;
let playerScaleFactor;
let playerWidth = 100;

function preload() {
    playerImg = loadImage("assets/images/spaceship1.png");
}

function setup() {
    new Canvas(800, 500);

    playerSprite = new Sprite();

    playerSprite.img = playerImg;

    playerSprite.w = playerImg.width;
    playerSprite.h = playerImg.height;

    playerScaleFactor = playerWidth / playerImg.width;

    playerSprite.scale = playerScaleFactor;
}
```

Later, if your code stops working during Task 1.8, you can reopen:

```text
task1/task1.5.js
```

and restore your previous working version.