// ======
// Levels 
// ======

"use strict";
/* jshint browser: true, devel: true, globalstrict: true */

// Global variable used to change the levels
var INDEX = 0;  

/*
Array that contains the levels. Each level has certain features 
that the entityManager then uses to generate a level.  
*/
var Levels = [
    {
        title: "Level 1",
        background: "imgs/Backgrounds/cavebg.png", 
        balls: [[600, 250, 2, -10]],  
        bricks: []
    }, 
    {
        title: "Level 2", 
        background: "imgs/Backgrounds/Icebg.png",
        balls: [[200, 250, 2, -10],
                [800, 250, -2, -10]],
        bricks: []
    },
    {
        title: "Level 3",
        background: "imgs/Backgrounds/Hellbg.png",
        balls: [[250, 200, -2, -10],
                [550, 200, 2, -10],
                [825, 150, 2, -10]],
        bricks: [[850, 200, 150, 8, true],
                 [700, 100, 8, 108, false]]                                       
    },
    {
        title: "Level 4",
        background: "imgs/Backgrounds/toxicbg.png",  
        balls: [[200, 200, 2, -10],
                [400, 200, 2, -10],
                [600, 200, 2, -10],
                [800, 200, 2, -10]],  
        bricks: [[87.5, 250, 37.5, 8, true],
                 [212.5, 250, 37.5, 8, true],
                 [350, 250, 50, 8, false],
                 [500, 250, 50, 8, true],
                 [650, 250, 50, 8, false],
                 [787.5, 250, 37.5, 8, true],
                 [915.5, 250, 37.5, 8, true]]
    },
    {
        title: "Level 5", 
        background: "imgs/Backgrounds/candylandbg.png",
        balls: [[175, 150, 2, -10],
                [500, 150, 2, -10],
                [650, 325, -2, -10],
                [825, 150, 2, -10]],
        bricks: [[164, 208, 164, 8, true],
                 [500, 208, 156, 8, true],
                 [836, 208, 164, 8, true],
                 [664, 108, 8, 108, false],
                 [336, 108, 8, 108, false]]
    }
];
