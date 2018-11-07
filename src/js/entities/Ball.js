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
    this.scale  = this.scale  || 0.5;

};
Ball.prototype = new Entity();

var NOMINAL_GRAVITY = 0.12;
Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    this.yVel += NOMINAL_GRAVITY;
  
    // Compute my provisional new position (barring collisions)
    this.nextX = prevX + this.xVel * du;
    this.nextY = prevY + this.yVel * du;

    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }



    var r = this.getRadius();
    // Bounce off top, bottom and side edges
    if (this.nextY < r || this.nextY > g_canvas.height - r) {
        this.yVel *= -1;
    }
    if (this.nextX < r || this.nextX > g_canvas.width - r) {
        this.xVel *= -1;
    }
    
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
        scale : this.scale/2
    });
};

Ball.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this.scale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};