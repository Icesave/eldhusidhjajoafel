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


// =================
// UPDATE SIMULATION
// =================


// GAME-SPECIFIC UPDATE LOGIC

var RESET = false;
var LEVEL1 = keyCode('1');
var LEVEL2 = keyCode('2');
var LEVEL3 = keyCode('3');
var LEVEL4 = keyCode('4');
var LEVEL5 = keyCode('5');

function updateSimulation(du) {
    if(GAME_MODE === 1) {
        processDiagnostics();
        entityManager.update(du);
        if(eatKey(LEVEL1)) { RESET = true; INDEX = 0; };
        if(eatKey(LEVEL2)) { RESET = true; INDEX = 1; };
        if(eatKey(LEVEL3)) { RESET = true; INDEX = 2; };
        if(eatKey(LEVEL4)) { RESET = true; INDEX = 3; };
        if(eatKey(LEVEL5)) { RESET = true; INDEX = 4; };
        entityManager._level = Levels[INDEX];
        util.setBackground(Levels[INDEX]["background"]);
        if(RESET) {
            entityManager.reset();
            spatialManager.reset();
            RESET = false;
        }
    }   
}

// GAME-SPECIFIC DIAGNOSTICS

var g_renderSpatialDebug = false;

var KEY_SPATIAL = keyCode('X');

var KEY_RESET = keyCode('R');

function processDiagnostics() {

    if(eatKey(KEY_SPATIAL) && g_debugMode) {
        g_renderSpatialDebug = !g_renderSpatialDebug;
    }

    if(eatKey(KEY_RESET) && g_debugMode) {
        RESET = true;
    }

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
    // Render main menu 
    if (GAME_MODE === 0) {
        gameSong.pause();
        menu.renderMenu();
    }
    // Render game and play game song
    if (GAME_MODE === 1) {
        gameSong.play();
        entityManager.render(ctx);
        renderLife(ctx);
    }
    // Render game over menu 
    if (GAME_MODE === 2) {
        gameSong.pause();
        menu.renderGameOverMenu();
    }
    // Render game won menu
    if (GAME_MODE === 3) {
        gameSong.pause();
        menu.renderGameWinMenu();
    }

    if (g_renderSpatialDebug) {
        spatialManager.render(ctx);
    }
}

// Render remaining life count
function renderLife(ctx) {
    var life = "Extra lives: "
    ctx.fillText(life, 30, 50);
    
    for (var i = 0; i < lives; i++) {
        util.fillCircle(ctx, 200 + 30*i, 42, 8);
    }
  }


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        // images
        player   : "imgs/Demon/demonBack.png",
        playerRight : "imgs/Demon/demonSide.png",
        playerLeft : "imgs/Demon/demonLeft.png",
        ball     : "imgs/bubbleboi.png",
        bullet : "imgs/pitchfork.png",
       
        lifePu : "imgs/PowerUps/HeartPu.png",
        bulletPu : "imgs/PowerUps/BulletPu.png",
        bulletPlusPu : "imgs/PowerUps/PulletPlusPu.png",
        stopPu : "imgs/PowerUps/stopPu.png",
       
        menuDemon : "imgs/Demon/demonFront.png",
        menuBg : "imgs/Backgrounds/menuBg.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.playerLeft  = new Sprite(g_images.playerLeft);
    g_sprites.playerRight  = new Sprite(g_images.playerRight);
    g_sprites.player  = new Sprite(g_images.player);
    

    g_sprites.bullet = new Sprite(g_images.bullet);
    g_sprites.powerup = new Sprite(g_images.player);

    g_sprites.ball = new Sprite(g_images.ball);

    g_sprites.lifePu = new Sprite(g_images.lifePu);
    g_sprites.bulletPu = new Sprite(g_images.bulletPu);
    g_sprites.bulletPlusPu = new Sprite(g_images.bulletPlusPu);
    g_sprites.stopPu = new Sprite(g_images.stopPu);


    g_sprites.powerup.scale = 0.5;

    entityManager.init();

    main.init();
}

// Kick it off
requestPreloads();
