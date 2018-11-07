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

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    // Handle firing
    this.maybeFireBullet();

    
    // TODO: YOUR STUFF HERE! ---die if isColliding, otherwise Register
    //
    // Handle collisions
    //
    
    spatialManager.register(this);
    
};

Player.prototype.computeSubStep = function (du) {

};


Player.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        // TODO: player shoots bullet
           
    }
    
};

Player.prototype.getRadius = function () {
    return (this.sprite.width / 2) * 0.9;
};

Player.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};


Player.prototype.updatePlayer = function (du) {
    if (keys[this.KEY_LEFT]) {
        this.cx -= 5;
    }
    if (keys[this.KEY_RIGHT]) {
        this.cx += 5;
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
