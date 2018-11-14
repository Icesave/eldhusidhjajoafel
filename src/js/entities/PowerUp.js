// ======
// PowerUps
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// A generic contructor which accepts an arbitrary descriptor object
function PowerUp(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

  
}

PowerUp.prototype = new Entity();
    
PowerUp.prototype.update = function (du) {

    // Unregister and check for death

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // falls to the floor
    if(this.cy <= g_canvas.height ){
        this.cy += 4 * du;
    }

    // (Re-)Register

    spatialManager.register(this);
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