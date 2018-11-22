"use strict";

/**
  * menu.js
  * Author: Freyja (frs24) 
  * The menu of the game
*/
var menu = {

  /**
   * renderMenu()
   * Render the main menu at the start of game
   */
renderMenu : function() {
  util.fillBox(ctx,0,0,1000,600,"#808080");
  ctx.drawImage(g_images.menuBg, 0, 0);
  ctx.drawImage(g_images.menuDemon, 600, 100);

  ctx.font = "50px Arial";
  ctx.fillStyle = "pink";
  ctx.fillText("BubbleTrouble", 100, 180);
  ctx.fillText("Press Y to play game", 100,250);

  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("HOW TO:", 100, 350);
  ctx.fillText("Shoot: Press space", 100, 400);
  ctx.fillText("Move player right: Press 'D'", 100, 440);
  ctx.fillText("Move player left: Press 'A'", 100, 480);
  },

  /**
   * renderGameOverMenu()
   * Render the game over menu when player has lost the game 
   */
  renderGameOverMenu : function() {
    util.fillBox(ctx,0,0,1000,600,"#808080");
    ctx.drawImage(g_images.menuBg, 0, 0);
    ctx.drawImage(g_images.menuDemon, 600, 100);
  
    ctx.font = "50px Arial";
    ctx.fillStyle = "pink";
    ctx.fillText("GAME OVER", 100, 180);
    ctx.fillText("Press Y to play game", 100,250);
  
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("HOW TO:", 100, 350);
    ctx.fillText("Shoot: Press space", 100, 400);
    ctx.fillText("Move player right: Press 'D'", 100, 440);
    ctx.fillText("Move player left: Press 'A'", 100, 480);
    },

    /**
     * renderGameWinMenu()
     * Render the game won menu when player has won the game
     */
    renderGameWinMenu : function() {
      util.fillBox(ctx,0,0,1000,600,"#808080");
      ctx.drawImage(g_images.menuBg, 0, 0);
      ctx.drawImage(g_images.menuDemon, 600, 100);
    
      ctx.font = "50px Arial";
      ctx.fillStyle = "pink";
      ctx.fillText("YOU WON!", 100, 180);
      ctx.fillText("Press Y to play game", 100,250);
    
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("HOW TO:", 100, 350);
      ctx.fillText("Shoot: Press space", 100, 400);
      ctx.fillText("Move player right: Press 'D'", 100, 440);
      ctx.fillText("Move player left: Press 'A'", 100, 480);
      },
};
