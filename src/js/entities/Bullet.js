// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // Make a noise when I am created (i.e. fired)
    this.fireSound.play();

    this._spatialType = spatialManager.SQUARE;
    this.spatialHalfWidth = this.halfWidth;
    this.spatialHalfHeight = this.halfHeight;
}

Bullet.prototype = new Entity();


Bullet.prototype.getSpatialHalfWidth  = function () {
    return this.spatialHalfWidth;
};

Bullet.prototype.getSpatialHalfHeight  = function () {
    return this.spatialHalfHeight;
};

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(   // Nota þessi hljóð þar til annað er ákveðið
    "sounds/bulletFire.ogg");
Bullet.prototype.zappedSound = new Audio(
    "sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

    // Unregister and check for death

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW; 
    }

    if(this.cy >= 25 ){
        this.cy -= 10 * du;
    }

    if (this.cy < 25 ) {
        return entityManager.KILL_ME_NOW;
    }
    

    this.rotation += 1 * du;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);   



    spatialManager.register(this);
};

Bullet.prototype.getRadius = function () {
    return 4;
};

Bullet.prototype.takeHit = function () {
  this.kill();
  // Make a noise when I am zapped by another bullet
  this.zappedSound.play();
};

Bullet.prototype.render = function (ctx) {
    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
};