/**
 * SpriteManager constructor
 * @param stage PIXI.Container
 */
var SpriteManager = function(stage) {

	this.stage = stage;
	this.sprites = [];
	this.heightLimit = stage.height;
}

/**
 * Add a sprite on stage using the specified coordinate
 * @param x the horizontal coordinate of the sprite
 * @param y the vertical coordinate of the sprite
 */
SpriteManager.prototype.addSprite = function(x, y) {

	var shapeSprite = new ShapeSprite(x, y);

	this.stage.addChild(shapeSprite.getSprite());
	this.sprites.push(shapeSprite);
}

/**
 * Parse and update current sprites
 */
SpriteManager.prototype.updateSprites = function(speed) {

	for(i = 0; i < this.sprites.length; i++)
		this.sprites[i].update(2, this.heightLimit);
}

/**
 * Return the number of sprites currently displayed
 * @return int
 */
SpriteManager.prototype.getSpriteCount = function() {

	return this.sprites.length;
}