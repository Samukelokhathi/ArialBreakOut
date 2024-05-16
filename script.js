let config = {
    type:Phaser.AUTO,
    parent:'game',
    width: "100%",
    height: "100%",
    scene:{
        create:create,  //this is the main load function
        update:update,// update from the screen
        
    },
    physics:{
        default:'arcade',
        arcade:{
            gravity:{y:0},
            debug:false
        }
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config)
let ball;
let paddle;
let lava;
let lives = 3;
let score = 0;
let livesText;
let scoreText;
let bricksInfo = {
    width: 60,
    height: 30,
    count:{
        row:5,
        col:13
    },
    offset:{
        top:100,
        left:70
    },
    padding:20

}

let scene;


function create () {
    scene = this

    paddle = scene.add.rectangle(450,580,150,10, 0xffffff)
    ball = scene.add.circle(500, 400, 20, 0xffffff)
    lava = scene.add.rectangle(0, 690,200000, 10, 0xffffff)
    scoreText = scene.add.text(16, 16, 'Score: ' + score, {fontSize: '32px', fill:"#FFF"})
    livesText = scene.add.text(620,16,'Lives: ' + lives, {fontSize:'32px',fill:'#FFF'})

    scene.physics.add.existing(ball)
    scene.physics.add.existing(paddle)
    scene.physics.add.existing(lava)


    ball.body.velocity.x = 300;
    ball.body.velocity.y = 300;
    ball.body.collideWorldBounds = true;
    ball.body.bounce.y = 1;
    ball.body.bounce.x = 1;

    paddle.body.immovable = true;
    lava.body.immovable = true;

    scene.physics.add.collider(paddle,ball,bounceOfPaddle);
    createBricks()

    scene.physics.add.collider(lava,ball, hitLava);
    scene.input.on("pointermove", (pointer) =>{
        paddle.setPosition(pointer.x, paddle.y)
    })
}

function update () {
    if(score === 49){
        location.reload()
    }

    if(lives === 1){
        location.reload()
    }

}

function bounceOfPaddle(){
    ball.body.velocity.x = -1 * 5 * (paddle.x - ball.x)

}

function createBricks() {
    let defaultColor = 0xff0000; 

    for (c = 3; c < bricksInfo.count.col; c++) {
        let colColor = Phaser.Display.Color.RandomRGB();

        for (r = 0; r < bricksInfo.count.row; r++) {
            let bricksX = c * (bricksInfo.width + bricksInfo.padding) + bricksInfo.offset.left;
            let bricksY = r * (bricksInfo.height + bricksInfo.padding) + bricksInfo.offset.top;
            
            let color = colColor.color; 

            let brick = scene.add.rectangle(bricksX, bricksY, bricksInfo.width, bricksInfo.height, color);
            manage(scene.physics.add.existing(brick));
        }
    }
}

function manage(brick){
    brick.body.immovable = true;
    scene.physics.add.collider(ball, brick, () =>{
        ballHitBrick(brick)

    });
}

function ballHitBrick(brick){
    brick.destroy();
    score++
    scoreText.setText("Score: " + score)
}

function hitLava(){
    lives -= 1
    livesText.setText("Lives: " + lives)
}







// function createBricks(){
//     for(c = 3; c < bricksInfo.count.col;c++){
//         for(r = 0; r < bricksInfo.count.row;r++){
//             let bricksX = (c * (bricksInfo.width + bricksInfo.padding)+ bricksInfo.offset.left);
//             let bricksY = (r * (bricksInfo.height + bricksInfo.padding)+ bricksInfo.offset.top);
//             manage(scene.physics.add.existing(scene.add.rectangle(bricksX, bricksY, 60, 20, 0xff0000)))
//         }
//     }

// }
