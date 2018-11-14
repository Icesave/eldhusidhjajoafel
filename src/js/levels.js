// ======
// Levels 
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
Array that contains the levels. Each level has certain features 
that the createLevel function uses to generate a level. 
*/

// TO DO: implement some kind of method to choose a level, where to put it?


//==============================
function levelUp() {
    index++;
    createLevel(levelIndex);
}

function levelDown() {
    index--;
    createLevel(levelIndex);
}
//===============================

var Levels = [
    {
        title: "Level 1",
        backgroundColor: "#00ccff", // blue (dæmi)
        balls: [[{cx:600,cy:200,xVel:2,yVel:-10}]], //???? eða án cx... 
        bricksOn: false
    }, 
    {
        title: "Level 2",
        backgroundColor: "#99ff66", // green
        balls: [[200,200,2,-10],[600,200,2,-10]],
        bricksOn: false
    },
    {
        title: "Level 3",
        backgroundColor: "#ff6666", // pink
        balls: [[250,200,2,-10],[600,200,2,-10],[300,200,2,-10],[500,200,2,-10]],       
        bricksOn: true,
        bricks: [[900, 200],[800,100]], // þarf ekki cx, cy??                                       
    }
];

var index = 0;  // This should be used to change levels 
var levelIndex = Levels[index]; 

// Maybe we want to put this into the entityManager instead? 

/*
Creates levels with the information from the levels array
*/

function createLevel(levelIndex) { 

    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    entityManager.generatePlayer({cx:200, cy:520});

    // ====================== ATH
    // Nota foreach lykkju á ball array til að búa til bolta. Sama með bricksOn
/*
    if (levelIndex.ballNum = 1) { 
        entityManager.generateBall(levelIndex.ballCX,levelIndex.ballCY,levelIndex.ballXvel,levelIndex.ballYvel);
    }
    if (levelIndex.ballNum = 2) {
        entityManager.generateBall(levelIndex.ball1CX,levelIndex.ball1CY,levelIndex.ballXvel,levelIndex.ballYvel);
        entityManager.generateBall(levelIndex.ball2CX,levelIndex.ball2CY,levelIndex.ballXvel,levelIndex.ballYvel); 
    }
    if (levelIndex.ballNum > 2) {
        entityManager.generateBall(levelIndex.ball1CX,levelIndex.ball1CY,levelIndex.ballXvel,levelIndex.ballYvel);
        entityManager.generateBall(levelIndex.ball2CX,levelIndex.ball2CY,levelIndex.ballXvel,levelIndex.ballYvel);
        var tempBallNum = levelIndex.ballNum - 2;
        for (i = 0; i < tempBallNum; i++) {
            entityManager.generateBall(levelIndex.ball1CX-50,levelIndex.ball1CY-50,levelIndex.ballXvel,levelIndex.ballYvel);
        }
    }
    */

    levelIndex.balls.forEach(function(element) {
        entityManager.generateBall(element);      
    });


    if (levelIndex.bricksOn === true) {
        levelIndex.bricks.forEach(function(element) {
            entityManager.generateBrick(element);      
        });

        /*
        entityManager.generateBrick({
                cx: levelIndex.brick1CX,
                cy: levelIndex.brick1CY,
                strokeStyle : "#790000",
                fillStyle : "#D20000"
        });
        entityManager.generateBrick({ 
                cx: levelIndex.brick2CX,
                cy: levelIndex.brick2CY, 
                halfWidth: 4,
                halfHeight: 100,
                strokeStyle : "#790000",
                fillStyle : "#D20000"
        }); 
        */
    }
}