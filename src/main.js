// Import the cocos2d module
var cocos  = require('cocos2d')
  , events = require('events')
  , geom   = require('geometry')
  , Player = require('/Player')
  , Bullet = require('/Bullet')

function bearing (point, target) {
	return Math.atan2(point.y - target.y, target.x - point.x);
}

function Schpitz () {
    // You must always call the super class version of init
    Schpitz.superclass.constructor.call(this)

    this.isMouseEnabled = true
    this.isKeyboardEnabled = true

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

	keyDown: function (evt) {
        var player = this.player,
        	velocity = player.velocity;

        switch (evt.keyCode) {
       	case 87:
       		velocity.y = -10;
        	break;
	   	case 65:
	   		velocity.x = -10;
        	break;
	   	case 83:
	   		velocity.y = 10;
        	break;
	   	case 68:
	   		velocity.x = 10;
        	break;
        }

        player.velocity = velocity;
    },

    keyUp: function () {
    	var player = this.player;

    	player.velocity = new geom.Point(0, 0);
    },

    mouseDown: function (evt) {
    	var player = this.player,
    		center = player.position,
    		target = evt.locationInCanvas,
    		angle = bearing(center, target),
    		bullet = new Bullet();

    	bullet.position = center;
    	bullet.velocity = new geom.Point(100 * Math.cos(angle), 100 * Math.sin(angle));

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
