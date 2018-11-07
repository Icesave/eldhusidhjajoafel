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
      
    // Default sprite and scale, if not otherwise specified
    this.sprite = this.sprite || g_sprites.ball;
    this.scale  = this.scale  || 1;

};
Ball.prototype = new Entity();

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
    
    fillCircle(ctx, this.cx, this.cy, this.radius, this.color);
};

  //Delete later
var g_ball = new Ball({
    cx: 200,
    cy: 200,
    nextX : null,
    nextY : null,
    radius: 30,
    color: "yellow",
  
    xVel: 0,
    yVel: 0,
    BASE_xVel : 5,
    BASE_yVel : 8,
  });