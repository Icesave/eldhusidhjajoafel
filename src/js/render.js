/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

"use strict";

/* 
  * render.js
  * Author: Elvar (eas20) - But most copied from Pat 
  * Generic rendering of the game
*/

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;
var g_debugMode = false; // Enables debug mode

var g_frameCounter = 1;

var INFO = 'I'.charCodeAt(0); 

var TOGGLE_DEBUGMODE = 'L'.charCodeAt(0);
var TOGGLE_CLEAR = 'C'.charCodeAt(0);
var TOGGLE_BOX = 'B'.charCodeAt(0);
var TOGGLE_UNDO_BOX = 'U'.charCodeAt(0);
var TOGGLE_FLIPFLOP = 'F'.charCodeAt(0);
var TOGGLE_RENDER = 'R'.charCodeAt(0);

/* 
  * render(ctx)
  * Render the game with debug options
  * 
  * @param  ctx   The canvas
*/
function render(ctx) {

  // Process various option toggles
  if(eatKey(TOGGLE_DEBUGMODE)) {
    g_debugMode = !g_debugMode;
    if(g_debugMode) {
      console.log("===========================");
      console.log("DEBUG MODE - " + g_debugMode);
      console.log("K = Destroy a ball closest to the mouse");
      console.log("C = Toggle clear canvas before each render");
      console.log("B = Toggle undo box");
      console.log("U = Toggle undo box");
      console.log("F =");
      console.log("R = Toggle");
      console.log("I = See info about all the current entities");
      console.log("X = Toggle collision circle");
      console.log("---------------------------");
    }
  }

  if(g_debugMode) { // Only allow debug option if debug mode is on
    if(eatKey(TOGGLE_CLEAR)) {
      g_doClear = !g_doClear;
    }
    if(eatKey(TOGGLE_BOX)) {
      g_doBox = !g_doBox;
    }
    if(eatKey(TOGGLE_UNDO_BOX)) {
      g_undoBox = !g_undoBox;
    }
    if(eatKey(TOGGLE_FLIPFLOP)) {
      g_doFlipFlop = !g_doFlipFlop;
    }
    if(eatKey(TOGGLE_RENDER)) {
      g_doRender = !g_doRender;
    }
    if(eatKey(INFO)) {
      console.log("DEBUG: All Entities");
      entityManager.allEntities().forEach(function(entity) {
        console.dir(+entity);
      });
      console.log("---------------------------");
    }
  }

  // To clear or not to clear 
  if(g_doClear) { 
    //util.clearCanvas(ctx);
  }

  // Box to demonstrate that it is always 
  // deleted by the subsequent "undo"
  if(g_doBox) {
    //util.fillBox(ctx, 200, 200, 50, 50, "red");
  }

  // Render the game
  if(g_doRender) { 
    //renderSimulation(ctx);
  }


  // Check if the game is in sync with the flipity flop box
  if(g_doFlipFlop) {
    var boxX = 250,
        boxY = g_isUpdateOdd ? 100 : 200;

    // Draw flip-flop box
    util.fillBox(ctx, boxX, boxY, 50, 50, "green");

    // Display the current frame-counter in the box...
    ctx.fillText(g_frameCounter % 1000, boxX + 10, boxY + 20);
    // ..and its odd/even status too
    var text = g_frameCounter % 2 ? "odd" : "even";
    ctx.fillText(text, boxX + 10, boxY + 40);
  }

  // Illustrate flicker-proof double-buffering
  if(g_undoBox) {
    ctx.clearRect(200, 200, 50, 50);
  }

  ++g_frameCounter;
}
