// ============
// SPRITE STUFF
// ============

/* 
  * Sprite.js - Entity Object
  * Author: Sigríður (sos42) - Functions taken from previous project
  * Sprites registered and drawn
  * 
*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


/* 
    * function Sprite(image)
    * Registers a sprite from a given image
    * 
    * @param  image  
*/
function Sprite(image) {
    this.image = image;

    this.width = image.width;
    this.height = image.height;
    this.scale = 1;
}

/* 
    * function drawCenteredAt
    * Draws a given sprite centered at coordinates cx and cy, with
    * the given rotation.
    * 
    * @param  ctx, cx, cy, rotation 
*/
Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scaley||this.scale);

    ctx.drawImage(this.image, 
                  -w/2, -h/2);
    
    ctx.restore();
};  

