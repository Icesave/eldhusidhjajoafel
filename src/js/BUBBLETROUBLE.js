// =========
// BUBBLE TROUBLE
// =========
/*

   Look at README.md for info about the game.


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
    if (GAME_MODE === 1) {
        processDiagnostics();
        entityManager.update(du);

        /* Set the current level */
        if (eatKey(LEVEL1)) { RESET = true; INDEX = 0; };
        if (eatKey(LEVEL2)) { RESET = true; INDEX = 1; };
        if (eatKey(LEVEL3)) { RESET = true; INDEX = 2; };
        if (eatKey(LEVEL4)) { RESET = true; INDEX = 3; };
        if (eatKey(LEVEL5)) { RESET = true; INDEX = 4; };

        util.setBackground(Levels[INDEX]["background"]); // Set the background
        if (RESET) { // resets the level
            entityManager._level = Levels[INDEX];
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

var TOGGLE_DEBUGMODE = keyCode('M');

var INFO = keyCode('I');
var KILL = keyCode('K');

function processDiagnostics() {
    // Debug mode proccess
    if (eatKey(TOGGLE_DEBUGMODE)) {
        g_debugMode = !g_debugMode;
        if (g_debugMode) {
            console.log("===========================");
            console.log("DEBUG MODE - " + g_debugMode);
            console.log("1 = Set the current level to 1");
            console.log("2 = Set the current level to 2");
            console.log("3 = Set the current level to 3");
            console.log("4 = Set the current level to 4");
            console.log("5 = Set the current level to 5");
            
            console.log("R = Reset the level");
            console.log("X = Render the collision forms");

            console.log("I = See info about all the current entities");
            console.log("K = Destroy a ball");

            console.log("T = Toggle timer");
            console.log("Q = Quit the game");

            console.log("C = Toggle clear canvas before each render");
            console.log("B = Toggle back box - Double buffer box");
            console.log("U = Toggle undo box - Double buffer box");
            console.log("F = Flipity flop boxes");
            console.log("N = Toggle rendering");

            console.log("P = Pause the game");
            console.log("O = Step one step");
            

            console.log("---------------------------");
        }
    }
    if (g_debugMode) {
        if (eatKey(INFO)) { // Get info about all entities
            console.log("DEBUG: All Entities");
            entityManager.allEntities().forEach(function (entity) {
                console.dir(entity);
            });
            console.log("---------------------------");
        }
        if (eatKey(KILL)) { // Kill a ball
            console.log("DEBUG: Kill ball");
            if (entityManager._balls.length > 0) {
                entityManager._balls[0].takeHit();
            }
            console.log("---------------------------");
        }
    }

    if (eatKey(KEY_SPATIAL) && g_debugMode) {
        g_renderSpatialDebug = !g_renderSpatialDebug;
    }

    if (eatKey(KEY_RESET) && g_debugMode) {
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
    var oldfont = ctx.font;
    ctx.font = "30px Arial";
    var life = "Extra lives: "
    ctx.fillText(life, 30, 50);

    for (var i = 0; i < lives; i++) {
        util.fillCircle(ctx, 200 + 30 * i, 42, 8);
    }
    ctx.font = oldfont;
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        // images
        player: "imgs/Demon/demonBack.png",
        playerRight: "imgs/Demon/demonSide.png",
        playerLeft: "imgs/Demon/demonLeft.png",
        ball: "imgs/bubbleboi.png",
        bullet: "imgs/pitchfork.png",

        lifePu: "imgs/PowerUps/HeartPu.png",
        bulletPu: "imgs/PowerUps/BulletPu.png",
        bulletPlusPu: "imgs/PowerUps/PulletPlusPu.png",
        stopPu: "imgs/PowerUps/StopPu.png",

        menuDemon: "imgs/Demon/demonFront.png",
        menuBg: "imgs/Backgrounds/menuBg.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.playerLeft = new Sprite(g_images.playerLeft);
    g_sprites.playerRight = new Sprite(g_images.playerRight);
    g_sprites.player = new Sprite(g_images.player);


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
