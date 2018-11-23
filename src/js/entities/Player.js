// ==========
// Player STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* 
  * Player.js 
  * constructor for a player
*/



// A generic contructor which accepts an arbitrary descriptor object
function Player(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    // remember the resets
    this.rememberResets();
    
    // Default sprite, if not otherwise specified
    this.sprite = this.sprite || g_sprites.player;
    
    // Set normal drawing scale
    this.scale = 1;
    // check if player has a life powerup
    this.extraLife = false;
    // check if player has any powerup
    this.hasPowerUp = false;

    this._spatialType = spatialManager.SQUARE;
};

Player.prototype = new Entity();

Player.prototype.rememberResets = function () {
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
};

// clear player from powerup
Player.prototype.clearHasPowerup = function () {
    this.hasPowerUp = false;
}

Player.prototype.KEY_LEFT   = keyCode('A');
Player.prototype.KEY_RIGHT  = keyCode('D');

Player.prototype.KEY_FIRE   = keyCode(' ');

// Initial, inheritable, default values

Player.prototype.cx = 200;
Player.prototype.cy = 200;
    
Player.prototype.update = function (du) {

    //Unregister and check for death
    spatialManager.unregister(this);

    // if player is dead, kill entity
    if (this._isDeadNow) {
        return entityManager.KILL_ME_NOW;
    }

    this.updatePlayer();
    // Handle firing
    this.maybeFireBullet();

    
    var entities = this.findHitEntity();
    var player = this; // JavaScript is unable to recognize 'this' in the function below
    
    // Entities that are colliding with player
    entities.forEach(function(entity) {
      /* if player collides with powerup */
        if(entity instanceof PowerUp) { 
            powerUp.play();
            // set powerup
            player.powerUp = entity;
            player.hasPowerUp = true;
            // check which powerup the player gets
            entityManager.checkPowerUp(entity, player);
            // powerup takehit function
            entity.takeHit();
        }
    });

    spatialManager.register(this);
    
};

// player loses extra life powerup
Player.prototype.clearExtraLife = function () {
    this.extraLife = false;
}

// if the Player takes a hit from a ball
Player.prototype.takeHit = function () {
    // if the player has extra life powerup, he loses the powerup
    // else player looses life.
    if(this.extraLife) {
        this.extraLife = false;
    } else {
        lives--;
    }
    takeHit.play();
    RESET = true;
    this.hasPowerUp = false;
    //clear powerup if any 
    entityManager.clearPowerUp();
};

// if player gets an extra life powerup
Player.prototype.getExtraLife = function () {
    this.extraLife = true;
};

// hanlder for when the player presses the shoot button
Player.prototype.maybeFireBullet = function () {
    if(eatKey(this.KEY_FIRE)) {
        entityManager.fireBullet(this.cx, this.cy-this.getRadius());
    }
};

// get the half width for the spatial manager
Player.prototype.getSpatialHalfWidth  = function () {
    return 30;
};

// get the half height for the spatial manager
Player.prototype.getSpatialHalfHeight  = function () {
    return 40;
};

// get radius of the sprite
Player.prototype.getRadius  = function () {
    return this.sprite.width;
};

// reset the player to orignal pos
Player.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy, this.lives);
};

// record which powerup the player gets
Player.prototype.getPowerUp = function () {
    return this.powerUp;
}

// update the movement of the player 
Player.prototype.updatePlayer = function (du) {
    var haltflag = true;
    if (keys[this.KEY_LEFT]) { // going left
        haltflag = false;
        if (this.cx == 30) {
            this.cx = this.cx;
        } else {
            this.cx -= 5;
        }
        this.sprite = g_sprites.playerLeft; // the left sprite
    }
    if (keys[this.KEY_RIGHT]) { // going right
        haltflag = false;
        if (this.cx == g_canvas.width-30) {
            this.cx = this.cx;
        } else {
            this.cx += 5;
        }
        this.sprite = g_sprites.playerRight; // the right sprite
    }
    if(haltflag) {
      this.sprite = g_sprites.player; // if halted the halted sprite
    }
};

// draw the powerup that the player has on the screen
Player.prototype.drawPowerUp = function (ctx) {
   var sprite = this.powerUp.getSprite();
   sprite.drawCentredAt(
    ctx, 900, 50);

}

Player.prototype.render = function (ctx) {
    var origScale = this.sprite.scale;
    // pass my scale into the sprite, for drawing
    this.lives = 5;
    this.sprite.scale = this._scale;
    this.sprite.scale = origScale;
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    // if player has a powerup then draw it on the screen
    if(this.hasPowerUp){
        this.drawPowerUp(ctx);
    }
    
    // draw the player
    this.sprite.drawCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

};
