/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

"use strict";

/* 
  * spatialManager.js - Object
  * Author: Elvar (eas20)
  * General collision detection of the game
*/

var spatialManager = {

  // ==============
  // "PRIVATE" DATA
  // ==============

  _nextSpatialID: 1, // First enity gets 1 as ID

  _entities: [],

  // =================
  // "PRIVATE" METHODS
  // =================

  /* 
    * _collide(e1, e2)
    * Checks if 2 entities are colliding with each other 
    * 
    * @param  e1  Entity number 1
    * @param  e2  Entity number 2
    * @return     Whether or not the 2 entities are colliding
  */
  _collide: function(e1, e2) {
    var x1 = e1.getPos().posX,
      x2 = e2.getPos().posX,
      y1 = e1.getPos().posY,
      y2 = e2.getPos().posY,
      r1 = e1.getRadius(),
      r2 = e2.getRadius();

    // Equation to calculate if 2 entities are colliding
    return util.square(x2 - x1) + util.square(y1 - y2) <= util.square(r1 + r2);
  },

  // ==============
  // PUBLIC METHODS
  // ==============

  /* 
    * getNewSpatialID()
    * Generate a new ID and returns it 
    * 
    * @return   New ID
  */
  getNewSpatialID: function() {
    return this._nextSpatialID++; // Returns id before increment
  },

  /* 
    * register(entity)
    * Register a entity in the _enities array
    * 
    * @param  entity  Entity that is getting registered
  */
  register: function(entity) {
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;
  },

  /* 
    * unregister(entity)
    * Unegister a entity from the _entities array
    * 
    * @param  entity  Entity that is getting unregistered
  */
  unregister: function(entity) {
    var spatialID = entity.getSpatialID();
    delete this._entities[spatialID];
  },

  /* 
    * findEntityInRange(e1)
    * Find every entity that is colliding with single entity
    * 
    * @param  e1  The entity that is getting a collision test
    * @return     Array of entities that is colling with e1
  */
  findEntityInRange: function(e1) {
    var res = [];
    // Iterate through all the registered entities
    this._entities.forEach(function(e2) {
      if(spatialManager._collide(e1, e2)) {
        res.push(e2); // Collision found!
      }
    });
    return res;
  },

  /* 
    * findEntityInRange(e1)
    * Find every entity that is colliding with single entity
    * 
    * @param  e1  The entity that is getting a collision test
    * @return     Array of entities that is colling with e1
  */
  findEntityInRange: function(e1) {
    var res = [];
    // Iterate through all the registered entities
    this._entities.forEach(function(e2) {
      if(spatialManager._collide(e1, e2)) {
        res.push(e2); // Collision found!
      }
    });
    return res;
  },

  /* 
    * render(ctx)
    * Render a red circle to indicate the collision area of all the objects
    * 
    * @param  ctx   The canvas
  */
  render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    // Iterate through all the registered entities
    this._entities.forEach(function(e) {
      util.strokeCircle(ctx, e.getPos().posX, e.getPos().posY, e.getRadius());
    });

    ctx.strokeStyle = oldStyle;
  }
}
