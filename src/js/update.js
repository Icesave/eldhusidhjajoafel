/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

"use strict";

/* 
  * update.js
  * Author: Elvar (eas20) - But most copied from Pat 
  * Generic updating of the game
*/

// The "nominal interval" is the one that all of our time-based units are
// calibrated to e.g. a velocity unit is "pixels per nominal interval"
var NOMINAL_UPDATE_INTERVAL = 16.666;

// Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
var g_prevUpdateDt = null;

// Du means "delta u", where u represents time in multiples of our nominal interval
var g_prevUpdateDu = null;

// Track odds and evens for diagnostic / illustrative purposes
var g_isUpdateOdd = false;


function update(dt) {

    // Get out if skipping (e.g. due to pause-mode)
    if (shouldSkipUpdate()) {
        return;
    }

    var original_dt = dt;

    // Warn about very large dt values -- they may lead to error
    if (dt > 200) {
        console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
        dt = NOMINAL_UPDATE_INTERVAL;
    }

    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    var du = (dt / NOMINAL_UPDATE_INTERVAL);

    updateSimulation(du);

    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;

    g_isUpdateOdd = !g_isUpdateOdd;
}

// Togglable Pause Mode
var KEY_PAUSE = keyCode('P');
var KEY_STEP = keyCode('O');

var TOGGLE_DEBUGMODE = keyCode('M');

var INFO = keyCode('I');
var KILL = keyCode('K');


var g_isUpdatePaused = false;

function shouldSkipUpdate() {
    // Process various option toggles
    if (eatKey(TOGGLE_DEBUGMODE)) {
        g_debugMode = !g_debugMode;
        if (g_debugMode) {
            console.log("===========================");
            console.log("DEBUG MODE - " + g_debugMode);
            console.log("T = Toggle timer");
            console.log("Q = Quit the game");

            console.log("I = See info about all the current entities");
            console.log("K = Destroy a ball");
            console.log("C = Toggle clear canvas before each render");
            console.log("B = Toggle back box - Double buffer box");
            console.log("U = Toggle undo box - Double buffer box");
            console.log("F = Flipity flop boxes");
            console.log("Y = Toggle rendering");

            console.log("P = Pause the game");
            console.log("O = Step one step");

            console.log("X = Toggle collision circle");
            console.log("H = Halt the game");
            console.log("R = Restart the game");

            console.log("---------------------------");
        }
    }
    if (eatKey(KEY_PAUSE) && g_debugMode) {
        g_isUpdatePaused = !g_isUpdatePaused;
    }
    return g_isUpdatePaused && !eatKey(KEY_STEP) && g_debugMode;
}