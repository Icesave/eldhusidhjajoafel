// ======
// Levels 
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
Array that contains the levels. Each level has certain features 
that the createLevel function uses to generate a level. 
*/

var index = 0;
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
        bricks: false;
    }, 
    {
        title: "Level 2",
        backgroundColor: "#99ff66", // green
        ballNum: 2,
        ballCX: 600,
        ballCY: 200,
        ballXvel: 2,
        ballYvel: -10,
        bricks: false;
    },
    {
        title: "Level 3",
        backgroundColor: "#ff6666", // pink
        ballNum: 4,
        ballCX: 600,
        ballCY: 200,
        ballXvel: 2,
        ballYvel: -10,
        bricks: true;
        brick1CX: 650,  // create a box in the right
        brick1CY: 200,  // corner to trap the balls
        brick2CX: 550,
        brick2CY: 100
    }
];

// Maybe we want to put this into the entityManager instead? 

/*
Creates levels with the information from the levels array
*/

function createLevel(levelIndex) { 
    
    if(levelIndex.ballNum = 1) { 
        entityManager.generateBall(levelIndex.ballCX,levelIndex.ballCY,levelIndex.ballXvel,levelIndex.ballYvel);
    }
    if (levelIndex.ballnum > 1) {
        for(i = 0; i < levelIndex.ballNum; i++) {
            entityManager.generateBall(levelIndex.ballCX,levelIndex.ballCY,levelIndex.ballXvel,levelIndex.ballYvel);
            levelIndex.ballCX + 50; 
    }

    if(levelIndex.bricks === true) {
        // TODO: make it possible to generate a brick with cx and cy 
        entityManager.generateBrick(levelIndex.brick1CX,levelIndex.brick1CY);
        entityManager.generateBrick(levelIndex.brick2CX,levelIndex.brick2CY, halfWidth = 4, halfHeight = 100);
    }

    }
}