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
// Add these properties to the prototype, where they will serve as
// shared defaults, in the absence of an instance-specific overrides.

Brick.prototype.getSpatialHalfWidth  = function () {
    return this.spatialHalfWidth;
};

Brick.prototype.getSpatialHalfHeight  = function () {
    return this.spatialHalfHeight;
};

Brick.prototype.update = function () {
    spatialManager.unregister(this);

    if (this._isDeadNow) return entityManager.KILL_ME_NOW;
    
    spatialManager.register(this);
};

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

Brick.prototype.takeHit = function() {
    if(this.breakable) {
        this.kill();
    }
}