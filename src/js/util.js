// util.js
//
// A module of utility functions, with no private elements to hide.
// An easy case; just return an object containing the public stuff.

"use strict";


var util = {

// RANDOMNESS
// ==========

randRange: function(min, max) {
    return (min + Math.random() * (max - min));
},


// MISC
// ====

square: function(x) {
    return x*x;
},

// CANVAS OPS
// ==========

setBackground: function (imgUrl) {
    g_background.src = imgUrl;
},

clearCanvas: function (ctx) {
    var prevfillStyle = ctx.fillStyle;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = prevfillStyle;
},

strokeCircle: function (ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
},

strokeBox: function (ctx, x, y, w, h) {
    ctx.beginPath();
    ctx.strokeRect(x, y, w, h);
    ctx.stroke();
},

fillBox: function (ctx, x, y, w, h, style) {
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = style;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = oldStyle;
},

fillCircle: function(ctx, x, y, r, color) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}
};
