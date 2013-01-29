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

    sprite.anchorPoint = new geom.Point(0, 0)

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
    }
})

module.exports = Bullet
