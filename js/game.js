(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'plataform');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';

var Scoreboard = function(game) {
  var gameover;

  Phaser.Group.call(this, game);

  gameover = this.create(this.game.width / 2, 100, 'gameover');

  gameover.anchor.setTo(0.5,0.5);

  this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
  this.scoreboard.anchor.setTo(0.5, 0.5);

  this.coinText = this.game.add.text(this.scoreboard.width + 240,180,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
  this.add(this.coinText);

  this.livesText = this.game.add.text(this.scoreboard.width + 240,230,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
  this.add(this.livesText);

  this.startButton = this.game.add.button(this.game.width/2, 300, 'btnrestart', this.startClick, this);
  this.startButton.anchor.setTo(0.5,0.5);

  this.add(this.startButton);

  this.y = this.game.height;
  this.x = 0;


  // initialize your prefab here
  
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.showRestart = function(coins, lives){
	  var currentcoins,currentlives; 
    //this.coinText.setText(coins.toString());
    localStorage.setItem('mycoins', coins);
    localStorage.setItem('mylives', lives);

    if(!!localStorage){
        currentcoins = localStorage.getItem('mycoins');
        currentlives = localStorage.getItem('mylives');
    }
    this.coinText.setText(currentcoins.toString());
    this.livesText.setText(currentlives.toString());

    this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
};

Scoreboard.prototype.showEndGame = function(){

};

Scoreboard.prototype.restartClick = function() {
  var restart = true;
  return restart;
};

Scoreboard.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Scoreboard;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],6:[function(require,module,exports){

  'use strict';

  var Scoreboard = require('../prefabs/scoreboard');

  function Play() {}
  Play.prototype = {

    create: function() {

      this.countDown = 30;
      this.score = 0;
      this.scoreText;

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background');

      this.ground = this.game.add.sprite(0,450,'floor');

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;

      this.plataforms = this.game.add.group();

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;



      var bigtable = this.bigplataform.create(580,180,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      this.game.add.tween(bigtable.position).to( { y: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);

      //console.log(bigtable.cameraOffset);

      this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;

      this.player = this.game.add.sprite(32, 300, 'dude');

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

    


      for(var i = 0; i< 50; i++){
        var coin  = this.coins.create(i * 50, 0, 'coin');

        coin.body.gravity.y = 800;

        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      }


      

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Arial', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Arial', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(this.game.world.x + 580,510,'Monedas',{ font: 'bold 20px Arial', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535,'280 / ',{ font: 'bold 20px Arial', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      



      console.log(this.scoreText)
      console.log(this.stars);
    },
    update: function() {

      this.game.physics.arcade.collide(this.player, this.ground);
      this.game.physics.arcade.collide(this.player, this.plataforms);

      this.game.physics.arcade.collide(this.coins, this.ground);
      this.game.physics.arcade.collide(this.coins, this.plataforms);

      this.game.physics.arcade.collide(this.coins, this.bigplataform);

      this.game.physics.arcade.collide(this.player, this.bigplataform);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);
      this.player.body.velocity.x = 0;

      if(this.cursors.left.isDown){
        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
      }
      else if(this.cursors.right.isDown){
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
      }
      else{
        this.player.animations.stop();
        this.player.frame = 4;
      }

      if(this.cursors.up.isDown && this.player.body.touching.down){
        this.player.body.velocity.y = -250;
      }

      //this.updatetimer();
    },

    updateCounter : function(){

      --this.countDown;
      if (this.countDown < 10) {
        this.clock.setText('00:0' + this.countDown);
      } else {
        this.clock.setText('00:' + this.countDown);
      }
       
      if (this.countDown === 0) {
        this.timer.stop();
        this.restartGame();
      }
    },
    clickListener: function() {
      this.game.state.start('gameover');
    },

    collectStar : function(player, coin){
      coin.kill();

      this.score += 10;

      /* codigo de los intentos */

      /*this.live = this.lives.getFirstAlive();

      if(this.live){
        this.live.kill();
      }

      if(this.lives.countLiving() < 1){
        this.player.kill();
      }*/

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = "280 / "+ this.score;
    },

    updatetimer : function(){
      console.log("cuenta atras: "+this.countDown)
      /*var minutes = Math.floor(5 / 60000) % 60;
 
      var seconds = Math.floor(60 / 1000) % 60;*/
   
      //milliseconds = Math.floor(game.time.time) % 100;
   
      //If any of the digits becomes a single digit number, pad it with a zero
    
   
      /*if (seconds < 10)
          seconds = '0' + seconds;
   
      if (minutes < 10)
          minutes = '0' + minutes;*/

      /*this.game.time.events.add(Phaser.Timer.MINUTES * 4, this.endGame, this);
    
      timer.start();*/
      //this.clock.setText(minutes+':'+ this.countDown);
    },
    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();

      if(this.live){
        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);
        //console.log(new Scoreboard(this.game));

        this.scoreboard = new Scoreboard(this.game);
        this.game.add.existing(this.scoreboard);
        this.scoreboard.showRestart(this.score,this.lives.countLiving());
      }

      if(this.lives.countLiving() < 1){
        this.player.kill();
      }
    }


  };
  
  module.exports = Play;
},{"../prefabs/scoreboard":2}],7:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('background', 'assets/bglevel1extend.png');
    this.load.image('floor', 'assets/floorlevel1.png');
    this.load.image('table', 'assets/tablelarge.png');
    this.load.image('bigtable', 'assets/tablebig.png');
    this.load.image('coin', 'assets/coinsmall.png');
    this.load.image('hudbg', 'assets/bghudbottom.png')
    this.load.image('logohud', 'assets/logosmallhud.png')
    this.load.image('stars', 'assets/star.png');
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.image('btnrestart', 'assets/btncontinue.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])