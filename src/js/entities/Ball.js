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

    this.randomisePosition();
    this.randomiseVelocity();
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.ball;
    this.scale  = this.scale  || 1;

};
Ball.prototype = new Entity();

Ball.prototype.randomisePosition = function () {
    // Ball randomisation defaults (if nothing otherwise specified)
    this.cx = this.cx || Math.random() * g_canvas.width;
    this.cy = this.cy || Math.random() * g_canvas.height;
    this.rotation = this.rotation || 0;
};

Ball.prototype.randomiseVelocity = function () {
    var MIN_SPEED = 20,
        MAX_SPEED = 70;

    var speed = util.randRange(MIN_SPEED, MAX_SPEED) / SECS_TO_NOMINALS;
    var dirn = Math.random() * consts.FULL_CIRCLE;

    this.velX = this.velX || speed * Math.cos(dirn);
    this.velY = this.velY || speed * Math.sin(dirn);

    var MIN_ROT_SPEED = 0.5,
        MAX_ROT_SPEED = 2.5;

    this.velRot = this.velRot ||
        util.randRange(MIN_ROT_SPEED, MAX_ROT_SPEED) / SECS_TO_NOMINALS;
};

Ball.prototype.update = function (du) {
      // Remember my previous position
      var prevX = this.cx;
      var prevY = this.cy;
  
      // Compute my provisional new position (barring collisions)
      this.nextX = prevX + this.xVel * du;
      this.nextY = prevY + this.yVel * du;

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);
    
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }
        // Bounce off top, bottom and side edges
      if (this.nextY < 0 || this.nextX > g_canvas.height) {
          this.yVel *= -1;
      }
      if (this.nextX < 0 || this.nextX > g_canvas.width) {
          this.xVel *= -1;
      }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);
    // *Actually* update my position
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;

};

Ball.prototype.getRadius = function () {
    return this.scale * (this.sprite.width / 2) * 0.9;
};

Ball.prototype.takeBulletHit = function () {
    this.kill();
    
    if (this.scale > 0.25) {
        this._spawnFragment();
        this._spawnFragment();
        
        this.splitSound.play();
    } else {
        this.evaporateSound.play();
    }
};

Ball.prototype._spawnFragment = function () {
    entityManager.generateBall({
        cx : this.cx,
        cy : this.cy,
        scale : this.scale /2
    });
};

Ball.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};