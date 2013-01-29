var cocos = require('cocos2d'),
	geom = require('geometry'),
	util = require('util');

function Bullet () {
	Bullet.superclass.constructor.call(this)

    this.position = new geom.Point(0, 0);
    this.velocity = new geom.Point(0, 0);

    var sprite = new cocos.nodes.Sprite({
         file: '/resources/bullet.png',
         rect: new geom.Rect(0, 0, 16, 16)
     })

    this.addChild({child: sprite});
    this.contentSize = sprite.contentSize;    
    this.scheduleUpdate();
}

Bullet.inherit(cocos.nodes.Node, {
    velocity: null,

    update: function (dt) {
        var pos = util.copy(this.position),
            vel = util.copy(this.velocity);

        pos.x += dt * vel.x;
        pos.y -= dt * vel.y;

        this.position = pos

        this.testCollision();
    },

    testCollision: function () {
        var winSize = cocos.Director.sharedDirector.winSize,
            game = this.parent,
            position = this.position;

        if (position.x < 0 || position.x >= winSize.width || position.y < 0 || position.y >= winSize.height) {
            game.removeChild(this);
        }
    }
})

module.exports = Bullet
