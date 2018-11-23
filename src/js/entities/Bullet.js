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

// get the half width for the spatial manager
Bullet.prototype.getSpatialHalfWidth  = function () {
    return this.spatialHalfWidth;
};

// get the half height for the spatial manager
Bullet.prototype.getSpatialHalfHeight  = function () {
    return this.spatialHalfHeight;
};

// HACKED-IN AUDIO (no preloading)
Bullet.prototype.fireSound = new Audio(   // Nota þessi hljóð þar til annað er ákveðið
    "sounds/bulletFire.ogg");
Bullet.prototype.zappedSound = new Audio(
    "sounds/bulletZapped.ogg");
    
// Initial, inheritable, default values
Bullet.prototype.rotation = 2.2*Math.PI;

// Convert times from milliseconds to "nominal" time units.
Bullet.prototype.lifeSpan = 6000 / NOMINAL_UPDATE_INTERVAL;

Bullet.prototype.update = function (du) {

    // Unregister and check for death

    spatialManager.unregister(this);
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    this.lifeSpan -= du;
    if (this.lifeSpan < 0) {
        return entityManager.KILL_ME_NOW; 
    }

    if(this.cy >= this.halfHeight){
        this.cy -= 10 * du;
    }

    // If the bullet reaches the ceiling
    if (this.cy < this.halfHeight) {
        if(!this.powerupBullet){
            return entityManager.KILL_ME_NOW;
        } else {
            // stop the bullet
            this.cy += 10 * du;
        }
    }

    var entities = this.findHitEntity(), // Finds every entity that is colliding with the bullet
    bullet = this; // JavaScript is unable to recognize 'this' in the function below

    entities.forEach(function(entity) {
        /* Hanlder for then the bullet hits a brick */
        if(entity instanceof Brick) { 
            bullet.takeHit();
            entity.takeHit();
        }
    });

    spatialManager.register(this);
};

// handler for then the bullet takes a hit 
Bullet.prototype.takeHit = function () {
  this.kill();
  // Make a noise when I am zapped by another bullet
  this.zappedSound.play();
};

// render the bullet
Bullet.prototype.render = function (ctx) {
    g_sprites.bullet.drawCentredAt(
        ctx, this.cx, this.cy - this.spatialHalfHeight/2
    );
};