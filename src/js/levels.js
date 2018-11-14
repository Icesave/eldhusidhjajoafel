// ======
// Levels 
// ======

"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

/*
Array that contains the levels. Each level has certain features 
that the createLevel function uses to generate a level. 
*/

var Levels = [
    {
        title: "Level 1",
        backgroundColor: "#00ccff", // blue (bara dæmi, þarf ekki að vera)
        balls: [[600,200,2,-10]],  
        bricks: []
    }, 
    {
        title: "Level 2", 
        backgroundColor: "#99ff66", // green
        balls: [[200,200,2,-10],[600,200,2,-10]],
        bricks: []
    },
    {
        title: "Level 3",
        backgroundColor: "#ff6666", // pink
        balls: [[250,200,2,-10],[300,200,2,-10],[600,200,2,-10],[900,150,2,-10]],
        bricks: [[900, 200, 100, 4, true],[800,100, 4, 100, false]]                                       
    },
    {
        title: "Level 4",
        backgroundColor: "", //??  
        balls: [[200,200,2,-10],[300,200,2,-10],[600,200,2,-10],[900,150,2,-10]],  
        bricks: [[100, 200, 100, 4],[250,100, 100, 4],[400,200, 100, 4],[550,200, 100, 4],[700,200, 100, 4],[850,200, 100, 4]]
    }
];

var INDEX = 0;  // This should be used to change levels 

/*
Creates levels with the information from the levels array
*/

function createLevel(levelIndex) { 

    ctx.clearRect(0,0,canvas.width, canvas.height);    
    entityManager.generatePlayer({cx:500, cy:520});  // (500,520)

    levelIndex.balls.forEach(function(element) {
        entityManager.generateBall(element);      
    });

    if (levelIndex.bricksOn === true) {
        levelIndex.bricks.forEach(function(element) {
            entityManager.generateBrick(element);      
        });
    }
}

/*
Functions to level up/down, haven't been connected to anything yet
*/

function levelUp() {
    index++;
    createLevel(levelIndex);
}

function levelDown() {
    index--;
    createLevel(levelIndex);
}