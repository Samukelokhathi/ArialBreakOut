


let config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: "100%",
    height: "100%",
    scene: {
        create: create,
        update: update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);
let ball;
let paddle;
let lava;
let lives = 3;
let score = 0;
let livesText;
let scoreText;
let bricksInfo = {
    count: {
        row: 5,
        col: 13
    },
    paddingRatio: 0.02 // Padding as a ratio of screen size
};

let brickWidth, brickHeight, brickPaddingX, brickPaddingY;

let scene;

function create() {
    scene = this;

    paddle = scene.add.rectangle(scene.scale.width / 2, scene.scale.height - 50, scene.scale.width / 6, 10, 0xffffff);
    ball = scene.add.circle(scene.scale.width / 2, scene.scale.height / 2, scene.scale.width / 50, 0xffffff);
    lava = scene.add.rectangle(0, scene.scale.height - 10, 200000, 10, 0xffffff);
    scoreText = scene.add.text(scene.scale.width * 0.02, scene.scale.height * 0.02, 'Score: ' + score, { fontSize: scene.scale.width * 0.03 + 'px', fill: "#FFF" });
    livesText = scene.add.text(scene.scale.width * 0.8, scene.scale.height * 0.02, 'Lives: ' + lives, { fontSize: scene.scale.width * 0.03 + 'px', fill: '#FFF' });

    scene.physics.add.existing(ball);
    scene.physics.add.existing(paddle);
    scene.physics.add.existing(lava);

    ball.body.velocity.x = 300;
    ball.body.velocity.y = 300;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.y = 1;
    ball.body.bounce.x = 1;

    paddle.body.immovable = true;
    lava.body.immovable = true;

    scene.physics.add.collider(paddle, ball, bounceOfPaddle);
    createBricks();

    scene.physics.add.collider(lava, ball, hitLava);
    scene.input.on("pointermove", (pointer) => {
        paddle.setPosition(pointer.x, paddle.y);
    });
}

function update() {
    if (lives === 1 || score === 48) {
        location.reload();
    }
}

function bounceOfPaddle() {
    ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x);
}

function createBricks() {
    let color = Phaser.Display.Color.RandomRGB().color;

    brickWidth = (scene.scale.width - scene.scale.width * bricksInfo.paddingRatio * (bricksInfo.count.col + 1)) / bricksInfo.count.col;
    brickHeight = scene.scale.width * 0.02;
    brickPaddingX = scene.scale.width * bricksInfo.paddingRatio;
    brickPaddingY = scene.scale.width * bricksInfo.paddingRatio;

    for (let c = 0; c < bricksInfo.count.col; c++) {
        for (let r = 0; r < bricksInfo.count.row; r++) {
            let bricksX = c * (brickWidth + brickPaddingX) + brickPaddingX;
            let bricksY = r * (brickHeight + brickPaddingY) + scene.scale.width * 0.1;

            let brick = scene.add.rectangle(bricksX, bricksY, brickWidth, brickHeight, color);
            manage(scene.physics.add.existing(brick));
        }
    }
}

function manage(brick) {
    brick.body.immovable = true;
    scene.physics.add.collider(ball, brick, () => {
        ballHitBrick(brick);
    });
}

function ballHitBrick(brick) {
    brick.destroy();
    score++;
    scoreText.setText("Score: " + score);
}

function hitLava() {
    lives -= 1;
    livesText.setText("Lives: " + lives);
}
