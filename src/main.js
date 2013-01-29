// Import the cocos2d module
var cocos  = require('cocos2d')
  , events = require('events')
  , geom   = require('geometry')
  , Player = require('/Player')
  , Bullet = require('/Bullet')


function Schpitz () {
    // You must always call the super class version of init
    Schpitz.superclass.constructor.call(this)

    this.isMouseEnabled = true

    // Get size of canvas
    var s = cocos.Director.sharedDirector.winSize


    // Add Bat
    var player = new Player
    player.position = new geom.Point(160, s.height - 280)
    this.addChild(player)
    this.player = player
}

Schpitz.inherit(cocos.nodes.Layer, {
    player: null,
    bullets: null,

    mouseMoved: function (evt) {
        var player = this.player

        var playerPos = player.position
        playerPos.x = evt.locationInCanvas.x
        playerPos.y = evt.locationInCanvas.y
        player.position = playerPos
    },

    mouseDown: function (evt) {
    	var player = this.player,
    		position = player.position,
    		bullet = new Bullet();

    	bullet.position = position;
    	bullet.velocity = new geom.Point(0, 5);

    	this.addChild(bullet);
    },

    restart: function () {
        var director = cocos.Director.sharedDirector

        // Create a scene
        var scene = new cocos.nodes.Scene()

        // Add our layer to the scene
        scene.addChild(new Schpitz())

        director.replaceScene(scene)
    }
})

/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = cocos.Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , layer = new Schpitz()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
