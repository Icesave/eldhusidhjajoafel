// ==========
// Player STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Player(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.player;
    
    // Set normal drawing scale, and warp state off
    this.scale = 1;
    this.rotation = 0;

    this._spatialType = spatialManager.SQUARE;
};

Player.prototype = new Entity();

Player.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
};

Player.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Player.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Player.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values

Player.prototype.cx = 200;
Player.prototype.cy = 200;

Player.prototype.numSubSteps = 1;
    
Player.prototype.update = function (du) {

    // TODO: YOUR STUFF HERE! --- Unregister and check for death
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.updatePlayer();
    // Handle firing
    this.maybeFireBullet();


    
    spatialManager.register(this);
    
};

Player.prototype.takeHit = function () {
    this.reset();
};

Player.prototype.takePowerUp = function () {
    this.powerUp = power;
}

Player.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
        entityManager.fireBullet(this.cx, this.cy-this.getRadius());
    }
};

Player.prototype.getSpatialHalfWidth  = function () {
    return 10;
};

Player.prototype.getSpatialHalfHeight  = function () {
    return 20;
};

Player.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
};


Player.prototype.updatePlayer = function (du) {
    var haltflag = true;
    if (keys[this.KEY_LEFT]) {
        haltflag = false;
        if (this.cx == 30) {
            this.cx = this.cx;
        } else {
            this.cx -= 5;
        }
        this.sprite = g_sprites.playerLeft;
    }
    if (keys[this.KEY_RIGHT]) {
        haltflag = false;
        if (this.cx == g_canvas.width-30) {
            this.cx = this.cx;
        } else {
            this.cx += 5;
        }
        this.sprite = g_sprites.playerRight;
    }
    if(haltflag) {
      this.sprite = g_sprites.player;
    }
};

Player.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.sprite.scale = this._scale;
    this.sprite.scale = origScale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};
