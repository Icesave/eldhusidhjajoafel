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

var TOGGLE_CLEAR = keyCode('C');
var TOGGLE_BOX = keyCode('B');
var TOGGLE_UNDO_BOX = keyCode('U');
var TOGGLE_FLIPFLOP = keyCode('F');
var TOGGLE_RENDER = keyCode('N');

/* 
  * render(ctx)
  * Render the game with debug options
  * 
  * @param  ctx   The canvas
*/
function render(ctx) {

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
  }

  // To clear or not to clear 
  if(g_doClear) { 
    util.clearCanvas(ctx);
    ctx.drawImage(g_background,0,0);
  }

  // Box to demonstrate that it is always 
  // deleted by the subsequent "undo"
  if(g_doBox) {
    util.fillBox(ctx, 200, 200, 50, 50, "red");
  }

  // Render the game
  if(g_doRender) { 
    renderSimulation(ctx);
  }


  // Check if the game is in sync with the flipity floppy box
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