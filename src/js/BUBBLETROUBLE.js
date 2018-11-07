// =========
// BUBBLE TROUBLE
// =========
/*

   TODO:  LÝSING Á LEIKNUM.


*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL Player
// ====================

function createInitialPlayer() {

   entityManager.generatePlayer({
       cx : 200,
       cy : 520
   });
   
}


// =================
// UPDATE SIMULATION
// =================


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_RESET)) entityManager.resetPlayer();

}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        // TODO: use another image for player
        player   : "imgs/backthick.png",
        ball     : "imgs/ball.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.player  = new Sprite(g_images.player);
    

    g_sprites.bullet = new Sprite(g_images.ball);

    g_sprites.ball = new Sprite(g_images.ball);

    g_sprites.bullet.scale = 0.1;

    entityManager.init();
    createInitialPlayer();

    main.init();
}

// Kick it off
requestPreloads();