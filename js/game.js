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
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){

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

},{}],4:[function(require,module,exports){

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

},{}],5:[function(require,module,exports){

  'use strict';
  function Play() {}
  Play.prototype = {
    create: function() {

      this.game.world.setBounds(0, 0, 1400, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 1400, 600,'background');

      this.ground = this.game.add.sprite(0,480,'floor');

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(2,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      console.log(this.ground);
      //this.ground.body.enable = true;

      this.plataforms = this.game.add.group();

      this.plataforms.enableBody = true;

      var table = this.plataforms.create(0,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,430, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;

      this.player = this.game.add.sprite(32, this.game.world.height - 168, 'dude');

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
    },
    update: function() {
      this.game.physics.arcade.collide(this.player, this.ground);
      this.game.physics.arcade.collide(this.player, this.plataforms);

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
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };
  
  module.exports = Play;
},{}],6:[function(require,module,exports){

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
    this.load.image('background', 'assets/bglevel1.png');
    this.load.image('floor', 'assets/floorlevel1.png');
    this.load.image('table', 'assets/tablelarge.png');
    this.load.image('bigtable', 'assets/tablebig.png');
    this.load.image('coin', 'assets/coinsmall.png');
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