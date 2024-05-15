let ball;
let paddle;


const preload = ()=>{
    game.scale.scaleMode = Phaser.scaleMessenger.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.image("ball",'img/ball.jpeg');
    game.image("paddle",'img/paddle.jpeg' )
}
const create = ()=>{
    game.physics.startSystem(Phaser.physics.ARCADE);
    ball = game.add.sprite('50',"50",'ball')
    game.physics.enable(ball,Phaser.physics.ARCADE);
    ball.body.velocity.set('150',"150");
    ball.body.collideWorldBounds= true;
    ball.body.bounce.set(1)

    paddle = game.add.sprite(game.wolrd.width*0.5,game.world.height-5, "paddle")
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.physics.ARCADE);
    paddle.body.immovable = true
}
const update= ()=>{
    ball.x += 1;
    ball.y += 1;

    ball = game.add.sprite(game.world.width * 0.5, game.world.height - 25, "ball");
ball.anchor.set(0.5);
ball.body.velocity.set(150, -150);



    game.physics.arcade.collide(ball,paddle);
    paddle.x = game.inpute.x || game.world.width*0.5;
}


const game = new Phaser.game(480,320, Phaser.CANVAS, null, {
    preload,
    create,
    update,

});

