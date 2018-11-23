// =====
// BRICK
// =====

// A generic contructor which accepts an arbitrary descriptor object
function Brick(descr) {
    this.setup(descr);
    this._spatialType = spatialManager.SQUARE;
    this.spatialHalfWidth = this.halfWidth;
    this.spatialHalfHeight = this.halfHeight;

    if(this.breakable) { // Breakable bricks are white 
        this.strokeStyle = "#790000";
        this.fillStyle = "080808";
    } 
    else { // Unbreakable bricks are grey
        this.strokeStyle = "#790000";
        this.fillStyle = "#808080";

    }
}

Brick.prototype = new Entity();

// get the halfwidth for the spatialmanager
Brick.prototype.getSpatialHalfWidth  = function () {
    return this.spatialHalfWidth;
};

// get the halfheight for the spatialmanager
Brick.prototype.getSpatialHalfHeight  = function () {
    return this.spatialHalfHeight;
};

// update the brick
Brick.prototype.update = function () {
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    spatialManager.register(this);
};

// render the brick
Brick.prototype.render = function (ctx) {
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.srokeStyle = this.strokeStyle;  
    ctx.fillRect(
      this.cx - this.halfWidth,
      this.cy - this.halfHeight,
      this.halfWidth * 2,
      this.halfHeight * 2);
    ctx.strokeRect(
      this.cx - this.halfWidth,
      this.cy - this.halfHeight,
      this.halfWidth * 2,
      this.halfHeight * 2);
    ctx.restore();
             
};

// handler for when the brick takes a hit
Brick.prototype.takeHit = function() {
    if(this.breakable) { // Only kill brick if 'killable'
        this.kill();
    }
}