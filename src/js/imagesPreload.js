// Multi-Image Preloader

"use strict";

/*jslint browser: true, devel: true, white: true */

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


/* 
    * asyncLoad function(src, asyncCallback)
    * Extend the Image prototype with asyncLoad wrapper.
    * 
    * @param  src, asyncCallback
*/
Image.prototype.asyncLoad = function(src, asyncCallback) {
    
    // Callback handlers assigned
    this.onload = asyncCallback;
    this.onerror = asyncCallback;
    
    // `this.src` is set
    console.log("requesting image src of ", src);
    this.src = src;
};


/* 
    * imagesPreload(requiredImages, loadedImages, completionCallback)
    * Images preloaded
    * 
    * @param  requiredImages, loadedImages, completionCallback
*/
function imagesPreload(requiredImages,
                       loadedImages,
                       completionCallback) {

    var numImagesRequired,
        numImagesHandled = 0,
        currentName,
        currentImage,
        preloadHandler;

    // `requiredImages` counted by using `Object.keys` to get all 
    // "*OWN* enumerable properties"
    numImagesRequired = Object.keys(requiredImages).length;

    // A handler to be be called when the required images are loaded
    // or fail to load
    preloadHandler = function () {

        console.log("preloadHandler called with this=", this);
        loadedImages[this.name] = this;

        if (0 === this.width) {
            console.log("loading failed for", this.name);
        }

        // Allow this handler closure to eventually be GC'd 
        this.onload = null;
        this.onerror = null;

        numImagesHandled += 1;

        if (numImagesHandled === numImagesRequired) {
            console.log("all preload images handled");
            console.log("loadedImages=", loadedImages);
            console.log("");
            console.log("performing completion callback");

            completionCallback();

            console.log("completion callback done");
            console.log("");
        }
    };

    for (currentName in requiredImages) {

        // Skip inherited properties from the prototype chain        
        if (requiredImages.hasOwnProperty(currentName)) {
            
            console.log("preloading image", currentName);
            currentImage = new Image();
            currentImage.name = currentName;

            currentImage.asyncLoad(requiredImages[currentName], preloadHandler);
        }
    }
}
