var cocos = require('cocos2d'),
	geom = require('geometry'),
	util = require('util');

function Player () {
	Player.superclass.constructor.call(this)

	var sprite = new cocos.nodes.Sprite({
         file: '/resources/player.png',
         rect: new geom.Rect(0, 0, 16, 16)
     })

	sprite.anchorPoint = new geom.Point(0, 0)

	this.addChild({child: sprite})
	this.contentSize = sprite.contentSize
	this.velocity = new geom.Point(0, 0)
	this.scheduleUpdate()
}

Player.inherit(cocos.nodes.Node, {
    velocity: null,

    update: function (dt) {
        var pos = util.copy(this.position),
            vel = util.copy(this.velocity);

        pos.x += dt * vel.x;
        pos.y -= dt * vel.y;

        this.position = pos
        this.testEdgeCollision()
    },

    testEdgeCollision: function () {
        var vel = util.copy(this.velocity),
            box = this.boundingBox,
            // Get size of canvas
            winSize = cocos.Director.sharedDirector.winSize

        // Moving left and hit left edge
        if (vel.x < 0 && geom.rectGetMinX(box) < 0) {
            // Flip Y velocity
            vel.x *= -1
        }

        // Moving right and hit right edge
        if (vel.x > 0 && geom.rectGetMaxX(box) > winSize.width) {
            // Flip X velocity
            vel.x *= -1
        }

        // Moving up and hit top edge
        if (vel.y < 0 && geom.rectGetMaxY(box) > winSize.height) {
            // Flip X velocity
            vel.y *= -1
        }

        // Moving down and hit bottom edge - DEATH
        if (vel.y > 0 && geom.rectGetMaxY(box) < 0) {
            // Restart game
            this.parent.restart()
        }

        this.velocity = vel
    }
})

module.exports = Player
