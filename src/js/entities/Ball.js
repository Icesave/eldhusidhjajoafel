// ====
// BALL
// ====

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// All active balls in game. Use this array if the intention is to implement multiple-balls feature
var g_activeBalls = [];

// A generic contructor which accepts an arbitrary descriptor object
function Ball(descr) {

    // Common inherited setup logic from Entity
    
    this.setup(descr);
      
    this.origYVel = this.yVel;
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.ball;
    this.scale  = this.scale  || 0.5;
    this.pause = false;
    
    this.rotation = Math.random()*6;
    this.colliding = ""; // which axis a entity is colliding with the ball

    this._spatialType = spatialManager.CIRCLE;
};

Ball.prototype = new Entity();

// lifespan for the paused balls
// the balls are paused for 4 secounds if player gets "pause ball" powerup
Ball.prototype.pauseLifespan = 4000 / NOMINAL_UPDATE_INTERVAL;
var NOMINAL_GRAVITY = 0.12;
Ball.prototype.update = function (du) {
    
    spatialManager.unregister(this);

    // if the ball is paused then count down
    if(this.pause){
        this.pauseLifespan -= du; 
    }

    // when the pauseLifespan is < 0
    // the balls move again and pauselifespan is back to 4 sec
    if(this.pauseLifespan<0) {
        this.pause = false;
        this.pauseLifespan =  4000 / NOMINAL_UPDATE_INTERVAL;
    }
    
    var prevX = this.cx;
    var prevY = this.cy;

    this.yVel += NOMINAL_GRAVITY;
    
    this.rotation += 0.005;
  
    // Compute my provisional new position (barring collisions)
    this.nextX = prevX + this.xVel * du;
    this.nextY = prevY + this.yVel * du;

    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }
    // The ball only moves while it is not in pause mode
    if (!this.pause){
        var r = this.getSpatialRadius();
        // Bounce off top, bottom and side edges
        if(this.nextY < r) {
            this.yVel *= -1;
        }  
        if(this.nextY > g_canvas.height - r) {
            this.yVel = this.origYVel;
        }
        if (this.nextX < r || this.nextX > g_canvas.width - r) {
            this.xVel *= -1;
        }
        

        this.cx += this.xVel * du;
        this.cy += this.yVel * du;
    }
    



    var entities = this.findHitEntity(), // Finds every entity that is colliding with the bullet
    ball = this; // JavaScript is unable to recognize 'this' in the function below
    entities.forEach(function(entity) {
        /* collision with a bullet */
        if(entity instanceof Bullet) {
            entity.takeHit();
            ball.takeHit();
            return entityManager.KILL_ME_NOW;
        }

        /* collision with a player */
        if(entity instanceof Player) { 
            entity.takeHit();
        }

        /* collision with a brick*/
        if(entity instanceof Brick) {
            var x = entity.getPos().posX,
                y = entity.getPos().posY;

            // The ball is colliding x side with a brick
            if(ball.colliding == "x" || ball.colliding == ""){
                if( (prevX < x && ball.xVel > 0) || // left side of the brick
                    (prevX > x && ball.xVel < 0)) { // right side of the brick
                    ball.xVel *= -1;
                }
            } 
            
            // The ball is colliding y side with a brick
            if(ball.colliding == "y" || ball.colliding == "") {
                if(prevY < y) { // top side of the brick
                    ball.yVel = ball.origYVel/2;
                }
                else if(prevY > y && ball.yVel < 0) { // bottom side of the brick
                    ball.yVel *= -1;
                }
            }

            ball.colliding = "";
        }
    });


    spatialManager.register(this);
};

// the balls can move again
Ball.prototype.undoPause= function (){
    this.pause=false;
    this.pauseLifespan =  4000 / NOMINAL_UPDATE_INTERVAL
    
}

// get the radius that is used by the spatialmanager
Ball.prototype.getSpatialRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.6;
};

// set the pause mode to true, balls can not move
Ball.prototype.setPause = function () {
    this.pause = true;
}

// handler for when the balls takes a hit
Ball.prototype.takeHit = function () {
    this.kill();
    // Powerup drops down
    // 25% chance
    var i = Math.floor(Math.random() * 3) + 1;
    if(i===2){
        entityManager.generatePowerUp(this.cx, this.cy);
    }
    
    // split the ball into 2 if it is big enough
    if (this.scale > 0.125) {
        this._spawnFragment(1, this.origYVel+1);
        this._spawnFragment(-1, this.origYVel+1);
    }
};

// Generate smaller balls
Ball.prototype._spawnFragment = function(xVel, yVel) {
    entityManager.generateBall({
        cx : this.cx,
        cy : this.cy,
        xVel : xVel,
        yVel : yVel,
        scale : this.scale/2
    });
};

// Render the ball
Ball.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
