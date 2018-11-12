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

var index = 0;  // This should be used to change levels 
var levelIndex = Levels[index]; 

var Levels = [
    {
        title: "Level 1",
        backgroundColor: "#00ccff", // blue
        ballNum: 1,
        ballCX: 600,
        ballCY: 200,
        ballXvel: 2,
        ballYvel: -10,
        bricks: false
    }, 
    {
        title: "Level 2",
        backgroundColor: "#99ff66", // green
        ballNum: 2,
        ball1CX: 600,
        ball1CY: 200,
        ball2CX: 250,
        ball2CY: 200,
        ballXvel: 2,
        ballYvel: -10,
        bricks: false
    },
    {
        title: "Level 3",
        backgroundColor: "#ff6666", // pink
        ballNum: 4,
        ball1CX: 600,
        ball1CY: 100,
        ball2CX: 250,
        ball2CY: 200,
        ballXvel: 2,
        ballYvel: -10,
        bricks: true,
        brick1CX: 900,  // create a box in the right
        brick1CY: 200,  // corner to trap the balls
        brick2CX: 800,
        brick2CY: 100
    }
];


// Maybe we want to put this into the entityManager instead? 

/*
Creates levels with the information from the levels array
*/

function createLevel(levelIndex) { 
    
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

    if (levelIndex.bricks === true) {
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
}