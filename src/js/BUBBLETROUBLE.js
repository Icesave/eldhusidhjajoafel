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
    if(GAME_MODE === 1) {
        processDiagnostics();
        entityManager.update(du);
    }    

    // Prevent perpetual firing!
    //eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

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
    if (GAME_MODE === 0) {
        menu.renderMenu();
    }
    if (GAME_MODE === 1) {
        entityManager.render(ctx);
    }
    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        // TODO: use another image for player
        player   : "imgs/demonback.png",
        playerRight : "imgs/demonSide.png",
        playerLeft : "imgs/demonLeft.png",
        ball     : "imgs/bubbleboi.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.playerLeft  = new Sprite(g_images.playerLeft);
    g_sprites.playerRight  = new Sprite(g_images.playerRight);
    g_sprites.player  = new Sprite(g_images.player);
    

    g_sprites.bullet = new Sprite(g_images.ball);

    g_sprites.ball = new Sprite(g_images.ball);

    
    g_sprites.playerleft.scaley = 1;
    g_sprites.playerleft.scale = -1;
    g_sprites.bullet.scale = 0.1;

    entityManager.init();
    createInitialPlayer();

    main.init();
}

// Kick it off
requestPreloads();
