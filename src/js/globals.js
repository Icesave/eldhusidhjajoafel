// =======
// GLOBALS
// =======
/*

Evil, ugly (but "necessary") globals, which everyone can use.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");
var g_background = new Image;



 // GAME_MODE = 0 : menu,
 // GAME_MODE = 1 : play game,
 // GAME_MODE = 2 : game over,
 // GAME_MODE = 3 : game won
var GAME_MODE = 0;


// Player's extra lives
var lives = 5;


// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
//
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Multiply by this to convert seconds into "nominals"
var SECS_TO_NOMINALS = 1000 / NOMINAL_UPDATE_INTERVAL;