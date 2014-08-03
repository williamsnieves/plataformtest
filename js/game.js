(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'plataform');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('final', require('./states/final'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('level1', require('./states/level1'));
  game.state.add('level2', require('./states/level2'));
  game.state.add('level3', require('./states/level3'));
  game.state.add('level4', require('./states/level4'));
  game.state.add('level5', require('./states/level5'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/final":3,"./states/gameover":4,"./states/level1":5,"./states/level2":6,"./states/level3":7,"./states/level4":8,"./states/level5":9,"./states/menu":10,"./states/preload":11}],2:[function(require,module,exports){

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
function Final() {}

Final.prototype = {
  preload: function() {

  },
  create: function() {
    this.background = this.game.add.sprite(0,0,'bginit')
    this.smalllogo = this.game.add.sprite(250,20, 'logofinal')
    this.finalmessage = this.game.add.sprite(50,190, 'finalmessage')
    //this.btnplay = this.game.add.sprite(130,290, 'buttoninit')

    this.btnplay = this.game.add.button(this.game.world.centerX - 145, 520, 'buttoncompromiso', this.actionOnClick, this, 2, 1, 0);
  },
  actionOnClick : function(){
    alert("voy a la seccion compromiso");
  },
  update: function() {
    this.game.state.start('final')
  }
};

module.exports = Final;

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
      this.game.state.start('level1');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');

  function Level1() {}
  Level1.prototype = {

    create: function() {

      this.countDown = 40;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 200;
      this.limitCoins = 200;

      this.limitLevel = 5;

      this.currentLevel = 1;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background');

      this.ground = this.game.add.sprite(0,450,'floor');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      this.addBigTable(650,180,true)
      

      //console.log(bigtable.cameraOffset);

      this.addSmallTable(150,350);
      this.addSmallTable(380,250);
      this.addSmallTable(380,250);

      this.addSmallTable(850,100);

      this.addSmallTable(900,200);

      this.addSmallTable(1200,200);

      this.addSmallTable(980,300);

      this.addSmallTable(1200,400);

      this.addSmallTable(1500,350);

      this.addSmallTable(1500,250);

      this.addSmallTable(1500,150);

      this.addSmallTable(2250,250,true);

      this.addBigTable(2560,150,true);




      this.addWall(680, 265);

      this.addWall(1950, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

      this.player = this.game.add.sprite(32, 300, 'dude');

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 3) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 8) * 50,200);
      }


      this.loadSmallCoins(750,200);
    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 17) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 19) * 50,150);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 25) * 50,150);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 20) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 25) * 50,280);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 30) * 50,280);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 30) * 50,200);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 30) * 50,100);
      } 

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 35) * 50,280);
      }

      this.loadSmallCoins(2000,150);

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 47) * 50,100);
      }


      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 55) * 50,280);
      }

      //this.loadSmallCoins(200,100,40);

      this.loadBigCoins(670,0);

      this.loadBigCoins(2580,0);

      


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 20px Cooper Std', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 20px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Cooper Std', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Cooper Std', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Cooper Std', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;


      

      console.log("cronos");
      console.log(this.cronos);
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

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
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
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
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

  
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.score += 50;

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){

      this.player.revive();

      this.player.position.x = 0;

      this.countDown = 40;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        console.log(this.player)
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);
        
    },

    gameOver : function(){
        this.game.state.start("level1");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 300,100,'¡Vamos!',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal1');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('level2');
    },
    loadSmallCoins : function(x, y, cant, mult){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;

        if(mult){
          for(var i = 0; i< cant; i++){
            var coin  = this.coins.create((i+3) * x, y, 'coin');

            coin.body.gravity.y = 800;

          }
        }
          
        /*for(var i = 0; i< cant; i++){
          var coin  = this.coins.create((i+3) * x, y, 'coin');

          coin.body.gravity.y = 800;

        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }*/


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;

        if(tween)
          this.game.add.tween(table.position).to( { x: 2350 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);


    },
    addBigTable : function(x, y, tween){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall')
        
      wall.body.immovable = true;
      
    }


  };
  
  module.exports = Level1;
},{}],6:[function(require,module,exports){

  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');

  function Level2() {}
  Level2.prototype = {

    create: function() {

      this.countDown = 40;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 200;
      this.limitCoins = 200;

      this.limitLevel = 5;

      this.currentLevel = 2;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background2');

      this.ground = this.game.add.sprite(0,450,'floor2');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      this.addBigTable(650,180,false)
      

      //console.log(bigtable.cameraOffset);

      this.addWall(40, 265);

      this.addSmallTable(280,300);

      this.addSmallTable(580,380);   

      this.addSmallTable(850,280);


      this.addSmallTable(1200,200);

      this.addSmallTable(1200,100);

      this.addSmallTable(1500,150,true,1800);


      this.addSmallTable(1900,280);

      this.addSmallTable(2200,250);
      this.addSmallTable(2000,380);
      this.addSmallTable(2300,150);

      this.addBigTable(2000,100);


      this.addBigTable(2700,150,true);




      

      this.addWall(1500, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

      this.player = this.game.add.sprite(100, 100, 'dude');

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 6) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 12) * 50,200);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 8) * 50,320);
      }

      this.loadBigCoins(670,0);


    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 17) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,50);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 24) * 50,150);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 25) * 50,300);
      }

      this.loadSmallCoins(1600,150);

      this.loadSmallCoins(1800,50);

      this.loadBigCoins(2020,0)

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 38) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 40) * 50,280);
      } 

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 45) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 48) * 50,100);
      } 

      this.loadBigCoins(2720,0)

      /*for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 30) * 50,100);
      } 

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 35) * 50,280);
      }

      this.loadSmallCoins(2000,150);

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 47) * 50,100);
      }


      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 55) * 50,280);
      }

      //this.loadSmallCoins(200,100,40);

      this.loadBigCoins(670,0);

      this.loadBigCoins(2580,0);*/

      


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 20px Cooper Std', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 20px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Cooper Std', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Cooper Std', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Cooper Std', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;


      

      console.log("cronos");
      console.log(this.cronos);
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

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
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
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
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

  
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.score += 50;

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){

      this.player.revive();

      this.player.position.x = 100
      this.player.position.y = 100;

      this.countDown = 40;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        console.log(this.player)
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);
        
    },

    gameOver : function(){
        this.game.state.start("level2");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 300,100,'¡Corre!',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal2');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('level3');
    },
    loadSmallCoins : function(x, y){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween, toX){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;

        if(tween)
          this.game.add.tween(table.position).to( { x: toX }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);


    },
    addBigTable : function(x, y, tween){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall2')
        
      wall.body.immovable = true;
      
    }


  };
  
  module.exports = Level2;
},{}],7:[function(require,module,exports){

  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');
var i=0;
var update_interval = 4 * 60;
var max = 0;
  function Level3() {}
  Level3.prototype = {

    create: function() {

    


    

      this.countDown = 40;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 200;
      this.limitCoins = 200;

      this.limitLevel = 5;

      this.currentLevel = 3;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background3');

      this.ground = this.game.add.sprite(0,450,'floor3');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      

      //console.log(bigtable.cameraOffset);

      this.addSmallTable(150,350);
      this.addSmallTable(380,250);

      this.addSmallTable(950,380,true,320,3000);

      this.addSmallTable(1250,380,true,250,5000);

      this.addSmallTable(1600,380,true,200,6000);

      this.addSmallTable(1150,140);


      this.addBigTable(1800,100);
      

      

      this.addSmallTable(2250,250,false,0,0,true);

      this.addSmallTable(2250,340);

      this.addSmallTable(2700,260);

      this.addBigTable(2560,150,true);




      this.addWall(680, 265);

      this.addWall(1950, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

      this.player = this.game.add.sprite(32, 300, 'dude');

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 3) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 8) * 50,200);
      }


      this.loadSmallCoins(750,200);
    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 23) * 50,50);
      }

      this.loadBigCoins(1820,0);

      

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 28) * 50,380);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 35) * 50,380);
      }

      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 45) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 54) * 50,200);
      } 

    

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 50) * 50,380);
      }

      

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 54) * 50,380);
      }


      //this.loadSmallCoins(200,100,40);


      

      this.loadBigCoins(2580,0);


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 20px Cooper Std', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 20px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Cooper Std', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Cooper Std', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Cooper Std', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;


    this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
    this.front_emitter.makeParticles('sheet', [0, 1, 2, 3, 4, 5,6,7,8,9]);
    this.front_emitter.maxParticleScale = 0.5;
    this.front_emitter.minParticleScale = 0.2;
    this.front_emitter.setYSpeed(100, 200);
    this.front_emitter.gravity = 0;
    this.front_emitter.width = this.game.world.width * 1.5;
    this.front_emitter.minRotation = 0;
    this.front_emitter.maxRotation = 40;

    this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
    this.back_emitter.makeParticles('sheet', [0, 1, 2, 3, 4, 5]);
    this.back_emitter.maxParticleScale = 0.1;
    this.back_emitter.minParticleScale = 0.4;
    this.back_emitter.setYSpeed(20, 100);
    this.back_emitter.gravity = 0;
    this.back_emitter.width = this.game.world.width * 1.5;
    this.back_emitter.minRotation = 0;
    this.back_emitter.maxRotation = 40;

    this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
    this.mid_emitter.makeParticles('sheet', [0, 1, 2, 3, 4, 5]);
    this.mid_emitter.maxParticleScale = 0.7;
    this.mid_emitter.minParticleScale = 0.3;
    this.mid_emitter.setYSpeed(50, 150);
    this.mid_emitter.gravity = 0;
    this.mid_emitter.width = this.game.world.width * 1.5;
    this.mid_emitter.minRotation = 0;
    this.mid_emitter.maxRotation = 40;

    this.changeWindDirection();

    console.log("nieve");
    console.log(this.front_emitter);
    this.front_emitter.start(false, 6000, 1000);
    this.mid_emitter.start(false, 6000, 1000);
    this.back_emitter.start(false, 6000, 1000);

      console.log("cronos");
      console.log(this.cronos);
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

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
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
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
      }
      



      i++;

      if (i === update_interval)
      {
          this.changeWindDirection();
          update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
          i = 0;
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

  
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.score += 50;

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){

      this.player.revive();

      this.player.position.x = 0;

      this.countDown = 40;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        console.log(this.player)
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);
        
    },

    gameOver : function(){
        this.game.state.start("level3");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 250,100,'¡Apresúrate!',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal3');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('level4');
    },
    loadSmallCoins : function(x, y, cant, mult){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;

        if(mult){
          for(var i = 0; i< cant; i++){
            var coin  = this.coins.create((i+3) * x, y, 'coin');

            coin.body.gravity.y = 800;

          }
        }
          
        /*for(var i = 0; i< cant; i++){
          var coin  = this.coins.create((i+3) * x, y, 'coin');

          coin.body.gravity.y = 800;

        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }*/


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween, toY, speed, yoyo){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;

        console.log(yoyo);

        if(typeof(tween) === "undefined"){
          tween = false
        }

        if(typeof(yoyo) === "undefined"){
          yoyo = false;
        }


         console.log(yoyo);

        if(tween)
          this.game.add.tween(table.position).to( { y: toY }, speed, Phaser.Easing.Back.InOut, true, 0, 2000, true);

        if(yoyo){
          
          this.game.add.tween(table.position).to( { y: -10 }, 7000, Phaser.Easing.Back.InOut, true, 0, 7000, true);
          this.game.add.tween(table).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true, 0, 2000, false)
          //.to( { y: 2000 }, 800, Phaser.Easing.Back.InOut, true, 0, 800, true);
        
        }


    },
    addBigTable : function(x, y, tween){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: 100 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall2')
        
      wall.body.immovable = true;
      
    },
    changeWindDirection : function() {

      var multi = Math.floor((max + 200) / 4),
          frag = (Math.floor(Math.random() * 100) - multi);
      max = max + frag;

      if (max > 200) max = 150;
      if (max < -200) max = -150;

      this.setXSpeed(this.front_emitter, max);

    },
    setXSpeed : function(emitter, max) {

      emitter.setXSpeed(max - 20, max);
      emitter.forEachAlive(this.setParticleXSpeed, this, max);

    },

    setParticleXSpeed : function(particle, max) {

      particle.body.velocity.x = max - Math.floor(Math.random() * 30);

    }


  };
  
  module.exports = Level3;
},{}],8:[function(require,module,exports){

  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');
var i=0;
var update_interval = 4 * 60;
var max = 0;
  function Level4() {}
  Level4.prototype = {

    create: function() {

    


    

      this.countDown = 45;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 200;
      this.limitCoins = 200;

      this.limitLevel = 5;

      this.currentLevel = 4;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background4');

      this.ground = this.game.add.sprite(0,450,'floor4');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      

      //console.log(bigtable.cameraOffset);

      this.addSmallTable(150,350);
      this.addSmallTable(380,250);

      this.addSmallTable(1000,400,true,245,4000);

      this.addSmallTable(1000,140);

      this.addSmallTable(1400,240,false,0,1800,true,1600);

      this.addSmallTable(1950,100);
      this.addSmallTable(1950,200);
      this.addSmallTable(1950,300);


      //this.addBigTable(1800,100);
      

      

      /*this.addSmallTable(2250,250,false,0,0,true);

      this.addSmallTable(2250,340);

      this.addSmallTable(2700,260);*/

       this.addBigTable(2780,250,true,5000,350);

      this.addBigTable(2600,150,true,6000,400);


     




      this.addWall(680, 265);

      this.addWall(2300, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

      this.player = this.game.add.sprite(32, 300, 'dude');

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 3) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 8) * 50,200);
      }

    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 20) * 50,50);
      }

       for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 30) * 50,300);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 35) * 50,300);
      }


      

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 39) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 40) * 50,150);
      }
      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 41) * 50,200);
      }

      /*for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 35) * 50,380);
      }

      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 45) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 54) * 50,200);
      } 

    

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 50) * 50,380);
      }

      

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 54) * 50,380);
      }*/


      //this.loadSmallCoins(200,100,40);


      

      this.loadBigCoins(2800,0);

      this.loadBigCoins(2615,50);


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 20px Cooper Std', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 20px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Cooper Std', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Cooper Std', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Cooper Std', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;


    this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
    this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
    this.front_emitter.maxParticleScale = 1;
    this.front_emitter.minParticleScale = 0.5;
    this.front_emitter.setYSpeed(100, 200);
    this.front_emitter.gravity = 0;
    this.front_emitter.width = this.game.world.width * 1.5;
    this.front_emitter.minRotation = 0;
    this.front_emitter.maxRotation = 40;

    this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
    this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    this.back_emitter.maxParticleScale = 0.6;
    this.back_emitter.minParticleScale = 0.2;
    this.back_emitter.setYSpeed(20, 100);
    this.back_emitter.gravity = 0;
    this.back_emitter.width = this.game.world.width * 1.5;
    this.back_emitter.minRotation = 0;
    this.back_emitter.maxRotation = 40;

    this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
    this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    this.mid_emitter.maxParticleScale = 1.2;
    this.mid_emitter.minParticleScale = 0.8;
    this.mid_emitter.setYSpeed(50, 150);
    this.mid_emitter.gravity = 0;
    this.mid_emitter.width = this.game.world.width * 1.5;
    this.mid_emitter.minRotation = 0;
    this.mid_emitter.maxRotation = 40;

    this.changeWindDirection();

    console.log("nieve");
    console.log(this.front_emitter);
    this.front_emitter.start(false, 14000, 20);
    this.mid_emitter.start(false, 12000, 40);
    this.back_emitter.start(false, 6000, 1000);

      console.log("cronos");
      console.log(this.cronos);
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

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
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
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
      }
      



      i++;

      if (i === update_interval)
      {
          this.changeWindDirection();
          update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
          i = 0;
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

  
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.score += 50;

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){

      this.player.revive();

      this.player.position.x = 0;

      this.countDown = 45;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        console.log(this.player)
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);
        
    },

    gameOver : function(){
        this.game.state.start("level4");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 300,100,'¡Falta poco!',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal3');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('level5');
    },
    loadSmallCoins : function(x, y, cant, mult){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;

        if(mult){
          for(var i = 0; i< cant; i++){
            var coin  = this.coins.create((i+3) * x, y, 'coin');

            coin.body.gravity.y = 800;

          }
        }
          
        /*for(var i = 0; i< cant; i++){
          var coin  = this.coins.create((i+3) * x, y, 'coin');

          coin.body.gravity.y = 800;

        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }*/


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween, toY, speed,horizontal,toX){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;


        if(typeof(tween) === "undefined"){
          tween = false
        }

        if(typeof(horizontal) === "undefined"){
          horizontal = false;
        }

        if(typeof(toX) === "undefined"){
          toX = 0;
        }


        if(tween)
          this.game.add.tween(table.position).to( { y: toY }, speed, Phaser.Easing.Back.InOut, true, 0, 2000, true);


        if(horizontal)
          this.game.add.tween(table.position).to( { x: toX }, speed, Phaser.Easing.Back.InOut, true, 0, 1000, true);


    },
    addBigTable : function(x, y, tween, speed, toY){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: toY }, speed, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall4')
        
      wall.body.immovable = true;
      
    },
    changeWindDirection : function() {

      var multi = Math.floor((max + 200) / 4),
          frag = (Math.floor(Math.random() * 100) - multi);
      max = max + frag;

      if (max > 200) max = 150;
      if (max < -200) max = -150;

      this.setXSpeed(this.front_emitter, max);

    },
    setXSpeed : function(emitter, max) {

      emitter.setXSpeed(max - 20, max);
      emitter.forEachAlive(this.setParticleXSpeed, this, max);

    },

    setParticleXSpeed : function(particle, max) {

      particle.body.velocity.x = max - Math.floor(Math.random() * 30);

    }


  };
  
  module.exports = Level4;
},{}],9:[function(require,module,exports){

  'use strict';

  //var Scoreboard = require('../prefabs/scoreboard');
var i=0;
var update_interval = 4 * 60;
var max = 0;
  function Level5() {}
  Level5.prototype = {

    create: function() {

    


    

      this.countDown = 45;
      this.counter = 4;
      this.score = 0;
      this.scoreText;
      this.totalScore = 200;
      this.limitCoins = 200;

      this.limitLevel = 5;

      this.currentLevel = 5;

      localStorage.removeItem('restarted')

      

      //esto se utiliza para ampliar el scenario

      this.game.world.setBounds(0, 0, 3000, 0);

      //this.background = this.game.add.sprite(0,0,'background');

      this.background = this.game.add.tileSprite(0,0, 3000, 600,'background5');

      this.ground = this.game.add.sprite(0,450,'floor4');

      /*var emitter;

      emitter = this.game.add.emitter(200, 200, 200);

      emitter.makeParticles('star');

      console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
      emitter.start(false, 500, 100);*/

      //this.table = this.game.add.sprite(0,120,'table');
      //this.table = this.game.add.sprite(0,180,'table');

      

      this.game.physics.arcade.enableBody(this.ground);

      this.ground.scale.setTo(4,1);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;

      //console.log(this.ground);
      //this.ground.body.enable = true;
      this.plataforms = this.game.add.group();
      this.plataforms.enableBody = true;

      this.bigplataform = this.game.add.group();

      this.bigplataform.enableBody = true;

      this.walls = this.game.add.group();
      this.walls.enableBody = true;

      this.coins = this.game.add.group();

      this.coins.enableBody = true;

      this.bigCoins = this.game.add.group();

      this.bigCoins.enableBody = true;
      
      

      //console.log(bigtable.cameraOffset);

      this.addSmallTable(150,350);
      this.addSmallTable(380,250);

      this.addSmallTable(1000,400,true,245,4000);

      this.addSmallTable(1000,140);

      this.addSmallTable(1400,240,false,0,1800,true,1600);

      this.addSmallTable(1950,100);
      this.addSmallTable(1950,200);
      this.addSmallTable(1950,300);


      //this.addBigTable(1800,100);
      

      

      /*this.addSmallTable(2250,250,false,0,0,true);

      this.addSmallTable(2250,340);

      this.addSmallTable(2700,260);*/

       this.addBigTable(2780,250,true,5000,350);

      this.addBigTable(2600,150,true,6000,400);


     




      this.addWall(680, 265);

      this.addWall(2300, 265);

      /*this.plataforms.enableBody = true;

      var table = this.plataforms.create(700,150,'table')
      
      table.body.immovable = true;

      table = this.plataforms.create(150,230, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(250,400, 'table');

      table.body.immovable = true;

      table = this.plataforms.create(450,330, 'table');

      table.body.immovable = true;*/

      this.player = this.game.add.sprite(32, 300, 'dude');

      this.player.kill();

  
      this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
      
      this.game.physics.arcade.enable(this.player)

      this.player.body.bounce.y = 0.2;

      this.player.body.gravity.y = 300;

      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [0, 1, 2, 3], 10, true);
      this.player.animations.add('right', [5, 6, 7, 8], 10, true); 

      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 3) * 50,200);
      }

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 8) * 50,200);
      }

    
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 20) * 50,50);
      }

       for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 30) * 50,300);
      }

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 35) * 50,300);
      }


      

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 39) * 50,50);
      }

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 40) * 50,150);
      }
      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 41) * 50,200);
      }

      /*for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 35) * 50,380);
      }

      
      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 45) * 50,250);
      } 

      for(var i = 0; i < 5; i++){
        this.loadSmallCoins((i + 54) * 50,200);
      } 

    

      for(var i = 0; i < 2; i++){
        this.loadSmallCoins((i + 50) * 50,380);
      }

      

      for(var i = 0; i < 3; i++){
        this.loadSmallCoins((i + 54) * 50,380);
      }*/


      //this.loadSmallCoins(200,100,40);


      

      this.loadBigCoins(2800,0);

      this.loadBigCoins(2615,50);


      /*var bigCoin = this.bigCoins.create(590,0,'bigcoin'); 
      bigCoin.body.gravity.y = 80;*/

      

      //for(var i = 0; i< 1; i++){

         
        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
      //}


     

      this.bghud = this.game.add.sprite(0,500,'hudbg');
      this.bghud.fixedToCamera = true;

      
      this.logohud = this.game.add.sprite(10,10,'logohud');

      this.logohud.fixedToCamera = true; 


      this.timesText = this.game.add.text(10,510,'Segundos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})
      
      this.clock = this.game.add.text(10,525,'01:00',{ font: '32px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 6 })


       

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      //this.timer.start();
    

      this.timesText.fixedToCamera = true;

      this.clock.fixedToCamera = true;

      this.intents = this.game.add.text(700,510,'Intentos',{ font: 'bold 20px Cooper Std', fill: '#355b00'})

      this.lives = this.game.add.group();

      for(var i=0; i< 3;i++){
        var star = this.lives.create(700 + (27 * i), 535, 'stars');
        star.fixedToCamera = true;
        star.alpha = 0.7;
      }

      this.intents.fixedToCamera = true;

      this.staticText = this.game.add.text(580,510,'Monedas',{ font: 'bold 20px Cooper Std', fill: '#355b00'});
      this.scoreText = this.game.add.text(580,535, this.limitCoins + ' / ',{ font: 'bold 20px Cooper Std', fill: '#fff', stroke: '#355b00', strokeThickness : 7 })

      //this.scoreText.anchor.set(0.5);

      this.scoreText.textAlign = 'center';

      this.scoreText.fixedToCamera = true;
      this.staticText.fixedToCamera = true;

      

      this.scoreText.fixedToCamera = true;
      


      

      
      this.initCounter = this.game.add.text(350,100,'',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 })
      /*this.initCounter.font = "Revalia";
      this.initCounter.fontSize = "40px";
      this.initCounter.fill = "#ff0000";*/

      this.initCounter.fixedToCamera = true;


      this.initTimer = this.game.time.create(false);

      this.initTimer.loop(1000, this.updateInitCounter, this);

      this.initTimer.start();


      this.levelhud = this.game.add.sprite(700,10, 'levelhud');
      this.levelhud.fixedToCamera = true;

      this.levelText = this.game.add.text(710,20,'Nivel',{ font: '20px Cooper Std', fill: '#ffffff'});
      /*this.levelText.font = "Revalia";
      this.levelText.fontSize = "20px";
      this.levelText.fill = "#fff";*/

      this.levelText.fixedToCamera = true;

      this.currentlevelText = this.game.add.text(710,40,this.currentLevel,{ font: '30px Cooper Std', fill: '#AFAA24'});
      /*this.currentlevelText.font = "Revalia";
      this.currentlevelText.fontSize = "30px";
      this.currentlevelText.fill = "#AFAA24";*/

      this.currentlevelText.fixedToCamera = true;

      this.limitlevelText = this.game.add.text(730,40,'/'+this.limitLevel,{ font: '30px Cooper Std', fill: '#fff'});
      /*this.limitlevelText.font = "Revalia";
      this.limitlevelText.fontSize = "30px";
      this.limitlevelText.fill = "#FFF";*/

      this.limitlevelText.fixedToCamera = true;


    this.front_emitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
    this.front_emitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
    this.front_emitter.maxParticleScale = 1;
    this.front_emitter.minParticleScale = 0.5;
    this.front_emitter.setYSpeed(100, 200);
    this.front_emitter.gravity = 0;
    this.front_emitter.width = this.game.world.width * 1.5;
    this.front_emitter.minRotation = 0;
    this.front_emitter.maxRotation = 40;

    this.back_emitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
    this.back_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    this.back_emitter.maxParticleScale = 0.6;
    this.back_emitter.minParticleScale = 0.2;
    this.back_emitter.setYSpeed(20, 100);
    this.back_emitter.gravity = 0;
    this.back_emitter.width = this.game.world.width * 1.5;
    this.back_emitter.minRotation = 0;
    this.back_emitter.maxRotation = 40;

    this.mid_emitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
    this.mid_emitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
    this.mid_emitter.maxParticleScale = 1.2;
    this.mid_emitter.minParticleScale = 0.8;
    this.mid_emitter.setYSpeed(50, 150);
    this.mid_emitter.gravity = 0;
    this.mid_emitter.width = this.game.world.width * 1.5;
    this.mid_emitter.minRotation = 0;
    this.mid_emitter.maxRotation = 40;

    this.changeWindDirection();

    console.log("nieve");
    console.log(this.front_emitter);
    this.front_emitter.start(false, 14000, 20);
    this.mid_emitter.start(false, 12000, 40);
    this.back_emitter.start(false, 6000, 1000);

      console.log("cronos");
      console.log(this.cronos);
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

      this.game.physics.arcade.collide(this.player, this.walls);
      this.game.physics.arcade.collide(this.coins, this.walls);
      
      this.game.physics.arcade.overlap(this.player, this.coins, this.collectStar, null, this);

      //this.game.physics.arcade.collide(this.bigCoins, this.plataforms);

      this.game.physics.arcade.collide(this.bigCoins, this.bigplataform);      

      this.game.physics.arcade.overlap(this.player, this.bigCoins, this.collectBigCoin, null, this);

      
      if(this.score < this.totalScore){
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
      }else{
          this.player.frame = 4;
          this.player.body.velocity.y = 0;
          this.player.body.velocity.x = 0;
          this.player.animations.stop();
      }
      



      i++;

      if (i === update_interval)
      {
          this.changeWindDirection();
          update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
          i = 0;
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

  
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    collectBigCoin : function(player, bigcoin){

      
      bigcoin.kill();
      this.score += 50;

      /* fin del codigo de intentos*/
      console.log(this.score);

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      if(this.score === this.totalScore){
        this.timer.stop();
        this.showCompleteLevel();
      }
    },

    restartGame : function(){
      console.log("reinicio el juego")

      this.live = this.lives.getFirstAlive();
      //this.scoreboard = new Scoreboard(this.game,this.player,this.timer,this.countDown);
      
      /* aqui agrego el scoreboard de forma manual invocando el sprite correspondiente */




      if(this.live){

        this.showRestartScoreBoardGameOver();

        this.live.kill();

        console.log(this.lives.countLiving());
        console.log(this.score);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());

        
        //console.log(new Scoreboard(this.game));

        this.player.kill();
        
        //this.game.add.existing(this.scoreboard);
        //this.scoreboard.showRestart(this.score,this.lives.countLiving());
        
        

        //this.player.revive();
      }

      if(this.lives.countLiving() < 1){




        this.player.kill();

        this.scoreboardGroup.destroy();

        this.showScoreBoardGameOver();

        console.log("pruebas");

        /*this.startButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);*/

        //alert("pruebas");
      }
    },

    restartClick : function(){

      var that = this;

      this.scoreboardGroup.forEach(function(item){
        //console.log(item);
        that.game.add.tween(item).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      })
      //this.game.add.tween(this.scoreboardGroup._container).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true, 0);
      //this.game.add.tween(this.scoreboardGroup.scale).to( {x: 1.2, y: 1.2}, 1000, Phaser.Easing.Back.InOut, true, 0, false).yoyo(true);


      this.restartElements();
    },

    restartElements : function(){

      this.player.revive();

      this.player.position.x = 0;

      this.countDown = 45;

      this.score = 0;

      this.scoreText.text = this.limitCoins+" / "+ this.score;

      this.timer = this.game.time.create(false);

      console.log(this.timer);

      this.timer.loop(1000, this.updateCounter, this);

      this.timer.start();

      //this.updateCounter();
      //alert("reseteo elementos")
    },

    showScoreBoardGameOver : function(){
        
        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'gameover');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.initButton = this.game.add.button(this.game.width/2, 300, 'btnstart', this.gameOver, this);
        this.initButton.anchor.setTo(0.5,0.5);

        this.initButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.initButton);

        var currentcoins,currentlives; 
      //this.coinText.setText(coins.toString());
        localStorage.setItem('mycoins', this.score);
        localStorage.setItem('mylives', this.lives.countLiving());

        if(!!localStorage){
            currentcoins = localStorage.getItem('mycoins');
            currentlives = localStorage.getItem('mylives');
        }
        this.coinText.setText(currentcoins.toString());
        this.livesText.setText(currentlives.toString());  

        //this.scoreboardGroup.remove(this.startButton);

        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showRestartScoreBoardGameOver : function(){


        this.scoreboardGroup = this.game.add.group();

        this.scoreboardGroup.position.y = this.game.height;
        this.scoreboardGroup.position.x = 0;

      

        this.gameover = this.scoreboardGroup.create(this.game.width / 2, 100, 'tryagain');

        this.gameover.anchor.setTo(0.5,0.5);

        this.gameover.fixedToCamera = true;

        this.scoreboard = this.scoreboardGroup.create(this.game.width / 2, 200, 'scoreboard');
        this.scoreboard.anchor.setTo(0.5, 0.5);

        this.scoreboard.fixedToCamera = true;


        this.coinText = this.game.add.text(this.scoreboard.width + 218,212,'0',{ font: 'bold 20px Arial', fill: '#355b00'});
        this.coinText.fixedToCamera = true;

        this.scoreboardGroup.add(this.coinText);


        this.livesText = this.game.add.text(this.scoreboard.width + 228,160,'0',{ font: 'bold 20px Arial', fill: '#355b00'})
        this.livesText.fixedToCamera = true;
        this.scoreboardGroup.add(this.livesText);

        this.startButton = this.game.add.button(this.game.width/2, 310, 'btnrestart', this.restartClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.startButton.fixedToCamera = true;
        this.scoreboardGroup.add(this.startButton);






        
        this.game.add.tween(this.scoreboardGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
    },

    showCompleteLevel : function(){
        //this.player.kill();
        console.log(this.player)
        this.key = this.game.add.sprite(this.player.position.x + 60,this.player.position.y - 70,'key');
        this.key.alpha = 0;

        this.game.add.tween(this.key).to({alpha : 1}, 1000, Phaser.Easing.Linear.None, true, 0);
        this.game.add.tween(this.key.position).to( {y: this.player.position.y - 50 }, 5000, Phaser.Easing.Back.InOut, true, 0, 5000, true);
        //var emitter;

        this.emitter = this.game.add.emitter(this.key.position.x + 20, this.key.position.y , 200);

        this.emitter.makeParticles('star');

        //console.log(emitter);
      //  false means don't explode all the sprites at once, but instead release at a rate of 20 particles per frame
      //  The 5000 value is the lifespan of each particle
        this.emitter.start(false, 1000, 50);

        this.timerKey = this.game.time.events.add(Phaser.Timer.SECOND * 4, this.removeKey, this);
        
    },

    gameOver : function(){
        this.game.state.start("level5");
    },

    updateInitCounter : function(){
        
        --this.counter;
        this.initCounter.setText(this.counter);

        if (this.counter < 1) {
          this.initTimer.stop();
          this.showInitText();
        }
    },

    showInitText : function(){

      this.game.add.tween(this.initCounter).to({alpha : 0}, 10, Phaser.Easing.Linear.None, true, 0);

      this.player.revive();

      this.timer.start();

      this.initText = this.game.add.text(this.game.world.x + 300,100,'¡Falta poco!',{ font: 'bold 45px Cooper Std', fill: '#ff0000', stroke: '#ffffff', strokeThickness : 6 });
      /*this.initText.font = "Revalia";
      this.initText.fontSize = "40px";
      this.initText.fill = "#ff0000";*/

      this.cronos = this.game.time.events.add(Phaser.Timer.SECOND * 1, this.removeInitText, this);

    },

    removeInitText : function(){
        this.game.add.tween(this.initText).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
    },

    removeKey : function(){
      console.log(this.emitter);
      this.game.add.tween(this.key).to({alpha : 0}, 500, Phaser.Easing.Linear.None, true, 0);
      this.emitter.on = false;

      this.showFinalScore();
    },
    showFinalScore : function(){

      this.velo = this.game.add.sprite(0,0,'velo');

      this.velo.fixedToCamera = true;
      this.scoreboardFinalGroup = this.game.add.group();

      this.scoreboardFinalGroup.position.y = this.game.height;
      this.scoreboardFinalGroup.position.x = 0;

    

      this.scorefinalboard = this.scoreboardFinalGroup.create(this.game.width / 2, 300, 'scorefinal3');
      this.scorefinalboard.anchor.setTo(0.5, 0.5);

      this.scorefinalboard.fixedToCamera = true;

      this.questionButton = this.game.add.button(this.game.width/2, 550, 'btnquestion', this.removeCanvas, this);
      this.questionButton.anchor.setTo(0.5,0.5);

      this.questionButton.fixedToCamera = true;
      this.scoreboardFinalGroup.add(this.questionButton);

      this.game.add.tween(this.scoreboardFinalGroup.position).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);
      
      this.game.transparent = true;
      console.log(this.game);
    },
    removeCanvas : function(){
      //$("#plataform").hide();
      this.game.state.start('final');
    },
    loadSmallCoins : function(x, y, cant, mult){
        
        var coin  = this.coins.create(x, y, 'coin');

        coin.body.gravity.y = 800;

        if(mult){
          for(var i = 0; i< cant; i++){
            var coin  = this.coins.create((i+3) * x, y, 'coin');

            coin.body.gravity.y = 800;

          }
        }
          
        /*for(var i = 0; i< cant; i++){
          var coin  = this.coins.create((i+3) * x, y, 'coin');

          coin.body.gravity.y = 800;

        //coin.body.bounce.y = 0.7 + Math.random() * 0.2;
        }*/


    },
    loadBigCoins : function(x, y){

        this.bigcoin  = this.bigCoins.create(x, y, 'bigcoin');

         this.bigcoin.body.gravity.y = 800;


    },
    addSmallTable : function(x, y, tween, toY, speed,horizontal,toX){

        var table = this.plataforms.create(x,y,'table')
        
        table.body.immovable = true;


        if(typeof(tween) === "undefined"){
          tween = false
        }

        if(typeof(horizontal) === "undefined"){
          horizontal = false;
        }

        if(typeof(toX) === "undefined"){
          toX = 0;
        }


        if(tween)
          this.game.add.tween(table.position).to( { y: toY }, speed, Phaser.Easing.Back.InOut, true, 0, 2000, true);


        if(horizontal)
          this.game.add.tween(table.position).to( { x: toX }, speed, Phaser.Easing.Back.InOut, true, 0, 1000, true);


    },
    addBigTable : function(x, y, tween, speed, toY){
      

      var bigtable = this.bigplataform.create(x,y,'bigtable');

      bigtable.body.immovable = true;

      bigtable.body.allowGravity = true;

      //bigtable.body.gravity.x = -10;

      if(tween)
        this.game.add.tween(bigtable.position).to( { y: toY }, speed, Phaser.Easing.Back.InOut, true, 0, 2000, true);
    },
    addWall : function(x, y){

      var wall = this.walls.create(x,y,'wall4')
        
      wall.body.immovable = true;
      
    },
    changeWindDirection : function() {

      var multi = Math.floor((max + 200) / 4),
          frag = (Math.floor(Math.random() * 100) - multi);
      max = max + frag;

      if (max > 200) max = 150;
      if (max < -200) max = -150;

      this.setXSpeed(this.front_emitter, max);

    },
    setXSpeed : function(emitter, max) {

      emitter.setXSpeed(max - 20, max);
      emitter.forEachAlive(this.setParticleXSpeed, this, max);

    },

    setParticleXSpeed : function(particle, max) {

      particle.body.velocity.x = max - Math.floor(Math.random() * 30);

    }


  };
  
  module.exports = Level5;
},{}],10:[function(require,module,exports){

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
      this.game.state.start('level1');
    }
  }
};

module.exports = Menu;

},{}],11:[function(require,module,exports){

'use strict';

var WebFontConfig;


function Preload() {
  this.asset = null;
  this.ready = false;
}



Preload.prototype = {
  preload: function() {

    this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    //this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('background', 'assets/bglevel1extend.png');
    this.load.image('background2', 'assets/bglevel2extended.png');
    this.load.image('background3', 'assets/bglevel3extend.png');
    this.load.image('background4', 'assets/bg4extend.png');
    this.load.image('background5', 'assets/bglevel5extend.png');
    this.load.image('floor', 'assets/floorlevel1.png');
    this.load.image('floor2', 'assets/floorlevel2.png');
    this.load.image('floor3', 'assets/floorlevel3.png');
    this.load.image('floor4', 'assets/floorlevel4.png');
    this.load.image('table', 'assets/tablelarge.png');
    this.load.image('bigtable', 'assets/tablebig.png');
    this.load.image('coin', 'assets/coinsmall.png');
    this.load.image('bigcoin', 'assets/bigcoin.png');
    this.load.image('hudbg', 'assets/bghudbottom.png')
    this.load.image('logohud', 'assets/logosmallhud.png')
    this.load.image('stars', 'assets/star.png');
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('tryagain', 'assets/tryagain.png');
    this.load.image('scoreboard', 'assets/scoreboard.png');
    this.load.image('btnstart', 'assets/btncontinue.png');
    this.load.image('btnrestart', 'assets/restart.png');
    this.load.image('levelhud', 'assets/bglevelhud.png');
    this.load.image('key','assets/key.png');
    this.load.image('star','assets/star_particle.png');
    this.load.image('scorefinal1','assets/scorefinal1.png');
    this.load.image('scorefinal2','assets/scorefinal2.png');
    this.load.image('scorefinal3','assets/scorefinal3.png');
    this.load.image('btnquestion','assets/btnpregunta.png');
    this.load.image('velo','assets/velo.png');
    this.load.image('wall','assets/wallup.png');
    this.load.image('wall2','assets/walldown.png');
    this.load.image('wall4','assets/walldown4.png');
    this.load.image('sheet','assets/hoja.png');
    this.load.image('bginit','assets/fondostart.png');
    this.load.image('logofinal','assets/logofinal.png');
    this.load.image('finalmessage','assets/messagelevel5.png');
    this.load.image('buttoncompromiso','assets/btncompromiso.png');
    this.load.image('sheet','assets/hoja.png');
    this.load.spritesheet('snowflakes','assets/snowflakes.png',17,17);
    this.load.spritesheet('snowflakes_large','assets/snowflakes_large.png',64,64);
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('level1');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])