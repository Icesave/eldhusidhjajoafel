// ======
// PowerUps
// ======

"use strict";

/* 
  * ÐowerUp.js - Object + browser support
  * Author: Ólöf Fríða (ofm1)
  * constructor for powerups
*/

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

    // if powerup dies, kill it
    if (this._isDeadNow) return entityManager.KILL_ME_NOW;

    // powerup falls down, dies when it hits the "floor"
    if(this.cy <= g_canvas.height){
        this.cy += 4 * du;
    }
    else {
        this.takeHit();
    }

    // (Re-)Register

    spatialManager.register(this);
};

// when the powerup takes a hit 
PowerUp.prototype.takeHit = function () {
    this.kill();
};

// checks which type the powerup is 
// and sets the sprite
PowerUp.prototype.setSprite = function () {
    if(this.type==1) { 
        this.sprite = g_sprites.lifePu;
     }
     if(this.type==2) {
         this.sprite = g_sprites.bulletPu;
     }
     if(this.type==3) {
         this.sprite = g_sprites.bulletPlusPu;
     }
     if(this.type==4) {
         this.sprite = g_sprites.stopPu;
     }
}

// allow Player.js to get the sprite
PowerUp.prototype.getSprite = function () {
    return this.sprite;
}

PowerUp.prototype.render = function (ctx) {

    // set the sprite
    this.setSprite();

    // draw the falling powerup
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

};