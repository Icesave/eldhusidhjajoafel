// ======
// PowerUps
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// A generic contructor which accepts an arbitrary descriptor object
function PowerUp(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.player;
    
    this._spatialType = spatialManager.CIRCLE;

}

PowerUp.prototype = new Entity();
    
PowerUp.prototype.update = function (du) {

    // Unregister and check for death

    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // falls to the floor
    if(this.cy <= g_canvas.height){
        this.cy += 4 * du;
    }
    else {
        this.takeHit();
    }
    
    // use the right image
    if(this.type == 1) {
        this.sprite = g_sprites.playerRight;
    } 
    if(this.type == 2) {
        this.sprite = g_sprites.playerLeft;
    } 

    // (Re-)Register

    spatialManager.register(this);
};

PowerUp.prototype.takeHit = function () {
    this.kill();
};

PowerUp.prototype.getRadius = function () {
    return 4;
};

PowerUp.prototype.render = function (ctx) {

    // draw the powerup
  
    g_sprites.powerup.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

};