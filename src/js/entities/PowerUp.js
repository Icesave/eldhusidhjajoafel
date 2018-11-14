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
        this.cy += 10 * du;
    }

    if (this.cy > g_canvas.height ) {
        return entityManager.KILL_ME_NOW;
    }
     
    // (Re-)Register

    spatialManager.register(this);
};

PowerUp.prototype.getRadius = function () {
    return 4;
};

PowerUp.prototype.render = function (ctx) {

    g_sprites.powerUp.drawWrappedCentredAt(ctx, this.cx, this.cy);

};