// ============
// BRICK STUFF
// ============

// COMMON BRICK STUFF

// A generic contructor which accepts an arbitrary descriptor object
function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will serve as
// shared defaults, in the absence of an instance-specific overrides.
Brick.prototype.halfWidth = 50;
Brick.prototype.halfHeight = 4;

Brick.prototype.update = function () {
    // TODO 
};

Brick.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);                          
};

// Geyma?

/* 
Brick.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    varBrickEdge = this.cx;
    // Check X coords
    if ((nextX - r <BrickEdge && prevX - r >=BrickEdge) ||
        (nextX + r >BrickEdge && prevX + r <=BrickEdge)) {
        // Check Y coords
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};
*/ 

//Brick 1

var gBrick1 = newBrick({
    cx : 50,
    cy : 100,             
});

//Brick 2

var gBrick2 = newBrick({
    cx : 260,
    cy : 200,                  
});